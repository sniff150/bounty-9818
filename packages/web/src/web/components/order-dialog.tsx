import { useEffect, useRef, useState } from "react";
import { Check, CheckCircle2, LoaderCircle, X } from "lucide-react";
import { customerSchema, type Customer } from "../../shared/order";
import { useCreateOrder } from "../queries/orders";

const fields: {
  key: keyof Customer;
  label: string;
  placeholder: string;
  hint: string;
  autocomplete?: string;
}[] = [
  {
    key: "fullName",
    label: "ПІБ",
    placeholder: "Шевченко Олена Іванівна",
    hint: "Прізвище, ім’я та по батькові",
    autocomplete: "name",
  },
  {
    key: "phone",
    label: "Номер телефону",
    placeholder: "+380 67 123 45 67",
    hint: "Український номер для підтвердження замовлення",
    autocomplete: "tel",
  },
  {
    key: "address",
    label: "Адреса доставки",
    placeholder: "м. Київ, вул. Хрещатик, 22",
    hint: "Місто / населений пункт та адреса відділення Нової пошти",
  },
  {
    key: "branch",
    label: "Номер відділення Нової пошти",
    placeholder: "Наприклад, 15",
    hint: "Номер відділення, де ви отримаєте товар",
  },
];

export function OrderDialog({ quantity, onClose }: { quantity: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState<Customer>({
    fullName: "",
    phone: "",
    address: "",
    branch: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Customer, boolean>>>({});
  const [stage, setStage] = useState<"form" | "success">("form");
  const [requestId] = useState(() => crypto.randomUUID());
  const mutation = useCreateOrder();
  const valid = customerSchema.safeParse(values).success;
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, []);
  useEffect(() => {
    if (stage === "success")
      ref.current?.querySelector<HTMLButtonElement>(".success-close")?.focus();
  }, [stage]);
  const close = () => {
    if (!mutation.isPending) onClose();
  };
  return (
    <dialog
      ref={ref}
      className={"order-dialog " + (stage === "success" ? "success-dialog" : "")}
      aria-labelledby="order-title"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const controls = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(
            "button:not(:disabled), input:not(:disabled)",
          ) ?? [],
        );
        if (!controls.length) return;
        e.preventDefault();
        const current = controls.indexOf(document.activeElement as HTMLElement);
        const next = (current + (e.shiftKey ? -1 : 1) + controls.length) % controls.length;
        controls[next]?.focus();
      }}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
    >
      <button
        className="dialog-x"
        type="button"
        aria-label="Закрити вікно"
        disabled={mutation.isPending}
        onClick={close}
      >
        <X size={20} />
      </button>
      {stage === "success" ? (
        <div className="success-content">
          <span className="success-icon">
            <CheckCircle2 size={38} strokeWidth={1.5} />
          </span>
          <span className="mini-label">ЗАМОВЛЕННЯ ПРИЙНЯТО</span>
          <h2 id="order-title">Дякуємо за замовлення!</h2>
          <p>Чекайте на телефонний дзвінок підтвердження.</p>
          <div className="success-summary">
            XADO Antigel+ · {quantity} шт.
            <strong>{(quantity * 1099).toLocaleString("uk-UA")} грн</strong>
          </div>
          <button className="primary success-close" onClick={onClose}>
            Повернутися на сайт
          </button>
        </div>
      ) : (
        <>
          <span className="mini-label">ДОСТАВКА НОВОЮ ПОШТОЮ</span>
          <h2 id="order-title">Оформлення замовлення</h2>
          <p className="dialog-intro">
            Заповніть дані одержувача. Ми зателефонуємо, щоб підтвердити деталі.
          </p>
          <div className="order-summary">
            <img src="/images/antigel-product.png" alt="Антигель XADO" />
            <div>
              <strong>XADO Antigel+</strong>
              <span>{quantity} шт. · Суперконцентрат 1:1000</span>
            </div>
            <b>{(quantity * 1099).toLocaleString("uk-UA")} грн</b>
          </div>
          <form
            noValidate
            onSubmit={async (e) => {
              e.preventDefault();
              if (!valid || mutation.isPending) return;
              try {
                await mutation.mutateAsync({ ...values, quantity, requestId });
                setStage("success");
              } catch {
                /* Render the error below; preserve fields for retry. */
              }
            }}
          >
            {fields.map((field) => {
              const result = customerSchema.shape[field.key].safeParse(values[field.key]);
              const error = touched[field.key] && !result.success;
              return (
                <div className="form-field" key={field.key}>
                  <label htmlFor={"order-" + field.key}>
                    {field.label}
                    <span aria-hidden="true">*</span>
                  </label>
                  <div
                    className={
                      "field-wrap " +
                      (result.success ? "field-valid" : error ? "field-invalid" : "")
                    }
                  >
                    <input
                      id={"order-" + field.key}
                      aria-label={field.label}
                      required
                      type={field.key === "phone" ? "tel" : "text"}
                      inputMode={
                        field.key === "branch" ? "numeric" : field.key === "phone" ? "tel" : "text"
                      }
                      autoComplete={field.autocomplete ?? "off"}
                      placeholder={field.placeholder}
                      value={values[field.key]}
                      maxLength={
                        field.key === "address"
                          ? 300
                          : field.key === "fullName"
                            ? 150
                            : field.key === "branch"
                              ? 6
                              : 30
                      }
                      aria-invalid={!!error}
                      aria-describedby={"hint-" + field.key}
                      disabled={mutation.isPending}
                      onBlur={() => setTouched((v) => ({ ...v, [field.key]: true }))}
                      onChange={(e) => {
                        setValues((v) => ({ ...v, [field.key]: e.target.value }));
                        if (mutation.isError) mutation.reset();
                      }}
                    />
                    {result.success && <Check size={17} aria-label="Заповнено коректно" />}
                  </div>
                  <p className={error ? "field-error" : "field-hint"} id={"hint-" + field.key}>
                    {error && !result.success ? result.error.issues[0]?.message : field.hint}
                  </p>
                </div>
              );
            })}
            <p className="privacy-note">
              Дані потрібні лише для обробки замовлення та доставки. Вартість і умови доставки
              уточнюються під час дзвінка.
            </p>
            {!valid && (
              <p className="form-progress" aria-live="polite">
                Заповніть усі 4 поля — з’явиться кнопка підтвердження.
              </p>
            )}
            {mutation.isError && (
              <p className="submit-error" role="alert">
                Не вдалося надіслати замовлення. Перевірте з’єднання та спробуйте ще раз. Ваші дані
                залишилися у формі.
              </p>
            )}
            {valid && (
              <button className="primary confirm-order" type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <>
                    <LoaderCircle className="spinner" size={18} />
                    Зберігаємо замовлення…
                  </>
                ) : (
                  <>
                    Підтвердити замовлення
                    <Check size={18} />
                  </>
                )}
              </button>
            )}
          </form>
        </>
      )}
    </dialog>
  );
}
