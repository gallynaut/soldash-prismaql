import "reflect-metadata";
import {
  Resolver,
  FieldResolver,
  Query,
  Mutation,
  Float,
  Arg,
  Ctx,
  Int,
  InputType,
  Field,
  Root,
} from "type-graphql";
import Token, { TokenSocial } from "./type";
import context, { Context } from "../context";
import GeckoSocial from "../gecko_social/type";
import { GeckoFinance as PrismaGeckoFinance, GeckoSocial as PrismaGeckoSocial } from "@prisma/client";
import { HR1, MIN1, MIN15 } from "../common/contants";
import GeckoFinance from "../gecko_finance/type";
import { selectLatestGeckoSocial } from "../gecko_social/store";
import { selectTokenSocialByID } from "./store";
import { selectLatestGeckoFinance } from "../gecko_finance/store";
// import { selectGeckoTop250Rank } from "./store";

@Resolver(Token)
export default class TokenResolver {
  @FieldResolver((type) => TokenSocial, { nullable: true })
  async social(@Root() token: Token, @Ctx() ctx: Context) {
    return selectTokenSocialByID(ctx, token.id)
  }

  @FieldResolver((type) => Float, { nullable: true })
  async market_cap(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if(token.gecko_id) {
      const recentRecord = await selectLatestGeckoFinance(ctx, token.gecko_id)
      const fifteenMinAgo = BigInt(Date.now() - MIN15)
      if (recentRecord && recentRecord.market_cap !== null && recentRecord.timestamp >= fifteenMinAgo) {
        return Number(recentRecord.market_cap);
      } else {
        // TO DO: request new data
        // for now null to catch interval bugs
        return;
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async price(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if(token.gecko_id) {
      const recentRecord = await selectLatestGeckoFinance(ctx, token.gecko_id)
      const fifteenMinAgo = BigInt(Date.now() - MIN15)
      if (recentRecord && recentRecord.current_price !== null && recentRecord.timestamp >= fifteenMinAgo) {
        return Number(recentRecord.current_price);
      } else {
        // TO DO: request new data
        // for now null to catch interval bugs
        return;
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async upvotes(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if(token.gecko_id) {
      const recentRecord = await selectLatestGeckoSocial(ctx, token.gecko_id)
      const fifteenMinAgo = BigInt(Date.now() - MIN15)
      if (recentRecord && recentRecord.sentiment_votes_up_percentage !== null && recentRecord.timestamp >= fifteenMinAgo) {
        return Number(recentRecord.sentiment_votes_up_percentage);
      } else {
        // TO DO: request new data
        // for now null to catch interval bugs
        return;
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async gecko_rank(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if(token.gecko_id) {
      const recentRecord = await selectLatestGeckoSocial(ctx, token.gecko_id)
      const fifteenMinAgo = BigInt(Date.now() - MIN15)
      if (recentRecord && recentRecord.gecko_rank !== null && recentRecord.timestamp >= fifteenMinAgo) {
        return Number(recentRecord.gecko_rank);
      } else {
        // TO DO: request new data
        // for now null to catch interval bugs
        return;
      }
    }
  }

  @FieldResolver((type) => GeckoSocial, { nullable: true })
  async geckoSocial(@Root() token: Token, @Ctx() ctx: Context) {
    if (token.gecko_id) {
      return selectLatestGeckoSocial(ctx, token.gecko_id)
    }
  }
  @FieldResolver((type) => GeckoFinance, { nullable: true })
  async geckoFinance(@Root() token: Token, @Ctx() ctx: Context) {
    if (token.gecko_id) {
      return selectLatestGeckoFinance(ctx, token.gecko_id)
    }
  }

  @Query((returns) => [Token])
  async tokens(@Ctx() ctx: Context) {
    return ctx.prisma.token.findMany();
  }

  @Query((gecko_id) => Token, { nullable: true })
  async findTokenByGeckoId(
    @Ctx() ctx: Context,
    @Arg("gecko_id") gecko_id: string
  ) {
    return ctx.prisma.token.findUnique({
      where: {
        gecko_id: gecko_id,
      },
    });
  }
}
