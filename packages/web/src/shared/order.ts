import { z } from "zod";

export const customerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(5, "Вкажіть ПІБ повністю")
    .max(150)
    .refine(
      (v) => v.split(/\s+/).length >= 3 && /^[\p{L}\s’'ʼ-]+$/u.test(v),
      "Вкажіть прізвище, ім’я та по батькові",
    ),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine(
      (v) => /^(?:\+?38)?0\d{9}$/.test(v.replace(/[\s()-]/g, "")),
      "Введіть український номер: +380 XX XXX XX XX",
    ),
  address: z
    .string()
    .trim()
    .min(8, "Вкажіть місто та адресу відділення")
    .max(300)
    .refine((v) => /\p{L}/u.test(v), "Вкажіть місто та адресу відділення"),
  branch: z
    .string()
    .trim()
    .regex(/^[1-9]\d{0,5}$/, "Вкажіть номер відділення цифрами"),
});
export const orderSchema = customerSchema.extend({
  quantity: z.number().int().min(1).max(99),
  requestId: z.string().uuid(),
});
export type Customer = z.infer<typeof customerSchema>;
