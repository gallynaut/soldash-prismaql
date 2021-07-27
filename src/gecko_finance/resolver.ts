import "reflect-metadata";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
} from "type-graphql";
import { Context } from "../context";
import GeckoFinance from "./type";

@Resolver(GeckoFinance)
export default class GeckoFinanceResolver {}
