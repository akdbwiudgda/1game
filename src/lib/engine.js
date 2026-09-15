// This intentionally small grammar keeps authored content data, rather than code.
function tokenize(expression) {
  const tokens = [];
  const pattern =
    /\s*(?:(and|or|not|choose)\b|([A-Za-z_][A-Za-z0-9_]*)|(==|!=)|(\d+)|'([^']*)'|([(),]))/gy;
  let position = 0;
  while (position < expression.length) {
    pattern.lastIndex = position;
    const match = pattern.exec(expression);
    if (!match)
      throw new Error(`Invalid expression near: ${expression.slice(position)}`);
    position = pattern.lastIndex;
    const [, keyword, identifier, operator, integer, string, punctuation] =
      match;
    tokens.push(
      keyword
        ? { type: keyword }
        : identifier
          ? { type: "identifier", value: identifier }
          : operator
            ? { type: "operator", value: operator }
            : integer
              ? { type: "literal", value: Number(integer) }
              : string !== undefined
                ? { type: "literal", value: string }
                : { type: punctuation },
    );
  }
  return tokens;
}

function parse(expression) {
  const tokens = tokenize(expression);
  let index = 0;
  const take = (type) =>
    tokens[index] && tokens[index].type === type && tokens[index++];
  const required = (type) => {
    const token = take(type);
    if (!token) throw new Error(`Expected ${type} in: ${expression}`);
    return token;
  };
  const primary = () => {
    if (take("(")) {
      const node = or();
      required(")");
      return node;
    }
    if (take("choose")) {
      required("(");
      const condition = or();
      required(",");
      const yes = or();
      required(",");
      const no = or();
      required(")");
      return { type: "choose", condition, yes, no };
    }
    const literal = take("literal");
    if (literal) return literal;
    const identifier = take("identifier");
    if (identifier) return { type: "reference", value: identifier.value };
    throw new Error(`Expected value in: ${expression}`);
  };
  const comparison = () => {
    let node = primary();
    const token = tokens[index];
    if (token && token.type === "operator") {
      index++;
      node = { type: token.value, left: node, right: primary() };
    }
    return node;
  };
  const negate = () =>
    take("not") ? { type: "not", value: negate() } : comparison();
  const and = () => {
    let node = negate();
    while (take("and")) node = { type: "and", left: node, right: negate() };
    return node;
  };
  const or = () => {
    let node = and();
    while (take("or")) node = { type: "or", left: node, right: and() };
    return node;
  };
  const result = or();
  if (index !== tokens.length)
    throw new Error(`Unexpected token in: ${expression}`);
  return result;
}

function execute(node, resolve) {
  switch (node.type) {
    case "literal":
      return node.value;
    case "reference":
      return resolve(node.value);
    case "==":
      return execute(node.left, resolve) === execute(node.right, resolve);
    case "!=":
      return execute(node.left, resolve) !== execute(node.right, resolve);
    case "not":
      return !execute(node.value, resolve);
    case "and":
      return execute(node.left, resolve) && execute(node.right, resolve);
    case "or":
      return execute(node.left, resolve) || execute(node.right, resolve);
    case "choose":
      return execute(node.condition, resolve)
        ? execute(node.yes, resolve)
        : execute(node.no, resolve);
    default:
      throw new Error(`Unsupported expression node: ${node.type}`);
  }
}

function validateSources(exhibit, sources) {
  for (const [source, domain] of Object.entries(exhibit.sources || {})) {
    if (
      !Object.hasOwn(sources || {}, source) ||
      !domain.includes(sources[source])
    )
      throw new Error(`Invalid source ${source}`);
  }
  if (
    Object.keys(sources || {}).some(
      (key) => !Object.hasOwn(exhibit.sources || {}, key),
    )
  )
    throw new Error("Unknown source");
}

function evaluate(exhibit, sources) {
  validateSources(exhibit, sources);
  const asts = Object.fromEntries(
    Object.entries(exhibit.rules || {}).map(([key, value]) => [
      key,
      parse(value),
    ]),
  );
  const state = { ...sources };
  const evaluating = new Set();
  const resolve = (name) => {
    if (Object.hasOwn(state, name)) return state[name];
    if (
      !Object.hasOwn(asts, name) ||
      !Object.hasOwn(exhibit.derived || {}, name)
    )
      throw new Error(`Unknown node ${name}`);
    if (evaluating.has(name)) throw new Error(`Cyclic rule at ${name}`);
    evaluating.add(name);
    const value = execute(asts[name], resolve);
    evaluating.delete(name);
    if (!exhibit.derived[name].includes(value))
      throw new Error(`Rule value outside ${name} domain`);
    state[name] = value;
    return value;
  };
  for (const derived of Object.keys(exhibit.derived || {})) resolve(derived);
  return state;
}

function matchesTarget(exhibit, state) {
  return (
    execute(parse(exhibit.target), (name) => {
      if (!Object.hasOwn(state || {}, name))
        throw new Error(`Missing target node ${name}`);
      return state[name];
    }) === true
  );
}

function openingState(exhibit) {
  return evaluate(exhibit, exhibit.initial);
}

function testProposal(exhibit, proposal) {
  const initial = openingState(exhibit);
  if (
    !proposal ||
    typeof proposal !== "object" ||
    Array.isArray(proposal) ||
    Object.keys(proposal).length !== 2 ||
    !Object.hasOwn(proposal, "source") ||
    !Object.hasOwn(proposal, "value") ||
    !Object.hasOwn(exhibit.sources || {}, proposal.source) ||
    !exhibit.sources[proposal.source].includes(proposal.value) ||
    proposal.value === exhibit.initial[proposal.source]
  )
    return { state: initial, success: false };
  const sources = { ...exhibit.initial, [proposal.source]: proposal.value };
  const state = evaluate(exhibit, sources);
  return { state, success: matchesTarget(exhibit, state) };
}

function getSolutions(exhibit) {
  return Object.entries(exhibit.sources || {}).flatMap(([source, domain]) =>
    domain
      .filter((value) => value !== exhibit.initial[source])
      .filter((value) => testProposal(exhibit, { source, value }).success)
      .map((value) => ({ source, value })),
  );
}

export { evaluate, matchesTarget, testProposal, getSolutions };
