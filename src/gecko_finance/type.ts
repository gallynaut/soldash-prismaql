import "reflect-metadata";
import { ObjectType, InputType, Field, ID, Float, Int } from "type-graphql";
import { Length } from "class-validator";
import GraphQLBigInt from "graphql-bigint";

@ObjectType()
export default class GeckoFinance {
  @Field((type) => ID)
  id: number;

  @Field((type) => GraphQLBigInt)
  timestamp: BigInt;

  @Field()
  @Length(2, 64)
  gecko_id: string;

  @Field((type) => GraphQLBigInt, { nullable: true })
  market_cap: BigInt | null;

  @Field((type) => GraphQLBigInt, { nullable: true })
  market_cap_rank: BigInt | null;

  @Field((type) => Int, { nullable: true })
  fully_diluted_valuation: number | null;

  @Field((type) => Int, { nullable: true })
  total_supply: number | null;

  @Field((type) => Int, { nullable: true })
  max_supply: number | null;

  @Field((type) => Float, { nullable: true })
  circulating_supply: number | null;

  @Field((type) => Float, { nullable: true })
  current_price: number | null;

  @Field((type) => Float, { nullable: true })
  high_24h_price: number | null;

  @Field((type) => Float, { nullable: true })
  low_24h_price: number | null;

  @Field((type) => Float, { nullable: true })
  price_change_24h: number | null;

  @Field((type) => Float, { nullable: true })
  price_change_percentage_24h: number | null;
}
@InputType({ description: "New gecko finance data" })
export class AddGeckoFinanceInput implements Partial<GeckoFinance> {
  @Field()
  gecko_id: string;

  @Field((type) => GraphQLBigInt)
  timestamp: BigInt;

  @Field((type) => GraphQLBigInt, { nullable: true })
  market_cap: BigInt | null;

  @Field((type) => GraphQLBigInt, { nullable: true })
  market_cap_rank: BigInt | null;

  @Field({ nullable: true })
  fully_diluted_valuation: number | null;

  @Field({ nullable: true })
  total_supply: number | null;

  @Field({ nullable: true })
  max_supply: number | null;

  @Field({ nullable: true })
  circulating_supply: number | null;

  @Field({ nullable: true })
  current_price: number | null;

  @Field({ nullable: true })
  high_24h_price: number | null;

  @Field({ nullable: true })
  low_24h_price: number | null;

  @Field({ nullable: true })
  price_change_24h: number | null;

  @Field({ nullable: true })
  price_change_percentage_24h: number | null;
}
