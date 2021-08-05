import { GeckoSocial } from '@prisma/client'
import { Context } from '../context'
import { selectTokensWithGeckoId } from '../token/store'
import { AddGeckoSocialInput } from './type'

export async function createGeckoSocialRecord(
  ctx: Context,
  newGeckoSocialData: AddGeckoSocialInput | any
): Promise<number> {
  try {
    const newRecord: GeckoSocial = await ctx.prisma.geckoSocial.create({
      data: newGeckoSocialData,
    })
    console.log('CREATE, GECKO_SOCIAL:', newRecord.gecko_id)
    return newRecord.id
  } catch (err) {
    console.log('ERR- CREATE, GECKO_SOCIAL:', newGeckoSocialData.gecko_id, err)
  }
  return null
}

export async function getGeckoIds(
  ctx: Context,
  limit = 100
): Promise<string[]> {
  const validGeckoIds = await ctx.prisma.token.findMany({
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
      id: 'asc',
    },
  })
  return validGeckoIds.map((id) => id.gecko_id)
}

export async function selectLatestGeckoSocial(
  ctx: Context,
  geckoId: string
): Promise<GeckoSocial> {
  return ctx.prisma.geckoSocial.findFirst({
    where: {
      gecko_id: geckoId,
    },
    orderBy: {
      timestamp: 'desc',
    },
  })
}

export async function selectGeckoIdsByGeckoRank(
  ctx: Context
): Promise<string[]> {
  const tokens: string[] = await selectTokensWithGeckoId(ctx)
  const geckoSocials: GeckoSocial[] = new Array<GeckoSocial>()
  for await (const t of tokens) {
    const newSocial = await selectLatestGeckoSocial(ctx, t)
    if (newSocial !== null) {
      geckoSocials.push(newSocial)
    }
  }
  geckoSocials.sort(geckoRankSorter())
  return geckoSocials.map((t) => t.gecko_id)
}

function geckoRankSorter() {
  return function (a: GeckoSocial, b: GeckoSocial) {
    // nulls sort after anything else
    if (a === null || a.gecko_rank === null) {
      return 1
    }
    if (b === null || b.gecko_rank === null) {
      return -1
    }
    // equal items sort equally
    if (a.gecko_rank === b.gecko_rank) {
      return 0
    }
    return a.gecko_rank < b.gecko_rank ? -1 : 1
  }
}
