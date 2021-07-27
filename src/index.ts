import "reflect-metadata";
import * as tq from "type-graphql";
import TokenResolver from "./token/resolver";
import { ApolloServer } from "apollo-server";
import { TimestampResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
import GeckoFinanceResolver from "./gecko_finance/resolver";
import GeckoSocialResolver from "./gecko_social/resolver";
import SerumResolver from "./serum/resolver";
import context, { Context } from "./context";
import { check_sol_coins } from "./token/utils";
import {
  fetchGeckoCoinsTop250,
  fetchGeckoSocialByIds,
} from "./gecko_social/utils";
import { CoinMarket } from "coingecko-api-v3";
import { fetchGeckoFinance } from "./gecko_finance/utils";
import { MIN1 } from "./common/contants";
import { selectGeckoTop250 } from "./token/store";

const port = parseInt(process.env.APP_PORT || "8080");

export async function startup(ctx: Context) {
  // await check_sol_coins(context)
  const coins: CoinMarket[] = await fetchGeckoCoinsTop250(context);
  fetchGeckoFinance(context, coins);
  const top250 = await selectGeckoTop250(context);
  await fetchGeckoSocialByIds(context, top250);

  while (true) {
    const coins: CoinMarket[] = await fetchGeckoCoinsTop250(context);
    fetchGeckoFinance(context, coins);
    const top250 = await selectGeckoTop250(context);
    await fetchGeckoSocialByIds(context, top250);
  }
}
startup(context);

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [
      TokenResolver,
      GeckoFinanceResolver,
      GeckoSocialResolver,
      SerumResolver,
    ],
    scalarsMap: [{ type: GraphQLScalarType, scalar: TimestampResolver }],
  });

  new ApolloServer({ schema, context: context, cors: true }).listen(
    { port: port },
    () =>
      console.log(
        `
🚀 Server ready at: http://localhost:%d`,
        port
      )
  );
};
app();

//// We should have some startup scripts before server starts
////    - Populate coins from sol_token json
////    - Fetch top 300 gecko coins
////    - Overall DB checks

// fetch intervals and delays should be moved to environment variables

// setup utils
// setInterval(() => {
// fetch_gecko_data();
// }, MIN*5)

// setTimeout(() => {
//   setInterval(() => {
//   fetch_tokens();
//   }, MIN*5)
// }, MIN*2.5)
