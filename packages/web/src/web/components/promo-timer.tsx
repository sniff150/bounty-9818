import { useEffect, useState } from "react";

export const PROMO_CYCLE_MS = 15 * 60 * 60 * 1000;
const storageKey = "xado-promo-cycle-start-v1";

export function remainingPromoSeconds(start: number, now: number) {
  const elapsed = Math.max(0, now - start);
  return Math.ceil((PROMO_CYCLE_MS - (elapsed % PROMO_CYCLE_MS)) / 1000);
}

export function PromoTimer() {
  const [start] = useState(() => {
    const now = Date.now();
    try {
      const saved = Number(localStorage.getItem(storageKey));
      if (Number.isFinite(saved) && saved > 0 && saved <= now) return saved;
      localStorage.setItem(storageKey, String(now));
    } catch {
      /* The timer still works when browser storage is unavailable. */
    }
    return now;
  });
  const [remaining, setRemaining] = useState(() => remainingPromoSeconds(start, Date.now()));
  useEffect(() => {
    const update = () => setRemaining(remainingPromoSeconds(start, Date.now()));
    const interval = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
    };
  }, [start]);
  const time = [Math.floor(remaining / 3600), Math.floor(remaining / 60) % 60, remaining % 60];
  return (
    <div className="promo-timer">
      <div
        className="promo-clock"
        role="timer"
        aria-label={`${time[0]} годин ${time[1]} хвилин ${time[2]} секунд до нового циклу`}
        aria-live="off"
      >
        {time.map((value, i) => (
          <div className="promo-unit" key={i}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{["год", "хв", "сек"][i]}</span>
          </div>
        ))}
      </div>
      <details className="timer-conditions">
        <summary>Умови таймера</summary>
        <p>
          Відлік автоматично починається знову після 15 годин і не визначає строк дії знижки.
          Вартість товару залишається 1 099 грн.
        </p>
      </details>
    </div>
  );
}
