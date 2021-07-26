import 'reflect-metadata'
import { ObjectType, InputType, Field, ID, Float, Int } from 'type-graphql'
import {Length} from 'class-validator'

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
  public_interest_score: number | null

  @Field((type) => Float)
  liquidity_score: number | null

  @Field((type) => Float)
  sentiment_votes_up_percentage: number | null

  @Field((type) => Float)
  sentiment_votes_down_percentage: number | null
}
@InputType({ description: "New gecko social data" })
export class AddGeckoSocialInput implements Partial<GeckoSocial> {
  @Field()
  @Length(2, 64)
  gecko_id: string;

  @Field({ nullable: true })
  timestamp: number | null

  @Field({ nullable: true })
  gecko_score: number | null

  @Field({ nullable: true })
  gecko_rank: number | null

  @Field({ nullable: true })
  alexa_rank: number | null

  @Field({ nullable: true })
  public_interest_score: number | null

  @Field({ nullable: true })
  liquidity_score: number | null

  @Field({ nullable: true })
  sentiment_votes_up_percentage: number | null

  @Field({ nullable: true })
  sentiment_votes_down_percentage: number | null
}
