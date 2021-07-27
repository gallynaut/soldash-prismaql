import "reflect-metadata";
import {
  Resolver,
  FieldResolver,
  Root,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import Token from "../token/type";
import { Context } from "../context";
import GeckoSocial from "./type";

@Resolver(GeckoSocial)
export default class GeckoSocialResolver {
  @FieldResolver((type) => Token, { nullable: true })
  async token(@Root() social: GeckoSocial, @Ctx() ctx: Context) {
    if (social.gecko_id) {
      return await ctx.prisma.token.findUnique({
        where: { gecko_id: social.gecko_id },
      });
    }
  }
}
