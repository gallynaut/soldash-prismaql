import 'reflect-metadata'
import * as tq from 'type-graphql'
import { TokenResolver } from './modules/token/TokenResolver'
import { ApolloServer } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { context } from './context'
import { GraphQLScalarType } from 'graphql'
import cors from "cors";

const port = parseInt(process.env.APP_PORT || '3000');

const app = async () => {
  // tq.registerEnumType(SortOrder, {
  //   name: 'SortOrder'
  // })

  const schema = await tq.buildSchema({
    resolvers: [TokenResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
  })

  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: "http://localhost:3000"
  //   })
  // );

  new ApolloServer({ schema, context: context }).listen({ port: port }, () =>
    console.log(`
🚀 Server ready at: http://localhost:%d`, port
    ),
  )
}

app()
