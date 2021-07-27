import {
  CoinFullInfo,
  CoinListResponseItem,
  CoinMarket,
} from "coingecko-api-v3";
import { Context } from "../context";
import { GeckoFinance } from "@prisma/client";
import { getGeckoTimestamp } from "../common/utils";
import { AddGeckoSocialInput } from "./type";
import { createGeckoSocialRecord } from "./store";
import { AddGeckoFinanceInput } from "../gecko_finance/type";
import { createGeckoFinanceRecord } from "../gecko_finance/store";

// Fetches gecko data with a delay
export async function fetchGeckoSocialByIds(ctx: Context, ids: string[]) {
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  for (const id of ids) {
    fetchGeckoSocial(ctx, id);
    await delay(2000);
  }
}

// Creates a GeckoSocial record from a given gecko_id
export async function fetchGeckoSocial(ctx: Context, gecko_id: string) {
  let geckoIdData: CoinFullInfo;
  try {
    geckoIdData = await ctx.gecko.coinId({ id: gecko_id });
  } catch (err) {
    console.log("couldnt fetch gecko data: ", err);
    return;
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
  };
  createGeckoSocialRecord(ctx, parsedGeckoData);
}

// Fetches the top 250 coins from Gecko by marketcap
export async function fetchGeckoCoinsTop250(ctx: Context) {
  let geckoList: CoinMarket[];
  try {
    geckoList = await ctx.gecko.coinMarket({
      vs_currency: "usd",
      ids: "",
      order: "market_cap_desc",
      per_page: 250,
      price_change_percentage: "24h",
    });
  } catch (err) {
    console.log("couldnt fetch gecko list: ", err);
    return;
  }
  return geckoList;
}
