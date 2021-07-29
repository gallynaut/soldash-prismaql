import { GeckoFinance } from "@prisma/client";
import { Context } from "../context";
import { AddGeckoFinanceInput } from "./type";

export async function createGeckoFinanceRecord(
  ctx: Context,
  geckoFinanceRecord: AddGeckoFinanceInput | any
): Promise<GeckoFinance | null> {
  let geckoFinance: GeckoFinance;
  try {
    geckoFinance = await ctx.prisma.geckoFinance.create({
      data: geckoFinanceRecord,
    });
    console.log("Added gecko finance record for ", geckoFinance.gecko_id);
    return geckoFinance;
  } catch (err) {
    console.log("Error adding gecko finance: ", err);
  }
  return null;
}

export async function selectLatestGeckoFinance(ctx: Context, gecko_id: string) {
  return await ctx.prisma.geckoFinance.findFirst({
    where: {
      gecko_id: gecko_id,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
}
