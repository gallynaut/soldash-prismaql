import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { TimestampResolver } from 'graphql-scalars'
import { GraphQLScalarType } from 'graphql'
import { CoinMarket } from 'coingecko-api-v3'
import TokenResolver from './token/resolver'
import GeckoFinanceResolver from './gecko_finance/resolver'
import GeckoSocialResolver from './gecko_social/resolver'
import SerumResolver from './serum/resolver'
import context, { Context } from './context'
import { fetchGeckoSocialByIds } from './gecko_social/utils'
import {
  fetchGeckoFinance,
  refreshGeckoFinance,
  fetchGeckoCoinsTop500,
} from './gecko_finance/utils'
import { MIN1, MIN15 } from './common/contants'
import { selectGeckoTop250 } from './token/store'

const port = parseInt(process.env.APP_PORT || '8080', 10)

export async function startup(ctx: Context): Promise<void> {
  // await check_sol_coins(context)
  refreshGeckoFinance(context)
  // const top250 = await selectGeckoTop250(context);
  // await fetchGeckoSocialByIds(context, top250);

  // const t = await selectGeckoIdsByGeckoRank(context)
  // const allT = await selectTokensByGeckoIds(context, t)
  // console.log(allT)

  // while (true) {
  //   const coins: CoinMarket[] = await fetchGeckoCoinsTop250(context);
  //   fetchGeckoFinance(context, coins);
  //   const top250 = await selectGeckoTop250(context);
  //   await fetchGeckoSocialByIds(context, top250);
  // }
}
startup(context)

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [
      TokenResolver,
      GeckoFinanceResolver,
      GeckoSocialResolver,
      SerumResolver,
    ],
    scalarsMap: [{ type: GraphQLScalarType, scalar: TimestampResolver }],
  })
  const corsOptions = {
    origin: true,
  }

  new ApolloServer({
    schema,
    context,
    cors: corsOptions,
  }).listen({ port }, () =>
    console.log(
      `
🚀 Server ready at: http://localhost:%d`,
      port
    )
  )
}
app()

/// / We should have some startup scripts before server starts
/// /    - Populate coins from sol_token json
/// /    - Fetch top 300 gecko coins
/// /    - Overall DB checks

// fetch intervals and delays should be moved to environment variables

setInterval(async () => {
  const coins: CoinMarket[] = await fetchGeckoCoinsTop500(context)
  fetchGeckoFinance(context, coins)
}, MIN15)

// fetch gecko social every hour with a 5min delay
setTimeout(() => {
  setInterval(async () => {
    const top250 = await selectGeckoTop250(context)
    await fetchGeckoSocialByIds(context, top250)
  }, MIN1 * 60)
}, MIN1 * 5)
