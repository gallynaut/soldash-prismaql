import "reflect-metadata";
import { ObjectType, InputType, Field, ID, Float, Int } from "type-graphql";
import { Length } from "class-validator";
import GraphQLBigInt from "graphql-bigint"

@ObjectType()
export default class GeckoSocial {
  @Field((type) => ID)
  id: number;

  @Field((type) => GraphQLBigInt)
  timestamp: BigInt;

  @Field()
  gecko_id: string;

  @Field((type) => Float, { nullable: true })
  gecko_score: number | null;

  @Field((type) => Int, { nullable: true })
  gecko_rank: number | null;

  @Field((type) => Int, { nullable: true })
  alexa_rank: number | null;

  @Field((type) => Float, { nullable: true })
  public_interest_score: number | null;

  @Field((type) => Float, { nullable: true })
  liquidity_score: number | null;

  @Field((type) => Float, { nullable: true })
  sentiment_votes_up_percentage: number | null;

  @Field((type) => Float, { nullable: true })
  sentiment_votes_down_percentage: number | null;
}

@InputType({ description: "New gecko social data" })
export class AddGeckoSocialInput implements Partial<GeckoSocial> {
  @Field()
  @Length(2, 64)
  gecko_id: string;

  @Field((type) => GraphQLBigInt)
  timestamp: BigInt;

  @Field((type) => Float, { nullable: true })
  gecko_score: number | null;

  @Field((type) => Int, { nullable: true })
  gecko_rank: number | null;

  @Field((type) => Int, { nullable: true })
  alexa_rank: number | null;

  @Field((type) => Float, { nullable: true })
  public_interest_score: number | null;

  @Field((type) => Float, { nullable: true })
  liquidity_score: number | null;

  @Field((type) => Float, { nullable: true })
  sentiment_votes_up_percentage: number | null;

  @Field((type) => Float, { nullable: true })
  sentiment_votes_down_percentage: number | null;
}
