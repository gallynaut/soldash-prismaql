import 'reflect-metadata'
import { ObjectType, Field, ID, Float, Int } from 'type-graphql'

@ObjectType()
export default class GeckoFinance {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  timestamp: number 

  @Field()
  gecko_id: string

  @Field((type) => Int)
  market_cap_usd: number

  @Field((type) => Int)
  market_cap_btc: number

  @Field((type) => Int)
  market_cap_rank: number

  @Field((type) => Int)
  fully_diluted_valuation: number

  @Field((type) => Int)
  total_supply: number

  @Field((type) => Int)
  max_supply: number

  @Field((type) => Float)
  circulating_supply: number

  @Field((type) => Float)
  current_price: number

  @Field((type) => Float)
  high_24h_price: number

  @Field((type) => Float)
  low_24h_price: number

  @Field((type) => Float)
  price_change_24h: number 

  @Field((type) => Float)
  price_change_percentage_24h: number 


}
