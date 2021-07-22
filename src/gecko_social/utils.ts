import { CoinFullInfo } from 'coingecko-api-v3'
import context, { Context } from '../context'


export async function createGeckoSocial( ctx: Context, gecko_id: string ) {

  let geckoIdData: CoinFullInfo;
  try {
    geckoIdData = await ctx.gecko.coinId({id: gecko_id})
  } catch(err) {
    console.log("couldnt fetch gecko data: ", err)
    return
  }
  const ts_date: Date = geckoIdData.last_updated
  const ts: number = ts_date === undefined || ts_date === null ? Date.now() : new Date(ts_date).getTime()

  const parsedGeckoData = {
    timestamp: ts,
    gecko_id: geckoIdData.id,
    gecko_score: geckoIdData.coingecko_score,
    gecko_rank: geckoIdData.coingecko_rank,
    alexa_rank: geckoIdData.public_interest_stats.alexa_rank,
    public_interest_score: geckoIdData.public_interest_score,
    liquidity_score: geckoIdData.liquidity_score,
    sentiment_votes_up_percentage: geckoIdData.sentiment_votes_up_percentage,
    sentiment_votes_down_percentage: geckoIdData.sentiment_votes_down_percentage,
  }
  try {
    const newRec = await ctx.prisma.geckoSocial.create({data: parsedGeckoData})
    console.log("Added gecko social for ", gecko_id)
  } catch(err) {
    console.log(err)
  }
}
export async function get_gecko_ids( ctx: Context, limit: number = 100 ) { 
  const valid_gecko_ids = await ctx.prisma.token.findMany({
    take: limit,
    where: {
      NOT: {
        gecko_id: null,
      }
    },
    select: {
      gecko_id: true,
    },
    orderBy: {
      id: 'asc'
    },
  })
  return valid_gecko_ids.map((id) => id.gecko_id)
}
export async function fetch_gecko_social( ctx: Context, limit: number = 100 ) {
  const ids = await get_gecko_ids(ctx, 100)
  const delay = (ms:number) => new Promise(res => setTimeout(res, ms))
  for(const id of ids) {
    createGeckoSocial(ctx, id)
    console.log("delay")
    await delay(3000);
  }
}