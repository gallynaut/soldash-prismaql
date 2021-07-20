import 'reflect-metadata'
import * as tq from 'type-graphql'
import TokenResolver from './token/resolver'
import { ApolloServer } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { GraphQLScalarType } from 'graphql'
import { PrismaClient } from '@prisma/client'

const port = parseInt(process.env.APP_PORT || '8080');

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
}

export const context: Context = {
  prisma: prisma
}

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TokenResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
  })

  new ApolloServer({ schema, context: context }).listen({ port: port }, () =>
    console.log(`
🚀 Server ready at: http://localhost:%d`, port
    ),
  )
}

app()
