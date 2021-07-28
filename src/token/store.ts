import { GeckoSocial as PrismaGeckoSocial} from "@prisma/client";
import { Context } from "../context";
import Token, { AddTokenInput, TokenSocial, AddTokenSocialInput } from "./type";

export async function upsertToken(ctx: Context, t: AddTokenInput) {
  let token: Token;
  try {
    token = await ctx.prisma.token.upsert({
      where: { symbol: t.symbol },
      update: t,
      create: t,
    });
    console.log("created token ", token.name, " - ", token.id);
    return token.id;
  } catch (err) {
    console.log(err);
  }
  return null;
}

// TokenSocialUncheckedCreateInput
export async function upsertTokenSocial(
  ctx: Context,
  soc: AddTokenSocialInput
) {
  let tokenSocial: TokenSocial;
  try {
    tokenSocial = await ctx.prisma.tokenSocial.upsert({
      where: { id: soc.token_id },
      update: soc,
      create: soc,
    });
    console.log("Added token social for ", soc.token_id);
    return tokenSocial.id;
  } catch (err) {
    console.log("Error adding token social: ", err);
  }
  return null;
}

export async function selectTokenIdByGeckoId(ctx: Context, gecko_id: string):Promise<number> {
  const t = await ctx.prisma.token.findUnique({
    where: { gecko_id: gecko_id },
  });
  if (t !== null && t.id) {
    return t.id;
  }
}

export async function selectGeckoTop250(ctx: Context): Promise<string[]> {
  const result: any[] = await ctx.prisma.token.findMany({
    include: {
      gecko_finance: {
        select: {
          id: true,
          market_cap_rank: true,
          timestamp: true,
        },
        orderBy: {
          timestamp: "asc",
        },
      },
    },
  });
  const sortedResult = result.sort((a, b) =>
    a.gecko_finance[0].market_cap_rank > b.gecko_finance[0].market_cap_rank
      ? 1
      : -1
  );
  const top250:string[] = sortedResult.map((coin: any) => coin.gecko_id);
  return top250;
}

export async function selectTokenSocialByID(ctx: Context, token_id: number) {
  return await ctx.prisma.tokenSocial.findUnique({
    where: { token_id: token_id },
  });
}