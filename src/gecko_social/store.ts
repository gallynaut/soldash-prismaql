import { GeckoSocial } from "@prisma/client";
import { Context } from "../context";
import { AddGeckoSocialInput } from "./type";

export async function createGeckoSocialRecord(
  ctx: Context,
  newGeckoSocialData: AddGeckoSocialInput | any
) {
  try {
    const newRecord: GeckoSocial = await ctx.prisma.geckoSocial.create({
      data: newGeckoSocialData,
    });
    console.log("Added gecko social for ", newRecord.gecko_id);
    return newRecord.id;
  } catch (err) {
    console.log(err);
  }
  return null;
}

export async function getGeckoIds(ctx: Context, limit: number = 100) {
  const valid_gecko_ids = await ctx.prisma.token.findMany({
    take: limit,
    where: {
      NOT: {
        gecko_id: null,
      },
    },
    select: {
      gecko_id: true,
    },
    orderBy: {
      id: "asc",
    },
  });
  return valid_gecko_ids.map((id) => id.gecko_id);
}

export async function selectLatestGeckoSocial(ctx: Context, gecko_id: string) {
  return await ctx.prisma.geckoSocial.findFirst({
    where: { 
      gecko_id: gecko_id 
    },
    orderBy: {
      timestamp: "desc"
    }
  });
}