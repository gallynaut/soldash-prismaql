import 'reflect-metadata'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export default class Token {
  @Field((type) => ID)
  id: number

  @Field()
  name: string

  @Field()
  symbol: string

  @Field({nullable: true})
  description: string

  @Field({nullable: true})
  sol_address: string

  @Field({nullable: true})
  gecko_id: string

  @Field({nullable: true})
  website: string

  @Field({nullable: true})
  twitter: string
}
