import {
  CoinFullInfo,
  CoinListResponseItem,
  CoinMarket,
} from 'coingecko-api-v3'
import { GeckoFinance } from '@prisma/client'
import { Context } from '../context'
import { getGeckoTimestamp } from '../common/utils'
import { AddGeckoSocialInput } from './type'
import { createGeckoSocialRecord } from './store'
import { AddGeckoFinanceInput } from '../gecko_finance/type'
import { createGeckoFinanceRecord } from '../gecko_finance/store'
import { selectGeckoTop250 } from '../token/store'

// Fetches gecko data with a delay
export async function fetchGeckoSocialByIds(
  ctx: Context,
  ids: string[]
): Promise<void> {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
  for (const id of ids) {
    fetchGeckoSocialById(ctx, id)
    await delay(2000)
  }
}

// Creates a GeckoSocial record from a given gecko_id
export async function fetchGeckoSocialById(
  ctx: Context,
  geckoId: string
): Promise<void> {
  let geckoIdData: CoinFullInfo
  try {
    geckoIdData = await ctx.gecko.coinId({ id: geckoId })
  } catch (err) {
    console.log('couldnt fetch gecko data: ', err)
    return
  }

  const parsedGeckoData: AddGeckoSocialInput = {
    timestamp: getGeckoTimestamp(geckoIdData.last_updated),
    gecko_id: geckoIdData.id,
    gecko_score: geckoIdData.coingecko_score,
    gecko_rank: geckoIdData.coingecko_rank,
    alexa_rank: geckoIdData.public_interest_stats.alexa_rank,
    public_interest_score: geckoIdData.public_interest_score,
    liquidity_score: geckoIdData.liquidity_score,
    sentiment_votes_up_percentage: geckoIdData.sentiment_votes_up_percentage,
    sentiment_votes_down_percentage:
      geckoIdData.sentiment_votes_down_percentage,
  }
  createGeckoSocialRecord(ctx, parsedGeckoData)
}

export async function refreshAllGeckoSocial(ctx: Context): Promise<void> {
  const top250 = await selectGeckoTop250(ctx)
  await fetchGeckoSocialByIds(ctx, top250)
}
