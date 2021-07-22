import 'reflect-metadata'
import { ObjectType, Field, ID, Int, InputType } from 'type-graphql'
import {Length} from 'class-validator'

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
  serum_id: string

  createdAt: Date
  updatedAt: Date
}
@ObjectType()
export class TokenSocial {
  @Field((type) => ID)
  id: number

  @Field()
  website: string

  @Field()
  twitter: string

  @Field()
  logoURI: string

  @Field((type) => Int)
  token_id: number

  createdAt: Date
  updatedAt: Date
}

@InputType({ description: "New token data" })
class AddTokenInputInput implements Partial<Token> {
  @Field()
  @Length(2, 64)
  name: string;

  @Field()
  @Length(2, 32)
  symbol: string;

  @Field({ nullable: true })
  @Length(2, 64)
  gecko_id?: string;

  @Field({ nullable: true })
  @Length(2, 64)
  sol_address?: string;
}