const labels = {
  left: ["left", "левая сторона"],
  right: ["right", "правая сторона"],
  open: ["open", "открыто"],
  closed: ["closed", "закрыто"],
  on: ["on", "включено"],
  off: ["off", "выключено"],
  low: ["low", "низкий уровень"],
  medium: ["medium", "средний режим"],
  mid: ["middle", "средний уровень"],
  high: ["high", "высокий уровень"],
  none: ["none", "нет"],
  one: ["one", "одно"],
  two: ["two", "два"],
  lit: ["lit", "освещено"],
  dark: ["dark", "темно"],
  shaded: ["shaded", "в тени"],
  resting: ["resting", "неподвижно"],
  moving: ["moving", "движется"],
  round: ["round stencil", "круглый трафарет"],
  disk: ["disk", "круг"],
  leaf: ["leaf", "лист"],
  wide: ["wide", "широко"],
  small: ["small", "малый размер"],
  narrow: ["narrow", "узко"],
  finished: ["finished", "готово"],
  unfinished: ["unfinished", "не готово"],
  sealed: ["sealed", "запечатано"],
  clear: ["clear glass", "прозрачное стекло"],
  frosted: ["frosted glass", "матовое стекло"],
  dim: ["dim", "тусклый свет"],
  even: ["even", "ровный свет"],
  glare: ["glare", "слепящий свет"],
  sharp: ["sharp-edged", "чёткие края"],
  soft: ["soft-edged", "мягкие края"],
  awake: ["awake", "бодрствует"],
  asleep: ["asleep", "спит"],
  squinting: ["squinting", "щурится"],
  welcome: ["welcoming", "приветствие"],
  wait: ["wait signal", "сигнал ожидания"],
  waiting: ["waiting", "ожидание"],
  straight: ["straight route", "прямой маршрут"],
  crossed: ["crossed route", "перекрёстный маршрут"],
  return: ["return route", "возвратный маршрут"],
  amber: ["amber", "янтарный цвет"],
  blue: ["blue", "синий цвет"],
  circle: ["circle", "круг"],
  triangle: ["triangle", "треугольник"],
  striped: ["striped", "полосы"],
  plain: ["plain", "без узора"],
  ready: ["ready", "готово"],
  readable: ["readable", "читается"],
  unreadable: ["unreadable", "не читается"],
  near: ["near focus", "ближний фокус"],
  far: ["far focus", "дальний фокус"],
  active: ["active", "работает"],
  quiet: ["quiet", "неподвижно"],
  settled: ["settled", "спокойно"],
  alert: ["alert", "настороженно"],
  day: ["day", "день"],
  dusk: ["dusk", "сумерки"],
  night: ["night", "ночь"],
  white: ["white", "белый цвет"],
  gold: ["gold", "золотой цвет"],
  noon: ["noon", "полдень"],
  six: ["six o'clock", "шесть часов"],
  midnight: ["midnight", "полночь"],
  perched: ["perched", "сидит на жердочке"],
  still: ["still", "без движения"],
  hanging: ["hanging", "свисает"],
  turning: ["turning", "вращается"],
  stopped: ["stopped", "остановлено"],
  docked: ["docked", "у причала"],
  away: ["away", "вдали"],
  gentle: ["gentle", "мягкий поток"],
  strong: ["strong", "сильный поток"],
  fast: ["fast", "быстро"],
  slow: ["slow", "медленно"],
  ringing: ["ringing", "звенит"],
  silent: ["silent", "не звенит"],
  level: ["level", "горизонтально"],
  lifted: ["lifted", "поднято"],
  pleased: ["pleased", "довольное состояние"],
  empty: ["empty", "пусто"],
  full: ["full", "наполнено"],
  grounded: ["grounded", "на основании"],
  delivered: ["delivered", "доставлено"],
  flat: ["flat", "прижато"],
  fluttering: ["fluttering", "колышется"],
  steady: ["steady", "ровное положение"],
  leaning: ["leaning", "наклонено"],
  taut: ["taut", "натянуто"],
  calm: ["calm", "спокойная поверхность"],
  rippling: ["rippling", "рябь"],
  duet: ["duet", "дуэт"],
  solo: ["solo", "соло"],
  chord: ["chord", "аккорд"],
  note: ["note", "одна нота"],
  loud: ["loud", "громко"],
  listening: ["listening", "слушает"],
  upper: ["upper", "наверху"],
  lower: ["lower", "внизу"],
  lodged: ["lodged", "застряло"],
  accepted: ["accepted", "принято"],
  blank: ["blank", "без отметки"],
  clockwise: ["clockwise", "по часовой стрелке"],
  counterclockwise: ["counterclockwise", "против часовой стрелки"],
  engaged: ["engaged", "сцепление включено"],
  released: ["released", "сцепление отключено"],
  aligned: ["aligned", "совмещено"],
  offset: ["offset", "смещено"],
  down: ["down", "опущено"],
  up: ["up", "поднято"],
  signed: ["signed", "подписано"],
  flowing: ["flowing", "поток идёт"],
  wet: ["wet", "мокро"],
  dry: ["dry", "сухо"],
  afloat: ["afloat", "на плаву"],
  centered: ["centered", "по центру"],
  aside: ["aside", "в стороне"],
  short: ["short", "короткая дуга"],
  neat: ["neat", "аккуратная дуга"],
  tall: ["tall", "высокая дуга"],
  catching: ["catching", "вода поймана"],
  missing: ["missing", "вода проходит мимо"],
  cool: ["cool", "прохладный режим"],
  warm: ["warm", "тёплый режим"],
  absent: ["absent", "отсутствует"],
  present: ["present", "присутствует"],
  misted: ["misted", "есть конденсат"],
  dropping: ["dropping", "капает"],
  watered: ["watered", "полито"],
  balanced: ["balanced", "равномерный маршрут"],
  tilted: ["tilted", "наклонено"],
  lowered: ["lowered", "опущено"],
  raised: ["raised", "поднято"],
  safe: ["safe", "безопасный уровень"],
  toward: ["toward", "к острову"],
  step: ["step", "доступная ступенька"],
  submerged: ["submerged", "под водой"],
  across: ["across", "на острове"],
  wheel: ["via wheel", "через колесо"],
  bypass: ["bypass", "в обход колеса"],
  1: ["one model mark", "одна отметка модели"],
  2: ["two model marks", "две отметки модели"],
  3: ["three model marks", "три отметки модели"],
};

