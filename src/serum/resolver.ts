import 'reflect-metadata'
import { Resolver } from 'type-graphql'
import Serum from './type'

@Resolver(Serum)
export default class SerumResolver {}
