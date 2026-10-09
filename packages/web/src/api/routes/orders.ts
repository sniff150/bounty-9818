import { eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { orders as orderTable } from "../database/schema";
import { orderSchema } from "../../shared/order";

export const orders = {
  create: base.input(orderSchema).handler(async ({ input }) => {
    try {
      await db
        .insert(orderTable)
        .values({
          id: input.requestId,
          fullName: input.fullName,
          phone: "+38" + input.phone.replace(/\D/g, "").slice(-10),
          address: input.address,
          branch: input.branch,
          product: "XADO Antigel+ Superconcentrate",
          quantity: input.quantity,
          unitPrice: 1099,
          total: input.quantity * 1099,
        })
        .onConflictDoNothing({ target: orderTable.id });
      const [saved] = await db
        .select({ id: orderTable.id })
        .from(orderTable)
        .where(eq(orderTable.id, input.requestId));
      if (!saved) throw new Error("Order was not saved");
      return { id: saved.id, received: true };
    } catch {
      throw new ORPCError("INTERNAL_SERVER_ERROR", {
        message: "Не вдалося зберегти замовлення. Спробуйте ще раз.",
      });
    }
  }),
};
