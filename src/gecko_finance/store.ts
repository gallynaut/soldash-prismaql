import { GeckoFinance } from "@prisma/client";
import { Context } from "../context";

export async function createGeckoFinanceRecord(
  ctx: Context,
  geckoFinanceRecord: any
) {
  let geckoFinance: GeckoFinance;
  try {
    geckoFinance = await ctx.prisma.geckoFinance.create({
      data: geckoFinanceRecord,
    });
    console.log("Added gecko finance for ", geckoFinance.id);
    return geckoFinance.id;
  } catch (err) {
    console.log("Error adding gecko finance: ", err);
  }
  return null;
}
