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

export async function selectGeckoId(ctx: Context, gecko_id: string) {
  const t = await ctx.prisma.token.findUnique({
    where: { gecko_id: gecko_id },
  });
  if (t !== null && t.id) {
    return t.id;
  } else {
    return null;
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
  const top250 = sortedResult.map((coin: any) => coin.gecko_id);
  return top250;
}

// export async function selectGeckoTop250Rank(ctx: Context) {
//   const result: (Token & {gecko_social: PrismaGeckoSocial[]})[]  = await ctx.prisma.token.findMany({
//     include: {
//       gecko_social: {
//         orderBy: {
//           timestamp: "asc",
//         },
//       },
//     },
//   });
//   const sortedResult = result.sort((a, b) => {
//      a.gecko_social[0].gecko_rank > b.gecko_social[0].gecko_rank ? 1 : -1
//     }
//   );
//   console.log("SORTED: ", sortedResult.length)
//   return sortedResult;
// }
// function compare_gecko_ranks(a,b) {

//   // if (a is less than b by some ordering criterion) {
//   //   return -1;
//   // }
//   // if (a is greater than b by the ordering criterion) {
//   //   return 1;
//   // }
//   // a must be equal to b
//   return 0;
// }

// export async function selectGeckoId(ctx: Context, newToken: AddTokenInput) {
//   const t = await ctx.prisma.token.findUnique({where: {gecko_id: newToken.gecko_id}})
//   if(t.id) {
//     return t.id
//   }
//   const newT = await ctx.prisma.token.create({data: newToken})
//   console.log("new token ", newT.id, " created for ", newT.gecko_id)
//   return newT
// }
