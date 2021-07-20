import 'reflect-metadata'
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
} from 'type-graphql'
import { Token } from '../Token'
import { Context } from '../../context'


@InputType()
class TokenCreateInput {
  @Field()
  name: string
  
  @Field()
  symbol: string
}

@Resolver(Token)
export class TokenResolver {
  @Mutation((returns) => Token)
  async create(
    @Ctx() ctx: Context,
    @Arg('data') data: TokenCreateInput,
  ): Promise<Token> {

    return ctx.prisma.token.create({data: {
      name: data.name,
      symbol: data.symbol,
    }})
  }
  
  @Query(returns => [Token])
  async tokens(@Ctx() ctx: Context) {
    return ctx.prisma.token.findMany()
  }

  @Query((symbol) => Token, {nullable: true} )
  async findTokenBySymbol(
    @Ctx() ctx: Context, 
    @Arg("symbol") symbol: string
    ): Promise<Token | null> {
    return ctx.prisma.token.findUnique({
      where: {
        symbol: symbol,
      },
    })
  }
  
  @Query((sol_address) => Token, {nullable: true} )
  async findTokenByAddress(
    @Ctx() ctx: Context, 
    @Arg("sol_address") sol_address: string
    ): Promise<Token | null> {
    return ctx.prisma.token.findFirst({
      where: {
        sol_address: sol_address,
      },
    })
  }

}
