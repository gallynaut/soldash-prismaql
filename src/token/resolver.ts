import 'reflect-metadata'
import {
  Resolver,
  FieldResolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  Root,
} from 'type-graphql'
import Token, { TokenSocial } from './type'
import context, { Context } from '../context'

@Resolver(Token)
export default class TokenResolver {
  @FieldResolver(type => TokenSocial, { nullable: true })
  social(@Root() token: Token, @Ctx() ctx: Context) {    
    
  }

  // @Mutation((returns) => Token)
  // async create(
  //   @Ctx() ctx: Context,
  //   @Arg('data') data: TokenCreateInput,
  // ): Promise<Token> {

  //   return ctx.prisma.token.create({data: {
  //     name: data.name,
  //     symbol: data.symbol,
  //   }})
  // }
  
  @Query(returns => [Token])
  async tokens(@Ctx() ctx: Context) {
    return ctx.prisma.token.findMany()
  }

  // @Query((symbol) => Token, {nullable: true} )
  // async findTokenBySymbol(
  //   @Ctx() ctx: Context, 
  //   @Arg("symbol") symbol: string
  //   ): Promise<Token | null> {
  //   return ctx.prisma.token.findUnique({
  //     where: {
  //       symbol: symbol,
  //     },
  //   })
  // }
  
  // @Query((sol_address) => Token, {nullable: true} )
  // async findTokenByAddress(
  //   @Ctx() ctx: Context, 
  //   @Arg("sol_address") sol_address: string
  //   ): Promise<Token | null> {
  //   return ctx.prisma.token.findFirst({
  //     where: {
  //       sol_address: sol_address,
  //     },
  //   })
  // }

}
