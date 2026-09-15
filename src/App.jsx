import React, {
  lazy,
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import catalogue from "./data/exhibits.json";
import { evaluate, testProposal, getSolutions } from "./lib/engine.js";
import { readSave, writeSave, updateRecord } from "./lib/progress.js";
import { stateLabel } from "./lib/states.js";

const Diorama = lazy(() => import("./components/Diorama.jsx"));
const exhibits = catalogue.map((exhibit) => ({
  ...exhibit,
  curator: exhibit.curator.en,
  curatorRu: exhibit.curator.ru,
}));
const collections = [
  {
    id: "L",
    name: "Light",
    ru: "Свет",
    subtitle: "A place for every shadow.",
    subtitleRu: "Каждой тени — своё место.",
    note: "Follow a little light. See what falls into place.",
    color: "gold",
    icon: "sun",
  },
  {
    id: "A",
    name: "Air",
    ru: "Воздух",
    subtitle: "Invisible things leave instructions.",
    subtitleRu: "Невидимое оставляет подсказки.",
    note: "Follow an unseen influence. Give a breeze direction.",
    color: "mint",
    icon: "wind",
  },
  {
    id: "W",
    name: "Water",
    ru: "Вода",
    subtitle: "A small decision travels.",
    subtitleRu: "Маленькое решение движется дальше.",
    note: "Trace the current. Let every small decision travel.",
    color: "blue",
    icon: "water",
  },
];
function Icon({ name, className = "" }) {
  return (
    <span aria-hidden="true" className={`icon icon-${name} ${className}`}>
      <i />
      <i />
      <i />
    </span>
  );
}
function SceneView(props) {
  return (
    <Suspense
      fallback={
        <div className="scene-loading">
          <span className="loading-ring" />
          Arranging the exhibit…
        </div>
      }
    >
      <Diorama {...props} />
    </Suspense>
  );
}
function currentRoute() {
  const match = window.location.hash.match(/^#\/exhibit\/([LAW]0[1-8])$/);
  return match
    ? { page: "exhibit", id: match[1] }
    : { page: window.location.hash === "#/progress" ? "progress" : "gallery" };
}
let audioContext;
function chime(success = false) {
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
    (success ? [523.25, 659.25, 783.99] : [440]).forEach((frequency, i) => {
      const oscillator = audioContext.createOscillator(),
        gain = audioContext.createGain(),
        start = audioContext.currentTime + i * 0.12;
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.055, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.65);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(start);
      oscillator.stop(start + 0.7);
    });
  } catch {
    /* Audio is optional; puzzle state is never dependent on it. */
  }
}
function Modal({ title, children, onClose, wide = false }) {
  const dialog = useRef();
  const titleId = useId();
  useEffect(() => {
    const previous = document.activeElement;
    dialog.current.showModal();
    return () => {
      previous?.focus?.();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      className={`modal ${wide ? "wide" : ""}`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-heading">
        <h2 id={titleId}>{title}</h2>
        <button className="icon-button" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      {children}
    </dialog>
  );
}
export default function App() {
  const [save, setSave] = useState(readSave);
  const [route, setRoute] = useState(currentRoute);
  const [collection, setCollection] = useState("L");
  const [modal, setModal] = useState(null);
  const [storageFailed, setStorageFailed] = useState(false);
  const [toast, setToast] = useState("");
  const locale = save.settings.locale,
    ru = locale === "ru";
  const t = (en, russian) => (ru ? russian : en);
  const repaired = exhibits.filter(
    (e) => save.progress[e.id]?.status === "repaired",
  ).length;
  const explored = exhibits.filter((e) =>
    ["repaired", "studied"].includes(save.progress[e.id]?.status),
  ).length;
  const activeCollection = collections.find((c) => c.id === collection);
  useEffect(() => {
    const handler = () => {
      setRoute(currentRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  useEffect(() => {
    setStorageFailed(!writeSave(save));
  }, [save]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.contrast = save.settings.highContrast
      ? "high"
      : "normal";
    document.documentElement.dataset.motion = save.settings.reducedMotion
      ? "reduced"
      : "full";
  }, [save.settings, locale]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(id);
  }, [toast]);
  const navigate = (page, id) => {
    const hash = page === "exhibit" ? `#/exhibit/${id}` : `#/${page}`;
    if (window.location.hash === hash) setRoute(currentRoute());
    else window.location.hash = hash;
  };
  const settings = (patch) =>
    setSave((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }));
  const record = (id, action) =>
    setSave((prev) => ({
      ...prev,
      progress: {
        ...prev.progress,
        [id]: updateRecord(prev.progress[id], action),
      },
    }));
  const session = (id, data) =>
    setSave((prev) => ({
      ...prev,
      sessions: { ...prev.sessions, [id]: data },
    }));
  const enter = (id) => {
    record(id, { type: "visit" });
    setCollection(id[0]);
    navigate("exhibit", id);
  };
  const continueId =
    exhibits.find((e) => save.progress[e.id]?.status === "in-progress")?.id ||
    exhibits.find(
      (e) => !["repaired", "studied"].includes(save.progress[e.id]?.status),
    )?.id ||
    "L01";
  const selectedExhibit =
    exhibits.find((e) => e.id === route.id) || exhibits[0];
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main-content").focus();
        }}
      >
        {t("Skip to content", "К содержимому")}
      </a>
      <aside className="sidebar">
        <button
          className="brand"
          onClick={() => navigate("gallery")}
          aria-label={t("Museum of Almost home", "Музей почти верного")}
        >
          <span className="brand-mark">
            <Icon name="museum" />
            <span className="brand-star">✦</span>
          </span>
          <span>
            Museum
            <br />
            of <em>Almost</em>
            <span className="brand-caption">
              A SMALL CHANGE. A WHOLE WORLD.
            </span>
          </span>
        </button>
        <div className="sidebar-rule" />
        <div className="sidebar-eyebrow">
          {t("YOUR QUIET LITTLE ESCAPE", "ВАШ ТИХИЙ УГОЛОК")}
        </div>
        <nav
          className="main-nav"
          aria-label={t("Main navigation", "Главное меню")}
        >
          <button
            className={route.page !== "progress" ? "active" : ""}
            onClick={() => navigate("gallery")}
          >
            <Icon name="grid" />
            {t("The collections", "Коллекции")}
            <span className="nav-arrow">↗</span>
          </button>
          <button
            className={route.page === "progress" ? "active" : ""}
            onClick={() => navigate("progress")}
          >
            <Icon name="ticket" />
            {t("My visitor card", "Карточка посетителя")}
            <span className="nav-count">{repaired}</span>
          </button>
          <button onClick={() => setModal("guide")}>
            <Icon name="book" />
            {t("A note from the curator", "Записка куратора")}
          </button>
        </nav>
        <div className="sidebar-tour">
          <div className="tour-icon">✧</div>
          <p>
            {t("No rush. No wrong turns.", "Не спешите. Здесь нет тупиков.")}
          </p>
          <span>
            {t(
              "Just you, a little curiosity, and a world waiting to make sense.",
              "Только вы, немного любопытства и мир, который ждёт согласия.",
            )}
          </span>
          <button onClick={() => enter(continueId)}>
            {t("Continue your tour", "Продолжить прогулку")}
            <span>→</span>
          </button>
        </div>
        <div className="sidebar-bottom">
          <span className="open-dot" />
          {t(
            "Always open. Always a little curious.",
            "Всегда открыто. Всегда любопытно.",
          )}
          <div>
            <span>EST. ALMOST</span>
            <span>∞</span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <button
              className="mobile-brand"
              onClick={() => navigate("gallery")}
              aria-label={t("Museum home", "Главная")}
            >
              M / A
            </button>
            <span>{t("THE MUSEUM", "МУЗЕЙ")}</span>
            <span className="crumb-slash">/</span>
            <span>
              {route.page === "exhibit"
                ? selectedExhibit.id
                : route.page === "progress"
                  ? t("VISITOR CARD", "КАРТОЧКА")
                  : t("COLLECTIONS", "КОЛЛЕКЦИИ")}
            </span>
          </div>
          <div className="topbar-actions">
            <button
              className="mobile-card icon-button"
              onClick={() => navigate("progress")}
              aria-label={t("My visitor card", "Карточка посетителя")}
            >
              <Icon name="ticket" />
            </button>
            <span className="untimed">
              <span className="open-dot" />
              {t("A little time, well spent", "Время, проведённое с пользой")}
            </span>
            <button
              className={`sound-button ${save.settings.sound ? "enabled" : ""}`}
              onClick={() => {
                settings({ sound: !save.settings.sound });
                if (!save.settings.sound) chime();
              }}
              aria-label={t(
                `Turn sound ${save.settings.sound ? "off" : "on"}`,
                "Переключить звук",
              )}
            >
              <Icon name="sound" />
              <span>
                {save.settings.sound
                  ? t("Sound on", "Звук вкл.")
                  : t("Sound off", "Звук выкл.")}
              </span>
            </button>
            <button
              className="icon-button settings-button"
              onClick={() => setModal("settings")}
              aria-label={t("Settings", "Настройки")}
            >
              <Icon name="settings" />
            </button>
          </div>
        </header>
        {storageFailed && (
          <div className="storage-notice" role="status">
            {t(
              "Browser storage is unavailable. You can play, but progress will not survive closing this page.",
              "Хранилище недоступно. После закрытия страницы прогресс не сохранится.",
            )}
          </div>
        )}
        <main id="main-content" tabIndex={-1}>
          {route.page === "gallery" && (
            <Gallery
              {...{
                exhibits,
                activeCollection,
                setCollection,
                enter,
                save,
                t,
                ru,
                locale,
                repaired,
                explored,
              }}
            />
          )}
          {route.page === "exhibit" && (
            <Exhibit
              key={selectedExhibit.id}
              exhibit={selectedExhibit}
              savedSession={save.sessions[selectedExhibit.id]}
              progress={save.progress[selectedExhibit.id]}
              onRecord={(action) => record(selectedExhibit.id, action)}
              onSession={(data) => session(selectedExhibit.id, data)}
              onBack={() => navigate("gallery")}
              onNext={() =>
                enter(
                  exhibits[
                    (exhibits.findIndex((e) => e.id === selectedExhibit.id) +
                      1) %
                      exhibits.length
                  ].id,
                )
              }
              {...{ t, ru, locale, setModal, setToast }}
              settings={save.settings}
            />
          )}
          {route.page === "progress" && (
            <VisitorCard {...{ repaired, explored, save, enter, t, ru }} />
          )}
        </main>
        <footer className="page-footer">
          <span>
            MUSEUM OF ALMOST <span className="footer-star">✧</span>{" "}
            {t(
              "A little change. A world of difference.",
              "Маленькое изменение. Большая разница.",
            )}
          </span>
          <button onClick={() => setModal("about")}>
            {t("Made for curious minds", "Для любознательных")} ↗
          </button>
        </footer>
      </div>
      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
      {modal === "settings" && (
        <Modal
          title={t("Make yourself comfortable", "Устраивайтесь поудобнее")}
          onClose={() => setModal(null)}
        >
          <p className="modal-intro">
            {t("A quieter museum, your way.", "Ваш музей, ваши настройки.")}
          </p>
          <div className="setting-row">
            <div>
              <strong>{t("Language", "Язык")}</strong>
              <small>English / Русский</small>
            </div>
            <select
              value={locale}
              onChange={(e) => settings({ locale: e.target.value })}
              aria-label={t("Language", "Язык")}
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
          {[
            [
              "sound",
              "Gentle sound",
              "Тихий звук",
              "Small notes when you interact.",
              "Негромкие звуки действий.",
            ],
            [
              "reducedMotion",
              "Reduced motion",
              "Меньше движения",
              "Keep the little world still.",
              "Мир без лишнего движения.",
            ],
            [
              "highContrast",
              "High contrast",
              "Высокая контрастность",
              "Stronger outlines and text.",
              "Чёткие контуры и текст.",
            ],
          ].map(([key, en, russian, desc, descRu]) => (
            <label className="setting-row" key={key}>
              <span>
                <strong>{t(en, russian)}</strong>
                <small>{t(desc, descRu)}</small>
              </span>
              <input
                className="switch"
                type="checkbox"
                checked={save.settings[key]}
                onChange={(e) => settings({ [key]: e.target.checked })}
              />
            </label>
          ))}
          <div className="local-notice">
            <Icon name="ticket" />
            <p>
              {t(
                "Your visitor card is saved in this browser. No account, tracking, or payment is required. Clearing browser data also clears your card.",
                "Карточка хранится в этом браузере. Аккаунт и оплата не нужны. Очистка данных браузера удалит карточку.",
              )}
            </p>
          </div>
          <button
            className="text-button danger"
            onClick={() => setModal("delete")}
          >
            {t("Reset my local visitor card", "Сбросить мою карточку")}
          </button>
        </Modal>
      )}
      {modal === "delete" && (
        <Modal
          title={t("Start a new visitor card?", "Начать новую карточку?")}
          onClose={() => setModal(null)}
        >
          <p>
            {t(
              "This permanently deletes your progress, hints, and saved proposals in this browser. It cannot be undone.",
              "Это удалит прогресс, подсказки и предложения в этом браузере. Отменить действие нельзя.",
            )}
          </p>
          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => setModal("settings")}
            >
              {t("Keep my card", "Сохранить карточку")}
            </button>
            <button
              className="primary-button"
              onClick={() => {
                setSave((prev) => ({ ...prev, progress: {}, sessions: {} }));
                navigate("gallery");
                setModal(null);
              }}
            >
              {t("Start fresh", "Начать заново")}
            </button>
          </div>
        </Modal>
      )}
      {modal === "guide" && (
        <Modal
          title={t(
            "Welcome to the almost-right.",
            "Добро пожаловать в «почти».",
          )}
          onClose={() => setModal(null)}
        >
          <div className="curator-seal">
            <Icon name="museum" />
          </div>
          <p className="serif-note">
            {t(
              "“Nothing here needed to be perfect. It only needed to agree.”",
              "«Здесь ничто не обязано быть идеальным. Важно, чтобы всё было согласовано.»",
            )}
          </p>
          <p>
            {t(
              "Some museums preserve things as they were. Ours preserves things almost as they should be. Somewhere, one ordinary setting is wrong.",
              "Некоторые музеи хранят вещи такими, какими они были. Мы храним вещи почти такими, какими они должны быть. Где-то одна обычная настройка неверна.",
            )}
          </p>
          <ol className="guide-steps">
            <li>
              <strong>{t("Look a little closer", "Присмотритесь")}</strong>
              <span>
                {t(
                  "Read the target and four local rules. Every object tells you its state.",
                  "Прочитайте цель и четыре правила. Состояние каждого объекта доступно.",
                )}
              </span>
            </li>
            <li>
              <strong>{t("Change one cause", "Измените одну причину")}</strong>
              <span>
                {t(
                  "Choose one of the two source controls. Effects follow their own rules.",
                  "Выберите один из двух источников. Следствия подчиняются правилам.",
                )}
              </span>
            </li>
            <li>
              <strong>
                {t("See what falls into place", "Посмотрите на результат")}
              </strong>
              <span>
                {t(
                  "Test your repair. Try again as often as you like. There is no clock.",
                  "Проверьте исправление. Пробуйте сколько угодно. Таймера нет.",
                )}
              </span>
            </li>
          </ol>
          <button
            className="primary-button full-width"
            onClick={() => setModal(null)}
          >
            {t(
              "A little curiosity is all I need",
              "Достаточно немного любопытства",
            )}{" "}
            →
          </button>
        </Modal>
      )}
      {modal === "about" && (
        <Modal
          title={t(
            "A small, independent museum",
            "Маленький независимый музей",
          )}
          onClose={() => setModal(null)}
        >
          <p>
            {t(
              "Museum of Almost is an untimed collection of 24 causal-repair puzzles. These miniature exhibits are real, interactive 3D scenes, built from paper-inspired forms, brass, and quiet colors.",
              "Музей почти верного — 24 головоломки без таймера. Миниатюры — настоящие интерактивные 3D-сцены, вдохновлённые бумагой и латунью.",
            )}
          </p>
          <p>
            {t(
              "This is the standalone browser edition. Progress and scores are local to this browser, not ranked or synced. Telegram authentication, shared boards, and paid frames are not connected; all exhibits and assistance are free.",
              "Это браузерная версия. Прогресс и очки локальные, без рейтинга и синхронизации. Telegram, общие таблицы и платные рамки не подключены. Все экспонаты и подсказки бесплатны.",
            )}
          </p>
          <p className="small-copy">
            {t(
              "3D models and interface created for this game. Fonts: Lora and Nunito Sans, licensed under the SIL Open Font License.",
              "3D-модели и интерфейс созданы для этой игры. Шрифты Lora и Nunito Sans — SIL Open Font License.",
            )}
          </p>
        </Modal>
      )}
    </div>
  );
}
function Gallery({
  exhibits,
  activeCollection,
  setCollection,
  enter,
  save,
  t,
  ru,
  locale,
  repaired,
}) {
  const items = exhibits.filter((e) => e.id[0] === activeCollection.id),
    featured = items[0];
  const [showAll, setShowAll] = useState(false);
  useEffect(() => setShowAll(false), [activeCollection.id]);
  return (
    <div className="gallery-page">
      <section className="welcome-row">
        <div>
          <div className="eyebrow">
            <span className="tiny-star">✦</span>
            {t(
              "WELCOME TO THE MUSEUM OF ALMOST",
              "ДОБРО ПОЖАЛОВАТЬ В МУЗЕЙ ПОЧТИ ВЕРНОГО",
            )}
          </div>
          <h1>
            {t("A little out of place.", "Чуть-чуть не на месте.")}
            <br />
            <em>{t("A world to put right.", "Целый мир — в порядок.")}</em>
          </h1>
          <p className="welcome-description">
            {t(
              "Peculiar little worlds. One small change. That lovely moment it all makes sense.",
              "Необычные маленькие миры. Одно изменение. Прекрасный момент, когда всё сходится.",
            )}
          </p>
        </div>
        <div className="visitor-mini">
          <div className="visitor-mini-top">
            <Icon name="ticket" />
            <span>{t("YOUR VISITOR CARD", "ВАША КАРТОЧКА")}</span>
          </div>
          <div className="visitor-count">
            {String(repaired).padStart(2, "0")}
            <span>/ 24</span>
            <span className="stamp-star">✧</span>
          </div>
          <p>{t("little worlds put right", "миров приведено в порядок")}</p>
          <div className="mini-progress">
            <span style={{ width: `${(repaired / 24) * 100}%` }} />
          </div>
          <span className="visitor-bottom">
            {t(
              "Every small discovery counts.",
              "Каждое открытие имеет значение.",
            )}
          </span>
        </div>
      </section>
      <section
        className="collection-section"
        aria-label={t("Collections", "Коллекции")}
      >
        <div
          className="collection-tabs"
          role="tablist"
          aria-label={t("Select a collection", "Выберите коллекцию")}
        >
          {collections.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={activeCollection.id === c.id}
              className={activeCollection.id === c.id ? "active" : ""}
              onClick={() => setCollection(c.id)}
            >
              <Icon name={c.icon} />
              <span>{ru ? c.ru : c.name}</span>
              <span className="tab-count">08</span>
            </button>
          ))}
          <span className="collection-count">
            {t(
              "THREE COLLECTIONS. ENDLESS CURIOSITY.",
              "ТРИ КОЛЛЕКЦИИ. БЕСКОНЕЧНОЕ ЛЮБОПЫТСТВО.",
            )}
          </span>
        </div>
        <div className={`featured-exhibit ${activeCollection.color}`}>
          <div className="featured-copy">
            <div className="eyebrow">
              <span className="accent-line" />
              {t("A GOOD PLACE TO BEGIN", "ХОРОШЕЕ НАЧАЛО")}
            </div>
            <div className="accession">
              {t("EXHIBIT", "ЭКСПОНАТ")} {featured.id} <span>·</span>{" "}
              {t("THE", "КОЛЛЕКЦИЯ")}{" "}
              {ru
                ? activeCollection.ru.toUpperCase()
                : `${activeCollection.name.toUpperCase()} COLLECTION`}
            </div>
            <h2>{ru ? featured.titleRu : featured.title}</h2>
            <p>{ru ? featured.curatorRu : featured.curator}</p>
            <div className="feature-tags">
              <span>
                <span className="small-dot" />
                {t("One small change", "Одно изменение")}
              </span>
              <span>◷ {t("No time limit", "Без таймера")}</span>
            </div>
            <button
              className="primary-button enter-button"
              onClick={() => enter(featured.id)}
            >
              {t("Step inside", "Войти")}
              <span>↗</span>
            </button>
            <span className="feature-footnote">
              {t(
                "A little observation goes a long way.",
                "Немного внимания меняет многое.",
              )}
            </span>
          </div>
          <div className="featured-scene">
            <div className="scene-badge">
              <span className="cube-icon">◇</span>
              {t("A LITTLE WORLD IN 3D", "МАЛЕНЬКИЙ МИР В 3D")}
            </div>
            <SceneView
              key={featured.id}
              exhibit={featured}
              state={evaluate(featured, featured.initial)}
              locale={locale}
              reducedMotion={save.settings.reducedMotion}
            />
            <div className="scene-caption">
              <span>
                ↔ {t("Drag to look around", "Потяните, чтобы осмотреть")}
              </span>
              <i>
                {ru ? activeCollection.subtitleRu : activeCollection.subtitle}
              </i>
            </div>
          </div>
          <button
            className="primary-button mobile-enter"
            onClick={() => enter(featured.id)}
          >
            {t("Step inside", "Войти")}
            <span>↗</span>
          </button>
        </div>
      </section>
      <section className="shelf-section">
        <div className="section-heading">
          <div>
            <h2>
              {t("A little more to wonder about", "Ещё немного удивительного")}
            </h2>
            <p>
              {t(
                "Every exhibit is open. Follow your curiosity.",
                "Все экспонаты открыты. Следуйте любопытству.",
              )}
            </p>
          </div>
          <button className="text-button" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? t("Show less", "Свернуть")
              : t("View all 8 exhibits", "Все 8 экспонатов")}{" "}
            <span>{showAll ? "↑" : "→"}</span>
          </button>
        </div>
        <div className="exhibit-grid">
          {items.slice(1, showAll ? 8 : 4).map((e, i) => (
            <button
              className={`exhibit-card ${activeCollection.color}`}
              key={e.id}
              onClick={() => enter(e.id)}
            >
              <div className="card-art">
                <span className="card-accession">{e.id}</span>
                <span className="card-arrow">↗</span>
                <SceneView
                  exhibit={e}
                  state={evaluate(e, e.initial)}
                  thumbnail
                  reducedMotion
                  locale={locale}
                />
                <span className="card-status">
                  {save.progress[e.id]?.status === "repaired"
                    ? `✓ ${t("Repaired", "Исправлен")}`
                    : save.progress[e.id]?.status === "studied"
                      ? t("Studied", "Изучен")
                      : e.solutionType === "open"
                        ? t("Open solution", "Несколько решений")
                        : t("Single solution", "Одно решение")}
                </span>
              </div>
              <div className="card-copy">
                <h3>{ru ? e.titleRu : e.title}</h3>
                <p>
                  {i === 0
                    ? t(
                        "Two small causes. One lovely consequence.",
                        "Две причины. Одно прекрасное следствие.",
                      )
                    : i === 1
                      ? t(
                          "Sometimes, a little less is just enough.",
                          "Иногда чуть меньше — в самый раз.",
                        )
                      : t(
                          "Things have a way of coming together.",
                          "Всё может прийти в согласие.",
                        )}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <div className="museum-promise">
        <div className="promise-symbol">✧</div>
        <p>
          {t(
            "No timers. No pressure. No perfect scores to chase.",
            "Без таймера. Без давления. Без гонки за очками.",
          )}
          <span>
            {t(
              "Just the quiet satisfaction of understanding a little world.",
              "Только тихая радость понимания маленького мира.",
            )}
          </span>
        </p>
        <span className="promise-end">TAKE YOUR TIME.</span>
      </div>
    </div>
  );
}
function Exhibit({
  exhibit,
  savedSession,
  progress,
  onRecord,
  onSession,
  onBack,
  onNext,
  t,
  ru,
  locale,
  setToast,
  settings,
}) {
  const validProposal = (proposal) =>
    proposal &&
    Object.hasOwn(exhibit.sources, proposal.source) &&
    exhibit.sources[proposal.source].includes(proposal.value) &&
    proposal.value !== exhibit.initial[proposal.source]
      ? { source: proposal.source, value: proposal.value }
      : null;
  const [proposal, setProposal] = useState(() =>
    validProposal(savedSession?.proposal),
  );
  const [undo, setUndo] = useState([]);
  const [world, setWorld] = useState(() => evaluate(exhibit, exhibit.initial));
  const [selected, setSelected] = useState(Object.keys(exhibit.sources)[0]);
  const [mode, setMode] = useState("scene");
  const [result, setResult] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [history, setHistory] = useState(() =>
    Array.isArray(savedSession?.history)
      ? savedSession.history.filter((h) => validProposal(h.proposal)).slice(-20)
      : [],
  );
  const [hintTier, setHintTier] = useState(1);
  const recordRef = useRef(onRecord),
    sessionRef = useRef(onSession);
  recordRef.current = onRecord;
  sessionRef.current = onSession;
  useEffect(() => {
    recordRef.current({ type: "visit" });
  }, []);
  useEffect(() => {
    sessionRef.current({ proposal, history });
  }, [proposal, history]);
  const label = (id) => exhibit.objects[id]?.[locale] || id;
  const stateText = (value, id) => stateLabel(value, locale, exhibit.id, id);
  const source = !!exhibit.sources[selected],
    hints = progress?.hints || 0;
  const currentCollection = collections.find((c) => c.id === exhibit.id[0]);
  const stage = (id, value) => {
    setUndo((prev) => [...prev, proposal].slice(-20));
    setProposal(value === exhibit.initial[id] ? null : { source: id, value });
    setResult(null);
    if (settings.sound) chime();
  };
  const test = () => {
    if (!proposal) return;
    const next = testProposal(exhibit, proposal);
    setWorld(next.state);
    setResult(next.success ? "success" : "mismatch");
    setHistory((prev) =>
      [...prev, { proposal, success: next.success }].slice(-20),
    );
    if (next.success) onRecord({ type: "repair" });
    if (settings.sound) chime(next.success);
  };
  const reset = () => {
    setUndo((prev) => [...prev, proposal]);
    setProposal(null);
    setWorld(evaluate(exhibit, exhibit.initial));
    setResult(null);
  };
  const study = () => {
    onRecord({ type: "study" });
    setSheet("study-result");
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}${window.location.pathname}#/exhibit/${exhibit.id}`,
      );
      setToast(
        t(
          "A spoiler-free invitation copied.",
          "Ссылка без спойлеров скопирована.",
        ),
      );
    } catch {
      setSheet("share");
    }
  };
  return (
    <div className="exhibit-page">
      <div className="exhibit-back-row">
        <button className="text-button" onClick={onBack}>
          ← {t("Back to collection", "К коллекции")}
        </button>
        <span className="exhibit-position">
          {exhibit.id} <span>/</span>{" "}
          {ru ? currentCollection.ru : currentCollection.name}{" "}
          {t("collection", "— коллекция")}
        </span>
        <button className="text-button share-button" onClick={share}>
          {t("Invite a curious mind", "Пригласить друга")} ↗
        </button>
      </div>
      <div className="exhibit-title-row">
        <div>
          <div className="eyebrow">
            {t(
              "ONE SMALL CHANGE IS ALL IT TAKES",
              "ДОСТАТОЧНО ОДНОГО ИЗМЕНЕНИЯ",
            )}
          </div>
          <h1>{ru ? exhibit.titleRu : exhibit.title}</h1>
        </div>
        <span className="solution-badge">
          <span className="small-dot" />
          {exhibit.solutionType === "open"
            ? t("Open solution", "Несколько решений")
            : t("Single solution", "Одно решение")}
        </span>
      </div>
      <div className="target-banner">
        <span className="target-icon">◎</span>
        <div>
          <span className="eyebrow">
            {t(
              "THE LITTLE WORLD WE ARE LOOKING FOR",
              "МИР, К КОТОРОМУ МЫ СТРЕМИМСЯ",
            )}
          </span>
          <p>{ru ? exhibit.targetTextRu : exhibit.targetText}</p>
        </div>
        <span className="no-timer">◷ {t("Take your time", "Не спешите")}</span>
      </div>
      <div className="play-layout">
        <div className="play-left">
          <div className={`play-scene ${currentCollection.color}`}>
            <div className="scene-toolbar">
              <div className="segmented">
                <button
                  className={mode === "scene" ? "active" : ""}
                  onClick={() => setMode("scene")}
                >
                  <span>◇</span> {t("3D scene", "3D-сцена")}
                </button>
                <button
                  className={mode === "list" ? "active" : ""}
                  onClick={() => setMode("list")}
                >
                  <Icon name="list" /> {t("Object list", "Объекты")}
                </button>
              </div>
              <span className="world-label">
                {result
                  ? t("TESTED WORLD", "ПОСЛЕ ПРОВЕРКИ")
                  : t("CURRENT ARRANGEMENT", "ТЕКУЩЕЕ СОСТОЯНИЕ")}
              </span>
            </div>
            {mode === "scene" ? (
              <div className="play-canvas">
                <SceneView
                  exhibit={exhibit}
                  state={world}
                  active
                  selected={selected}
                  onSelect={setSelected}
                  locale={locale}
                  reducedMotion={settings.reducedMotion}
                />
              </div>
            ) : (
              <div className="object-list">
                {Object.keys(world).map((id, i) => (
                  <button
                    key={id}
                    className={selected === id ? "selected" : ""}
                    onClick={() => setSelected(id)}
                  >
                    <span className="object-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <strong>{label(id)}</strong>
                      <small>
                        {exhibit.sources[id]
                          ? t(
                              "Source · can be changed",
                              "Источник · можно изменить",
                            )
                          : t(
                              "Effect · follows the rules",
                              "Следствие · по правилам",
                            )}
                      </small>
                    </span>
                    <span className="object-value">
                      {stateText(world[id], id)}
                    </span>
                    <span>↗</span>
                  </button>
                ))}
              </div>
            )}
            <div className="play-scene-footer">
              <span>
                {mode === "scene"
                  ? t(
                      "Select an object to look a little closer.",
                      "Выберите объект, чтобы рассмотреть.",
                    )
                  : t(
                      "The same world, in words. Every detail is here.",
                      "Тот же мир словами. Здесь все подробности.",
                    )}
              </span>
              <span>
                {mode === "scene"
                  ? `↔ ${t("Drag to rotate", "Потяните для поворота")}`
                  : "06 OBJECTS"}
              </span>
            </div>
          </div>
          <div className="curator-note">
            <span>“</span>
            <p>{ru ? exhibit.curatorRu : exhibit.curator}</p>
            <small>{t("— THE CURATOR", "— КУРАТОР")}</small>
          </div>
        </div>
        <aside className="inspector">
          <div className="inspector-kicker">
            <span>{t("A CLOSER LOOK", "КРУПНЫМ ПЛАНОМ")}</span>
            <span>
              {String(
                [
                  ...Object.keys(exhibit.sources),
                  ...Object.keys(exhibit.derived),
                ].indexOf(selected) + 1,
              ).padStart(2, "0")}{" "}
              / 06
            </span>
          </div>
          <h2>{label(selected)}</h2>
          <span className={`type-badge ${source ? "source" : ""}`}>
            {source
              ? `↗ ${t("Source · you can change this", "Источник · можно изменить")}`
              : `↳ ${t("Effect · follows a cause", "Следствие · зависит от причины")}`}
          </span>
          <div className="current-state">
            <span>{t("Current state", "Текущее состояние")}</span>
            <strong>{stateText(world[selected], selected)}</strong>
          </div>
          {source ? (
            <>
              <p className="control-help">
                {t(
                  "Try a different setting. Only one source changes from the opening arrangement.",
                  "Попробуйте другую настройку. Только один источник меняется относительно начала.",
                )}
              </p>
              <div className="state-options">
                {exhibit.sources[selected].map((value) => (
                  <button
                    key={value}
                    className={
                      (
                        proposal?.source === selected
                          ? proposal.value === value
                          : exhibit.initial[selected] === value
                      )
                        ? "selected"
                        : ""
                    }
                    onClick={() => stage(selected, value)}
                    aria-pressed={
                      proposal?.source === selected
                        ? proposal.value === value
                        : exhibit.initial[selected] === value
                    }
                  >
                    <span>{stateText(value, selected)}</span>
                    <span>
                      {exhibit.initial[selected] === value
                        ? t("opening", "начало")
                        : "↗"}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="effect-explanation">
              <h3>{t("Why this state?", "Почему так?")}</h3>
              <p>
                {
                  exhibit.ruleCards[
                    Object.keys(exhibit.derived).indexOf(selected)
                  ]?.[locale]
                }
              </p>
              <span>
                {t(
                  "Change a source, not its consequence.",
                  "Измените причину, а не следствие.",
                )}
              </span>
            </div>
          )}
          <div className={`proposal-card ${proposal ? "has-proposal" : ""}`}>
            <span className="eyebrow">
              {t("YOUR ONE SMALL CHANGE", "ВАШЕ МАЛЕНЬКОЕ ИЗМЕНЕНИЕ")}
            </span>
            {proposal ? (
              <p>
                {label(proposal.source)}
                <strong>
                  {stateText(exhibit.initial[proposal.source], proposal.source)}{" "}
                  <span>→</span> {stateText(proposal.value, proposal.source)}
                </strong>
              </p>
            ) : (
              <p>
                {t(
                  "A little possibility, waiting for you.",
                  "Маленькая возможность ждёт вас.",
                )}
              </p>
            )}
          </div>
          <button
            className="primary-button test-button"
            disabled={!proposal}
            onClick={test}
          >
            {t("Test the repair", "Проверить исправление")}
            <span>→</span>
          </button>
          <div className="reset-actions">
            <button
              disabled={!undo.length}
              onClick={() => {
                setProposal(undo.at(-1));
                setUndo((prev) => prev.slice(0, -1));
                setResult(null);
              }}
            >
              ↶ {t("Undo", "Отменить")}
            </button>
            <button onClick={reset}>
              ↺ {t("Return to opening", "К началу")}
            </button>
          </div>
          <p className="test-note">
            {t(
              "Every test is free. Curiosity has no penalty.",
              "Все проверки бесплатны. Пробуйте без штрафов.",
            )}
          </p>
        </aside>
      </div>
      {result && (
        <section className={`result-card ${result}`} role="status">
          <span className="result-symbol">
            {result === "success" ? "✧" : "↝"}
          </span>
          <div>
            <div className="eyebrow">
              {result === "success"
                ? t("A LITTLE WORLD, IN AGREEMENT", "МИР ПРИШЁЛ В СОГЛАСИЕ")
                : t(
                    "A DIFFERENT WORLD. NOT QUITE OUR TARGET.",
                    "ДРУГОЙ МИР. ПОКА НЕ НАША ЦЕЛЬ.",
                  )}
            </div>
            <h2>
              {result === "success"
                ? t("Everything, in its right place.", "Всё на своём месте.")
                : t(
                    "Almost. Look at what changed.",
                    "Почти. Посмотрите, что изменилось.",
                  )}
            </h2>
            <p>
              {result === "success"
                ? ru
                  ? exhibit.recapRu
                  : exhibit.recap
                : t(
                    "The local rules still hold. Compare the states below with the target and try another cause. Nothing is lost.",
                    "Правила продолжают работать. Сравните состояния с целью и попробуйте другую причину. Ничего не потеряно.",
                  )}
            </p>
            <div className="result-states">
              {Object.keys(exhibit.derived).map((id) => (
                <span key={id}>
                  {label(id)}: <strong>{stateText(world[id], id)}</strong>
                </span>
              ))}
            </div>
            <small>
              {result === "success"
                ? progress?.status === "studied"
                  ? t(
                      "Studied · understanding is its own reward",
                      "Изучен · понимание — уже награда",
                    )
                  : t(
                      `Local visitor-card score: ${progress?.score ?? 100 - hints * 10} · original result kept on replay`,
                      `Локальные очки: ${progress?.score ?? 100 - hints * 10} · первый результат сохраняется`,
                    )
                : t(
                    "No points lost. No limit on attempts.",
                    "Очки не потеряны. Число попыток не ограничено.",
                  )}
            </small>
          </div>
          {result === "success" && (
            <button className="primary-button" onClick={onNext}>
              {t("Next exhibit", "Следующий")} →
            </button>
          )}
        </section>
      )}
      <section className="rules-section">
        <div className="section-heading">
          <div>
            <h2>
              {t(
                "The way this little world works",
                "Как устроен этот маленький мир",
              )}
            </h2>
            <p>
              {t(
                "Four local rules. Nothing hidden. No outside physics required.",
                "Четыре правила. Ничего скрытого. Другие знания не нужны.",
              )}
            </p>
          </div>
          <span className="rules-count">04 {t("LOCAL RULES", "ПРАВИЛА")}</span>
        </div>
        <div className="rules-grid">
          {exhibit.ruleCards.map((rule, i) => (
            <div className="rule-card" key={i}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <p>{rule[locale]}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="assistance-bar">
        <div>
          <Icon name="book" />
          <span>
            {t("A little help is always here.", "Помощь всегда рядом.")}
            <small>
              {t(
                "Understanding matters more than figuring it out alone.",
                "Понять важнее, чем разобраться в одиночку.",
              )}
            </small>
          </span>
        </div>
        <div>
          <button
            className="secondary-button"
            onClick={() => {
              setHintTier(Math.min(hints + 1, 3));
              setSheet("hint");
            }}
          >
            {t("A gentle hint", "Подсказка")} <span>{hints}/3</span>
          </button>
          <button className="text-button" onClick={() => setSheet("study")}>
            {t("Study this exhibit", "Изучить экспонат")}
          </button>
          <button
            className="text-button history-button"
            onClick={() => setSheet("history")}
          >
            {t("Test history", "История")} ({history.length})
          </button>
        </div>
      </div>
      {sheet === "hint" && (
        <Modal
          title={t("A nudge, not a rush.", "Подсказка, не спешка.")}
          onClose={() => setSheet(null)}
        >
          <div className="hint-tabs">
            {[1, 2, 3].map((tier) => (
              <button
                key={tier}
                className={hintTier === tier ? "active" : ""}
                disabled={tier > hints + 1}
                onClick={() => setHintTier(tier)}
              >
                {t("Hint", "Подсказка")} {tier} {tier <= hints ? "✓" : ""}
              </button>
            ))}
          </div>
          {hintTier <= hints ? (
            <p className="hint-content">
              {exhibit.hints[hintTier - 1][locale]}
            </p>
          ) : (
            <>
              <p>
                {t(
                  "Next hint: local score −10. Tests are always free. Your hint stays unlocked, even if you reset the exhibit.",
                  "Следующая подсказка: −10 локальных очков. Проверки бесплатны. Подсказка останется открытой после сброса.",
                )}
              </p>
              <button
                className="primary-button full-width"
                onClick={() => onRecord({ type: "hint", tier: hintTier })}
              >
                {t("Show this hint", "Показать подсказку")} →
              </button>
            </>
          )}
        </Modal>
      )}
      {sheet === "study" && (
        <Modal
          title={t(
            "See how it all fits together?",
            "Посмотрим, как всё сходится?",
          )}
          onClose={() => setSheet(null)}
        >
          <p>
            {t(
              "Show the repair and its explanation? This exhibit will be marked Studied, with no first-play score. An existing repaired result will be kept. You can still explore every exhibit and finish your tour.",
              "Показать решение и объяснение? Экспонат станет изученным, без очков за первое прохождение. Ранее полученный результат сохранится. Вы сможете продолжить прогулку.",
            )}
          </p>
          <div className="modal-actions">
            <button className="secondary-button" onClick={() => setSheet(null)}>
              {t("Keep wondering", "Ещё подумаю")}
            </button>
            <button className="primary-button" onClick={study}>
              {t("Show the explanation", "Показать объяснение")}
            </button>
          </div>
        </Modal>
      )}
      {sheet === "study-result" && (
        <Modal
          title={t(
            "A small cause. A whole chain.",
            "Одна причина. Целая цепочка.",
          )}
          onClose={() => setSheet(null)}
        >
          <p className="hint-content">{ru ? exhibit.recapRu : exhibit.recap}</p>
          <h3>{t("Every accepted repair", "Все верные исправления")}</h3>
          {getSolutions(exhibit).map((solution) => (
            <div
              className="study-solution"
              key={`${solution.source}-${solution.value}`}
            >
              <span>
                {label(solution.source)} →{" "}
                <strong>{stateText(solution.value, solution.source)}</strong>
              </span>
              <button
                className="secondary-button"
                onClick={() => {
                  stage(solution.source, solution.value);
                  setSelected(solution.source);
                  setSheet(null);
                }}
              >
                {t("Try this", "Попробовать")}
              </button>
            </div>
          ))}
        </Modal>
      )}
      {sheet === "history" && (
        <Modal
          title={t("Your small experiments", "Ваши маленькие эксперименты")}
          onClose={() => setSheet(null)}
        >
          {history.length ? (
            <div className="history-list">
              {history.map((entry, i) => (
                <button
                  key={i}
                  onClick={() => {
                    stage(entry.proposal.source, entry.proposal.value);
                    setSelected(entry.proposal.source);
                    setSheet(null);
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>
                    {label(entry.proposal.source)} →{" "}
                    {stateText(entry.proposal.value, entry.proposal.source)}
                  </strong>
                  <span>
                    {entry.success
                      ? t("Matched ✓", "Совпало ✓")
                      : t("Mismatch ↝", "Не совпало ↝")}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p>
              {t(
                "No tests yet. Your first idea is a good place to start.",
                "Пока нет проверок. Первая идея — хорошее начало.",
              )}
            </p>
          )}
        </Modal>
      )}
      {sheet === "share" && (
        <Modal
          title={t(
            "An invitation, without spoilers",
            "Приглашение без спойлеров",
          )}
          onClose={() => setSheet(null)}
        >
          <label>
            {t("Copy this exhibit link", "Скопируйте ссылку")}
            <input
              className="share-input"
              readOnly
              value={window.location.href}
              onFocus={(e) => e.target.select()}
            />
          </label>
        </Modal>
      )}
    </div>
  );
}
function VisitorCard({ repaired, explored, save, enter, t, ru }) {
  return (
    <div className="progress-page">
      <div className="eyebrow">
        {t(
          "LITTLE DISCOVERIES, LOVINGLY KEPT",
          "МАЛЕНЬКИЕ ОТКРЫТИЯ, БЕРЕЖНО СОХРАНЁННЫЕ",
        )}
      </div>
      <h1>{t("A record of your curiosity.", "История вашего любопытства.")}</h1>
      <p className="welcome-description">
        {t(
          "No race. No ranking. Just the little worlds you have come to understand.",
          "Без гонки и рейтинга. Просто маленькие миры, которые вы поняли.",
        )}
      </p>
      <div className="big-visitor-card">
        <div>
          <Icon name="museum" />
          <span>
            MUSEUM
            <br />
            OF ALMOST
          </span>
        </div>
        <h2>{t("The curious visitor", "Любознательный посетитель")}</h2>
        <div className="visitor-stats">
          <p>
            <strong>{String(repaired).padStart(2, "0")}</strong>
            {t("repaired", "исправлено")}
          </p>
          <p>
            <strong>{String(explored).padStart(2, "0")}</strong>
            {t("explored", "изучено")}
          </p>
          <p>
            <strong>24</strong>
            {t("open to you", "доступно")}
          </p>
        </div>
        <div className="mastery-stamps">
          {[
            [1, "First Alignment", "Первое совпадение"],
            [5, "A Good Eye for Causes", "Внимание к причинам"],
            [15, "Keeper of Coherence", "Хранитель порядка"],
          ].map(([count, en, russian]) => (
            <div className={repaired >= count ? "earned" : ""} key={count}>
              <span>{repaired >= count ? "✧" : count}</span>
              <strong>{t(en, russian)}</strong>
              <small>
                {t(
                  `${count} repaired exhibit${count > 1 ? "s" : ""}`,
                  `Исправлено: ${count}`,
                )}
              </small>
            </div>
          ))}
        </div>
        <small>
          {t(
            "SAVED ON THIS BROWSER · YOUR OWN QUIET COLLECTION",
            "СОХРАНЕНО В БРАУЗЕРЕ · ВАША ЛИЧНАЯ КОЛЛЕКЦИЯ",
          )}
        </small>
      </div>
      {explored === 24 && (
        <div className="closing-note">
          <span>✦</span>
          <h2>{t("The Museum at Rest", "Музей в равновесии")}</h2>
          <p>
            {t(
              "“Nothing here needed to be perfect. It only needed to agree.”",
              "«Здесь ничто не обязано быть идеальным. Важно, чтобы всё было согласовано.»",
            )}
          </p>
        </div>
      )}
      <div className="progress-collections">
        {collections.map((c) => (
          <section key={c.id}>
            <h2>
              <Icon name={c.icon} />
              {ru ? c.ru : c.name}
            </h2>
            {exhibits
              .filter((e) => e.id[0] === c.id)
              .map((e) => (
                <button key={e.id} onClick={() => enter(e.id)}>
                  <span>{e.id}</span>
                  <strong>{ru ? e.titleRu : e.title}</strong>
                  <small>
                    {save.progress[e.id]?.status === "repaired"
                      ? `✓ ${save.progress[e.id].score}`
                      : save.progress[e.id]?.status === "studied"
                        ? t("Studied", "Изучен")
                        : save.progress[e.id]?.status === "in-progress"
                          ? t("In progress", "Начат")
                          : "↗"}
                  </small>
                </button>
              ))}
          </section>
        ))}
      </div>
    </div>
  );
}
