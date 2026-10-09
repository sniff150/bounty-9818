# XADO — Winter Ready

Останнє текстове уточнення: прибрано верхній підпис промотаймера, постійне пояснення замінено компактним розкривним пунктом «Умови таймера» з чесним розкриттям циклічного відліку. Заголовок першої переваги: «засіб від загущення».

## Оновлення: фото, відгуки та промоцикл
Замінити фото товару на надане 503806534_Xg-mJV.webp, з прозорим фоном: /images/antigel-product.png. Використовувати в головному блоці та формі. Оригінальне відео лишається без змін.
Нижній розділ відгуків: три вигадані приклади для майбутньої заміни, помітне загальне маркування «Демонстраційні відгуки» й позначка «Приклад» на кожному. Не показувати вигаданий загальний рейтинг, перевірені покупки або статистику покупців.
Біля ціни: циклічний промотаймер 15 годин, з прозорим текстом «Цикл повторюється кожні 15 годин. Ціна не змінюється після завершення». Не стверджувати, що знижка закінчується, якщо вона поновлюється. Локально зберігати початок циклу (без персональних даних), розраховувати час від Date.now, перезапускати після завершення без скидання від перезавантаження сторінки.

## Поточний напрям: простіше, українською
Повністю український інтерфейс. Темний спокійний фон, молочно-білий текст, один лаймовий акцент для замовлення. Шрифт Manrope з кирилицею, без курсивних заголовків. Один головний блок: короткий заголовок, продукт, ціна й кнопка. Далі компактна смуга трьох переваг, інструкція/калькулятор і короткий FAQ. Прибрати декоративні графіки, дубльований продажний блок і кошик.

Оформлення: модальне вікно з ПІБ, телефоном, адресою (місто та адреса відділення), номером відділення Нової пошти. Спільна клієнтська/серверна валідація. Кнопка підтвердження з'являється лише після перевірки всіх полів. Замовлення зберігається через oRPC у таблицю orders. Тоді окреме вікно «Дякуємо за замовлення! Чекайте на телефонний дзвінок підтвердження». Дзвінки й сповіщення продавцю не автоматизовані. Не записувати персональні дані в localStorage, не відкривати публічний список замовлень. Зберегти оригінальне відео, лише позначити, що акції у відео архівні. Ціна 1 099 грн із матеріалу користувача. Дані доставки уточнюються телефоном; жодних вигаданих умов.

Approved direction: supplied dark editorial reference, translated into a winter automotive storefront with the actual XADO Antigel+ product.

Palette: near-black #101210, warm white #f1f1e7, lime #d5eb62, muted olive #889074, blue-gray winter photography. Typography: Poppins body/display with Georgia italic accents. Large tightly spaced headings, uppercase micro-labels. Thin borders, 12px image corners, cinematic hero and overlapping purchase panel. Responsive mobile stacking.

Page sections: nav, hero, specifications, three benefit panels, usage guide with dosage calculator, purchase section, FAQ, footer. Interactions: anchors, quantity selection, local persistent demo cart, side drawer, supplied-video dialog, FAQ accordions. No API changes or new tables; web only.

Use supplied price 1,099 UAH and reference price 1,300 UAH. No invented reviews, urgency, or sizes. Demo checkout only. Product claims from supplied footage; qualify -32°C by fuel and usage. Calculator follows 1:1000 label, with original instructions governing actual use. Assets in public; retain template analytics.

> Starter design brief. Replace this content with the app you're building before writing any UI.
> Keep it short and concrete — it's the single source of truth for palette, typography, pages,
> screens, and flows across web, mobile, and desktop.

One-line description of the app, the platforms it ships on, the visual direction (style, feel), and the core job it does for the user.

## Brand & Colors

One token set, consumed per platform:

- **Web & desktop**: CSS variables in `packages/web/src/web/styles.css` (desktop loads the web UI).
- **Mobile**: `Colors.light` / `Colors.dark` in `packages/mobile/constants/theme.ts`, read via `useColors()`; `userInterfaceStyle: "automatic"` follows the system light/dark setting.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| primary | #1F1F1F | #E5E5E5 | Buttons, active tab, accents |
| background | #FFFFFF | #0A0A0A | Page/screen background |
| card | #FFFFFF | #1A1A1A | Cards, surfaces |
| foreground | #171717 | #FAFAFA | Primary text |
| mutedForeground | #737373 | #A3A3A3 | Secondary text |
| border | #E5E5E5 | #262626 | Hairlines |
| destructive | #DC2626 | #EF4444 | Delete / errors |

## Typography

Name the display + body pairing here. Web: set font families in `styles.css` (self-hosted files go in `packages/web/public/fonts/`). Mobile: system font by default; load custom fonts with `useFonts` from `expo-font` and reference them via `Fonts` in `constants/theme.ts`.

## Pages & Screens

List each page/screen, its route file, and what it shows. Example:

- **Web — Home** (`packages/web/src/web/pages/index.tsx`) — what the user sees first.
- **Mobile — Home** (`packages/mobile/app/(tabs)/index.tsx`) — main tab.
- Add web pages under `src/web/pages/` (+ route in `app.tsx`); mobile tabs under `app/(tabs)/`, stack/modal screens under `app/`.

## Key User Flows

1. Describe the primary flow end to end (open → action → result).
2. ...

## Architecture

- **API**: typed oRPC client (`lib/api.ts` in each package) → the backend in `@template/web`. Query/mutation hooks live in `queries/` (one file per feature); pages/screens call them with `@tanstack/react-query`.
- **State/sync**: TanStack Query with optimistic updates for instant-feel interactions.
- **Auth / payments / uploads**: see `skills/app/references/` when those features are needed.
