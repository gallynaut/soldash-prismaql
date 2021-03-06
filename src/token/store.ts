import { GeckoSocial as PrismaGeckoSocial } from '@prisma/client'
import { TokenAndRank } from '../common/utils'
import { Context } from '../context'
import Token, { AddTokenInput, TokenSocial, AddTokenSocialInput } from './type'

export async function upsertToken(
  ctx: Context,
  t: AddTokenInput
): Promise<Token> {
  return ctx.prisma.token.upsert({
    where: { symbol: t.symbol },
    update: t,
    create: t,
  })
  // let token: Token
  // try {
  //   token = await ctx.prisma.token.upsert({
  //     where: { symbol: t.symbol },
  //     update: t,
  //     create: t,
  //   })
  //   console.log('CREATE, TOKEN:', token.name, ' - ', token.id)
  //   return token.id
  // } catch (err) {
  //   console.log('ERR- CREATE, TOKEN:', t.name, err)
  // }
  // return null
}
// export async function upsertTokenSolAddress(ctx: Context, gecko_id: string, sol_address: string) {

// }

// TokenSocialUncheckedCreateInput
export async function upsertTokenSocial(
  ctx: Context,
  soc: AddTokenSocialInput
): Promise<TokenSocial> {
  return ctx.prisma.tokenSocial.upsert({
    where: { id: soc.token_id },
    update: soc,
    create: soc,
  })
  // let tokenSocial: TokenSocial
  // try {
  //   tokenSocial = await ctx.prisma.tokenSocial.upsert({
  //     where: { id: soc.token_id },
  //     update: soc,
  //     create: soc,
  //   })
  //   console.log('CREATE, TOKEN_SOCIAL:', soc.token_id)
  //   return tokenSocial.id
  // } catch (err) {
  //   console.log('ERR- CREATE, TOKEN_SOCIAL:', err)
  // }
  // return null
}

export async function selectTokensWithGeckoId(ctx: Context): Promise<string[]> {
  const tokens: { gecko_id: string }[] = await ctx.prisma.token.findMany({
    where: {
      gecko_id: {
        not: null,
      },
    },
    select: {
      gecko_id: true,
    },
  })
  return tokens.map((t) => t.gecko_id)
}

export async function selectTokensByGeckoIds(
  ctx: Context,
  geckoIds: string[]
): Promise<Token[]> {
  const tokens: Token[] = new Array<Token>()
  for await (const g of geckoIds) {
    const newToken = await selectTokenByGeckoId(ctx, g)
    if (newToken !== null) {
      tokens.push(newToken)
    }
  }
  return tokens
}
export async function selectTokenByGeckoId(
  ctx: Context,
  geckoId: string
): Promise<Token> {
  return ctx.prisma.token.findUnique({
    where: { gecko_id: geckoId },
  })
}

export async function selectTokenIdByGeckoId(
  ctx: Context,
  geckoId: string
): Promise<number | null> {
  const t = await ctx.prisma.token.findUnique({
    where: { gecko_id: geckoId },
  })
  if (t !== null && t.id) {
    return t.id
  }
  return null
}

export async function selectTokensByGeckoRank(
  ctx: Context,
  offset?: number,
  limit?: number
): Promise<Token[]> {
  const tokens = await ctx.prisma.token.findMany({
    where: {
      gecko_id: {
        not: null,
      },
    },
    include: {
      gecko_social: {
        select: {
          gecko_rank: true,
          timestamp: true,
        },
        orderBy: {
          timestamp: 'desc',
        },
        take: 1,
      },
    },
  })
  tokens.sort((a: TokenAndRank, b: TokenAndRank) => {
    // nulls sort after anything else
    if (
      a === null ||
      a.gecko_social.length !== 1 ||
      a.gecko_social[0] === null ||
      a.gecko_social[0].gecko_rank === null
    ) {
      return 1
    }
    if (
      b === null ||
      b.gecko_social.length !== 1 ||
      b.gecko_social[0] === null ||
      b.gecko_social[0].gecko_rank === null
    ) {
      return -1
    }
    // equal items sort equally
    if (a.gecko_social[0].gecko_rank === b.gecko_social[0].gecko_rank) {
      return 0
    }
    return a.gecko_social[0].gecko_rank < b.gecko_social[0].gecko_rank ? -1 : 1
  })
  if (offset && limit) {
    return tokens.slice(offset, offset + limit)
  }
  return tokens
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
          timestamp: 'asc',
        },
      },
    },
  })
  const sortedResult = result.sort((a, b) =>
    a.gecko_finance[0].market_cap_rank > b.gecko_finance[0].market_cap_rank
      ? 1
      : -1
  )
  const top250: string[] = sortedResult.map((coin: any) => coin.gecko_id)
  return top250
}

export async function selectTokenSocialByID(
  ctx: Context,
  tokenId: number
): Promise<TokenSocial> {
  return ctx.prisma.tokenSocial.findUnique({
    where: { token_id: tokenId },
  })
}
