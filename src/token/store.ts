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

// export async function selectGeckoId(ctx: Context, newToken: AddTokenInput) {
//   const t = await ctx.prisma.token.findUnique({where: {gecko_id: newToken.gecko_id}})
//   if(t.id) {
//     return t.id
//   }
//   const newT = await ctx.prisma.token.create({data: newToken})
//   console.log("new token ", newT.id, " created for ", newT.gecko_id)
//   return newT
// }
