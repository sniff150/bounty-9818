import { Star } from "lucide-react";

// Fictional layout placeholders. Replace with authorized real customer feedback before publishing as genuine reviews.
const reviews = [
  {
    name: "Олександр",
    initials: "О",
    context: "Легковий дизель",
    text: "Зручно, що засіб концентрований: відміряв потрібну кількість за інструкцією та додав перед заправкою. Однієї банки вистачає надовго.",
  },
  {
    name: "Ірина",
    initials: "І",
    context: "Щоденні поїздки",
    text: "Сподобався простий розрахунок дозування. Для мого бака на 60 літрів одразу зрозуміло, скільки антигелю потрібно.",
  },
  {
    name: "Андрій",
    initials: "А",
    context: "Вантажний транспорт",
    text: "Беру антигель завчасно, ще до морозів. Формат суперконцентрату зручний, коли потрібно обробити великий об’єм палива.",
  },
];

export function Reviews() {
  return (
    <section className="reviews-section" id="reviews" aria-labelledby="reviews-title">
      <div className="reviews-heading">
        <div>
          <span className="mini-label">ВІДГУКИ ПРО ТОВАР</span>
          <h2 id="reviews-title">Досвід використання</h2>
        </div>
        <span className="reviews-demo-label">Демонстраційні відгуки</span>
      </div>
      <p className="reviews-disclosure">
        Нижче — вигадані приклади для оформлення сторінки, а не відгуки реальних покупців. Їх буде
        замінено на справжні.
      </p>
      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="review-top">
              <span className="review-stars" aria-label="Демонстраційна оцінка: 5 із 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star size={13} key={i} fill="currentColor" strokeWidth={1} />
                ))}
              </span>
              <span className="review-example">Приклад</span>
            </div>
            <p>«{review.text}»</p>
            <div className="review-author">
              <span className="review-avatar" aria-hidden="true">
                {review.initials}
              </span>
              <div>
                <strong>{review.name}</strong>
                <span>{review.context} · вигаданий автор</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
