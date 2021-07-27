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
    const fifteenMinAgo = Date.now() - 15 * 60 * 60 * 1000;
    const recentRecords = await ctx.prisma.geckoFinance.findMany({
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
    });
    if (recentRecords.length > 0) {
      return Number(recentRecords[0].market_cap);
    } else {
      // request new data
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
