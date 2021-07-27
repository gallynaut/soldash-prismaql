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
import Token from "./type";
import { Context } from "../context";
import Serum from "./type";

@Resolver(Serum)
export default class SerumResolver {}
