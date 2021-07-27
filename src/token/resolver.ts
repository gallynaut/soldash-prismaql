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
import { GeckoFinance as PrismaGeckoFinance } from "@prisma/client";
import { MIN1, MIN15 } from "../common/contants";

@Resolver(Token)
export default class TokenResolver {
  @FieldResolver((type) => TokenSocial, { nullable: true })
  async social(@Root() token: Token, @Ctx() ctx: Context) {
    return await ctx.prisma.tokenSocial.findUnique({
      where: { token_id: token.id },
    });
  }

  @FieldResolver((type) => Float, { nullable: true })
  async market_cap(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    const fifteenMinAgo = Date.now() - MIN15;
    const recentRecord: PrismaGeckoFinance =
      await ctx.prisma.geckoFinance.findFirst({
        where: {
          AND: [
            {
              gecko_id: token.gecko_id,
            },
            {
              timestamp: {
                gte: fifteenMinAgo,
              },
            },
          ],
        },
        orderBy: {
          timestamp: "desc",
        },
      });

    if (recentRecord && recentRecord.market_cap !== null) {
      // const elapsed = (Date.now() - Number(recentRecord.timestamp))/MIN1
      // console.log(elapsed, " minutes = ", recentRecord.market_cap)
      return Number(recentRecord.market_cap);
    } else {
      // TO DO: request new data
      // for now null to catch interval bugs
      return;
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async price(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    const fifteenMinAgo = Date.now() - MIN15;
    const recentRecord: PrismaGeckoFinance =
      await ctx.prisma.geckoFinance.findFirst({
        where: {
          AND: [
            {
              gecko_id: token.gecko_id,
            },
            {
              timestamp: {
                gte: fifteenMinAgo,
              },
            },
          ],
        },
        orderBy: {
          timestamp: "desc",
        },
      });

    if (recentRecord && recentRecord.current_price !== null) {
      // const elapsed = (Date.now() - Number(recentRecord.timestamp))/MIN1
      // console.log(elapsed, " minutes = ", recentRecord.market_cap)
      return Number(recentRecord.current_price);
    } else {
      // TO DO: request new data
      // for now null to catch interval bugs
      return;
    }
  }

  @FieldResolver((type) => [GeckoSocial], { nullable: true })
  async geckoSocial(@Root() token: Token, @Ctx() ctx: Context) {
    if (token.gecko_id) {
      return await ctx.prisma.geckoSocial.findMany({
        where: { gecko_id: token.gecko_id },
      });
    }
  }
  @FieldResolver((type) => Int, { nullable: true })
  async numGeckoSocialRecords(@Root() token: Token, @Ctx() ctx: Context) {
    return (
      await ctx.prisma.geckoSocial.findMany({
        where: { gecko_id: token.gecko_id },
      })
    ).length;
  }

  @Query((returns) => [Token])
  async tokens(@Ctx() ctx: Context) {
    return ctx.prisma.token.findMany();
  }
  @Query((returns) => [Token])
  async tokensTop250(@Ctx() ctx: Context) {
    const result: (Token & { gecko_finance: PrismaGeckoFinance[] })[] =
      await ctx.prisma.token.findMany({
        include: {
          gecko_finance: {
            orderBy: {
              timestamp: "asc",
            },
          },
        },
      });
    const sortedResult = result.sort((a, b) =>
      a.gecko_finance[0].market_cap_rank > b.gecko_finance[0].market_cap_rank
        ? 1
        : -1
    );
    return sortedResult;
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
