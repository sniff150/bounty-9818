import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Droplets,
  Minus,
  Play,
  Plus,
  ShieldCheck,
  Snowflake,
  X,
} from "lucide-react";
import { OrderDialog } from "../components/order-dialog";
import { PromoTimer } from "../components/promo-timer";
import { Reviews } from "../components/reviews";

const faq = [
  [
    "Для яких автомобілів підходить?",
    "На етикетці вказано сумісність з усіма типами паливних систем дизельних двигунів. Перед застосуванням перевірте інструкції виробника засобу та вашого автомобіля.",
  ],
  [
    "Коли потрібно додавати антигель?",
    "До того, як паливо почне загусати. Антигель — профілактичний засіб, а не спосіб розморозити вже замерзлу паливну систему. Дотримуйтеся оригінальної інструкції.",
  ],
  [
    "Як отримати замовлення?",
    "Натисніть «Замовити», вкажіть ПІБ, телефон, місто й адресу та номер відділення Нової пошти. Після підтвердження форми очікуйте дзвінка для уточнення замовлення, оплати й доставки.",
  ],
  [
    "Чи гарантований захист до −32 °C?",
    "Температуру −32 °C зазначено в наданих матеріалах продукту. Результат залежить від початкових властивостей дизельного палива, дозування та умов використання. Це не універсальна гарантія для будь-якого палива.",
  ],
];

function ProductVideo({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="product-video"
      aria-label="Відео про XADO Antigel+"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <button className="dialog-x" aria-label="Закрити відео" onClick={onClose}>
        <X size={20} />
      </button>
      <video
        src="/videos/antigel.mp4"
        poster="/images/video-poster.jpg"
        controls
        autoPlay
        playsInline
        aria-label="Оригінальне відео про антигель"
      >
        <track
          kind="captions"
          src="/videos/antigel-uk.vtt"
          srcLang="uk"
          label="Український текст"
        />
      </video>
      <p>
        Оригінальне відео продукту. Акції та таймер у відео не є актуальними пропозиціями сайту.
      </p>
    </dialog>
  );
}

