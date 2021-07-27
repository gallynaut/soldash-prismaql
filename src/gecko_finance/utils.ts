import { CoinMarket } from "coingecko-api-v3";
import { getGeckoTimestamp } from "../common/utils";
import { Context } from "../context";
import { selectGeckoId, upsertToken } from "../token/store";
import { AddTokenInput } from "../token/type";
import { createGeckoFinanceRecord } from "./store";
import { AddGeckoFinanceInput } from "./type";

// loop through list and populate gecko_finance DB
// we only auto populate top 250 coins by gecko ID
// other coins should be populated on an as-needed basis
export async function fetchGeckoFinance(ctx: Context, geckoList: CoinMarket[]) {
  geckoList.forEach(async (coin) => {
    const id = await selectGeckoId(ctx, coin.id);
    if (id === null) {
      const newToken: AddTokenInput = {
        name: coin.name,
        symbol: coin.symbol,
        gecko_id: coin.id,
      };
      const t = await upsertToken(ctx, newToken);
    }
    const newGeckoFinanceRecord: AddGeckoFinanceInput = {
      timestamp: getGeckoTimestamp(coin.last_updated),
      gecko_id: coin.id,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      fully_diluted_valuation: coin.fully_diluted_valuation,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      circulating_supply: coin.circulating_supply,
      current_price: coin.current_price,
      high_24h_price: coin.high_24h,
      low_24h_price: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
    };

    createGeckoFinanceRecord(ctx, newGeckoFinanceRecord);
  });
}
