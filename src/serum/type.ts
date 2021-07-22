import 'reflect-metadata'
import { ObjectType, Field, ID, Float, Int } from 'type-graphql'

@ObjectType()
export default class Serum {
  @Field((type) => ID)
  id: number

  @Field((type) => Date)
  timestamp: number 

  @Field()
  market_name: string

  @Field((type) => Int)
  token_id: string
}