const overrides = {
  "L03.window.soft": ["soft light", "мягкий свет"],
  "L03.window.sharp": ["sharp-edged light", "свет с резкими границами"],
  "A06.drummer.soft": ["soft drumming", "тихий барабан"],
  "L07.star.soft": ["soft-edged star", "мягкие края звезды"],
  "L06.filter.amber": ["amber circle", "янтарный круг"],
  "L06.filter.blue": ["blue triangle", "синий треугольник"],
  "L08.dome.white": ["white sun", "белое солнце"],
  "L08.dome.gold": ["gold horizon", "золотой горизонт"],
  "L08.dome.blue": ["blue stars", "синие звёзды"],
  "W04.ceiling.clear": ["no condensation", "без конденсата"],
  "L04.medallion.none": ["0 lit patches", "0 освещённых пятен"],
  "L04.medallion.one": ["1 lit patch", "1 освещённое пятно"],
  "L04.medallion.two": ["2 lit patches", "2 освещённых пятна"],
  "W07.channel.away": ["away from the island", "от острова"],
  "A01.boat.away": ["away from dock", "вдали от причала"],
  "W08.bellows.steady": ["moving steadily", "равномерное движение"],
  "W08.bellows.still": ["not moving", "неподвижно"],
  "A04.candle.steady": ["upright", "стоит ровно"],
  "A03.kite.high": ["raised kite", "змей поднят"],
};

const directionalObjects = new Set([
  "fan",
  "wind",
  "flag",
  "gate",
  "fork",
  "inlet",
  "ribbon",
  "draft",
  "pennant",
  "channel",
  "splitter",
]);
const positionedObjects = new Set(["lamp", "shadow", "beam", "window"]);
const routingObjects = new Set(["diverter", "tube", "capsule"]);
const pressureControls = new Set(["power", "blower", "pump"]);
const waterGauges = new Set(["basin", "water", "gauge", "level"]);

function contextualLabel(token, exhibitId, objectId) {
  const key = `${exhibitId}.${objectId}.${token}`;
  if (overrides[key]) return overrides[key];
  if (
    (token === "left" || token === "right") &&
    directionalObjects.has(objectId)
  ) {
    return token === "left" ? ["leftward", "влево"] : ["rightward", "вправо"];
  }
  if (
    (token === "left" || token === "right") &&
    positionedObjects.has(objectId)
  ) {
    return token === "left"
      ? ["on the left", "слева"]
      : ["on the right", "справа"];
  }
  if (
    (token === "upper" || token === "lower") &&
    routingObjects.has(objectId)
  ) {
    return token === "upper"
      ? ["to the upper shelf", "на верхнюю полку"]
      : ["to the lower shelf", "на нижнюю полку"];
  }
  if (
    ["low", "medium", "high"].includes(token) &&
    pressureControls.has(objectId)
  ) {
    const english = `${token} setting`;
    return [
      english,
      { low: "низкий режим", medium: "средний режим", high: "высокий режим" }[
        token
      ],
    ];
  }
  if (["low", "mid", "high"].includes(token) && waterGauges.has(objectId)) {
    const english = `${token === "mid" ? "middle" : token} water`;
    return [
      english,
      {
        low: "низкий уровень воды",
        mid: "средний уровень воды",
        high: "высокий уровень воды",
      }[token],
    ];
  }
  if (token === "resting" && exhibitId === "L01" && objectId === "moth")
    return ["not moving", "не движется"];
  if (token === "resting" && exhibitId === "A02" && objectId === "feather")
    return ["resting on its support", "лежит на опоре"];
  if (token === "resting" && exhibitId === "W07" && objectId === "float")
    return ["below the usable step position", "ниже доступной ступеньки"];
  return labels[token];
}

function stateLabel(token, locale = "en", exhibitId = "", objectId = "") {
  const label = contextualLabel(token, exhibitId, objectId);
  return label ? label[locale === "ru" ? 1 : 0] : token;
}

export { stateLabel };
