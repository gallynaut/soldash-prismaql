import 'reflect-metadata'
import { ObjectType, Field, ID, Float, Int } from 'type-graphql'

@ObjectType()
export default class GeckoSocial {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  timestamp: number 

  @Field()
  gecko_id: string 

  @Field((type) => Float)
  gecko_score: number

  @Field((type) => Int)
  gecko_rank: number

  @Field((type) => Int)
  alexa_rank: number 

  @Field((type) => Float)
  public_interest_score: number

  @Field((type) => Float)
  liquidity_score: number

  @Field((type) => Float)
  sentiment_votes_up_percentage: number

  @Field((type) => Float)
  sentiment_votes_down_percentage: number

}
