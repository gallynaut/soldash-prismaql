import 'reflect-metadata'
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
} from 'type-graphql'
import {
  GeckoFinance as PrismaGeckoFinance,
  GeckoSocial as PrismaGeckoSocial,
} from '@prisma/client'
import Token, { TokenSocial } from './type'
import context, { Context } from '../context'
import GeckoSocial from '../gecko_social/type'
import { HR1, MIN1, MIN15 } from '../common/contants'
import GeckoFinance from '../gecko_finance/type'
import { selectLatestGeckoSocial } from '../gecko_social/store'
import { selectTokensByGeckoRank, selectTokenSocialByID } from './store'
import { selectLatestGeckoFinance } from '../gecko_finance/store'
import { fetchGeckoSocialById } from '../gecko_social/utils'
import { refreshGeckoFinance } from '../gecko_finance/utils'
// import { selectGeckoTop250Rank } from "./store";

@Resolver(Token)
export default class TokenResolver {
  @FieldResolver((type) => TokenSocial, { nullable: true })
  async social(
    @Root() token: Token,
    @Ctx() ctx: Context
  ): Promise<TokenSocial> {
    return selectTokenSocialByID(ctx, token.id)
  }

  @FieldResolver((type) => Float, { nullable: true })
  async market_cap(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if (token.gecko_id) {
      const recentRecord = await selectLatestGeckoFinance(ctx, token.gecko_id)
      const staleInterval = BigInt(Date.now() - HR1)
      if (
        recentRecord &&
        recentRecord.market_cap !== null &&
        recentRecord.timestamp >= staleInterval
      ) {
        return Number(recentRecord.market_cap)
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async price(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if (token.gecko_id) {
      const recentRecord = await selectLatestGeckoFinance(ctx, token.gecko_id)
      const staleInterval = BigInt(Date.now() - HR1)
      if (
        recentRecord &&
        recentRecord.current_price !== null &&
        recentRecord.timestamp >= staleInterval
      ) {
        return Number(recentRecord.current_price)
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async upvotes(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if (token.gecko_id) {
      const recentRecord = await selectLatestGeckoSocial(ctx, token.gecko_id)
      const staleInterval = BigInt(Date.now() - HR1)
      if (
        recentRecord &&
        recentRecord.sentiment_votes_up_percentage !== null &&
        recentRecord.timestamp >= staleInterval
      ) {
        return Number(recentRecord.sentiment_votes_up_percentage)
      }
    }
  }

  @FieldResolver((type) => Float, { nullable: true })
  async gecko_rank(@Root() token: Token, @Ctx() ctx: Context): Promise<number> {
    if (token.gecko_id) {
      const recentRecord = await selectLatestGeckoSocial(ctx, token.gecko_id)
      const staleInterval = BigInt(Date.now() - HR1)
      if (
        recentRecord &&
        recentRecord.gecko_rank !== null &&
        recentRecord.timestamp >= staleInterval
      ) {
        return Number(recentRecord.gecko_rank)
      }
    }
  }

  @FieldResolver((type) => GeckoSocial, { nullable: true })
  async geckoSocial(
    @Root() token: Token,
    @Ctx() ctx: Context
  ): Promise<PrismaGeckoSocial> {
    if (token.gecko_id) {
      return selectLatestGeckoSocial(ctx, token.gecko_id)
    }
  }

  @FieldResolver((type) => GeckoFinance, { nullable: true })
  async geckoFinance(
    @Root() token: Token,
    @Ctx() ctx: Context
  ): Promise<PrismaGeckoFinance> {
    if (token.gecko_id) {
      return selectLatestGeckoFinance(ctx, token.gecko_id)
    }
  }

  @Query((returns) => [Token])
  async tokens(@Ctx() ctx: Context): Promise<Token[]> {
    return selectTokensByGeckoRank(ctx)
  }

  @Query((geckoId) => Token, { nullable: true })
  async findTokenByGeckoId(
    @Ctx() ctx: Context,
    @Arg('gecko_id') geckoId: string
  ): Promise<Token> {
    return ctx.prisma.token.findUnique({
      where: {
        gecko_id: geckoId,
      },
    })
  }
}