export default function Landing() {
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState(false);
  const [video, setVideo] = useState(false);
  const [fuel, setFuel] = useState("60");
  const [expanded, setExpanded] = useState<number | null>(null);
  const dose = Number(fuel) > 0 && Number(fuel) <= 10000 ? Number(fuel) : null;
  return (
    <div className="simple-site" id="top">
      <header className="simple-header">
        <a className="xado-logo" href="#top" aria-label="XADO — на початок">
          XADO<span>ЗАХИСТ ВАШОГО ДВИГУНА</span>
        </a>
        <nav aria-label="Головна навігація">
          <a href="#benefits">Переваги</a>
          <a href="#usage">Як застосовувати</a>
          <a href="#faq">Запитання</a>
          <a href="#reviews">Відгуки</a>
        </nav>
        <button className="primary header-order" onClick={() => setOrder(true)}>
          Замовити
          <ArrowRight size={16} />
        </button>
      </header>
      <main>
        <section className="simple-hero" aria-labelledby="hero-title">
          <div className="hero-text">
            <span className="mini-label">
              <Snowflake size={14} /> ЗАХИСТ ДИЗЕЛЯ ВЗИМКУ
            </span>
            <h1 id="hero-title">
              Мороз надворі.
              <br />
              <span>Дизель під захистом.</span>
            </h1>
            <p className="lead">
              XADO Antigel+ допомагає запобігти загусанню дизельного палива, щоб ви впевнено
              рухалися далі.
            </p>
            <div className="hero-facts">
              <span>
                <Check size={15} /> До −32 °C*
              </span>
              <span>
                <Check size={15} /> На 1 000 л палива
              </span>
            </div>
            <div className="price-promo-row">
              <div className="simple-price">
                <strong>
                  1 099 <small>грн</small>
                </strong>
                <s>1 300 грн</s>
              </div>
              <PromoTimer />
            </div>
            <div className="purchase-actions">
              <div className="simple-quantity" aria-label="Кількість товару">
                <button
                  aria-label="Зменшити кількість"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => q - 1)}
                >
                  <Minus size={16} />
                </button>
                <output aria-label="Обрана кількість">{quantity}</output>
                <button
                  aria-label="Збільшити кількість"
                  disabled={quantity >= 99}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button className="primary main-order" onClick={() => setOrder(true)}>
                Замовити
                <ArrowRight size={18} />
              </button>
            </div>
            <p className="delivery-caption">Доставка Новою поштою · Підтвердження телефоном</p>
            <button className="watch-video" onClick={() => setVideo(true)}>
              <Play size={13} />
              Переглянути відео про продукт
            </button>
          </div>
          <div className="simple-product">
            <span className="product-label">
              XADO ANTIGEL+<small>СУПЕРКОНЦЕНТРАТ 1:1000</small>
            </span>
            <img
              src="/images/antigel-product.png"
              alt="XADO Antigel+ — суперконцентрат на 1 000 літрів дизельного палива"
            />
            <span className="product-bottom">
              <Snowflake size={17} /> Ваш зимовий запас впевненості
            </span>
          </div>
        </section>
        <section id="benefits" className="simple-benefits" aria-label="Переваги антигелю">
          {[
            {
              icon: Snowflake,
              title: "засіб від загущення",
              text: "Допомагає зберегти текучість дизеля в холодну погоду.*",
            },
            {
              icon: Droplets,
              title: "Економна витрата",
              text: "Співвідношення 1:1000 — 1 мл засобу на літр палива.",
            },
            {
              icon: ShieldCheck,
              title: "Для дизельних систем",
              text: "Для легкових авто, вантажівок та інших дизельних двигунів.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={23} strokeWidth={1.5} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>
        <p className="product-disclaimer">
          *Заявлено в матеріалах продукту. Ефективність залежить від палива, дозування й умов. Перед
          використанням прочитайте етикетку.
        </p>
        <section className="simple-usage" id="usage">
          <div>
            <span className="mini-label">ПРОСТЕ ЗАСТОСУВАННЯ</span>
            <h2>Підготуйтеся до холодів</h2>
            <ol className="simple-steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Відміряйте потрібну кількість</h3>
                  <p>Орієнтир: 1 мл антигелю на 1 л дизельного палива.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Додайте до загусання палива</h3>
                  <p>Застосовуйте завчасно, відповідно до інструкції на етикетці.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Заправляйтеся та вирушайте</h3>
                  <p>Дотримуйтеся рекомендацій виробника для вашої паливної системи.</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="simple-calculator">
            <span className="mini-label">
              <Droplets size={15} /> КАЛЬКУЛЯТОР ДОЗУВАННЯ
            </span>
            <h3>Скільки антигелю потрібно?</h3>
            <label htmlFor="fuel">Об’єм дизельного палива</label>
            <div className="simple-fuel">
              <input
                aria-label="Об’єм дизельного палива"
                id="fuel"
                type="number"
                min="1"
                max="10000"
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              />
              <span>л</span>
            </div>
            <div className="fuel-presets">
              {[40, 60, 100, 1000].map((n) => (
                <button
                  key={n}
                  className={Number(fuel) === n ? "selected" : ""}
                  onClick={() => setFuel(String(n))}
                >
                  {n} л
                </button>
              ))}
            </div>
            <div className="simple-dose" aria-live="polite">
              <span>Потрібна кількість</span>
              <strong>
                {dose ?? "—"} <small>мл</small>
              </strong>
            </div>
            <p>
              Розрахунок за співвідношенням 1:1000. Остаточне дозування перевіряйте за інструкцією
              продукту.
            </p>
          </div>
        </section>
        <section className="simple-faq" id="faq">
          <div>
            <span className="mini-label">КОРИСНО ЗНАТИ</span>
            <h2>Поширені запитання</h2>
          </div>
          <div>
            {faq.map(([q, a], i) => (
              <article className="simple-faq-item" key={q}>
                <button
                  aria-expanded={expanded === i}
                  aria-controls={"faq-" + i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {q}
                  <ChevronDown className={expanded === i ? "rotated" : ""} size={18} />
                </button>
                {expanded === i && <p id={"faq-" + i}>{a}</p>}
              </article>
            ))}
          </div>
        </section>
        <Reviews />
        <section className="simple-cta">
          <div>
            <h2>Подбайте про дизель завчасно</h2>
            <p>XADO Antigel+ · 1 099 грн за одиницю</p>
          </div>
          <button className="primary" onClick={() => setOrder(true)}>
            Оформити замовлення
            <ArrowRight size={18} />
          </button>
        </section>
      </main>
      <footer className="simple-footer">
        <a className="xado-logo" href="#top">
          XADO
        </a>
        <p>Захист дизеля в холодну пору року.</p>
        <span>© {new Date().getFullYear()} · XADO Antigel+</span>
      </footer>
      {order && <OrderDialog quantity={quantity} onClose={() => setOrder(false)} />}
      {video && <ProductVideo onClose={() => setVideo(false)} />}
    </div>
  );
}
