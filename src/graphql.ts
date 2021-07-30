import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. BigInt can represent values between -(2^53) + 1 and 2^53 - 1.  */
  BigInt: any
}

export type GeckoFinance = {
  __typename?: 'GeckoFinance'
  id: Scalars['ID']
  timestamp: Scalars['BigInt']
  gecko_id: Scalars['String']
  market_cap?: Maybe<Scalars['BigInt']>
  market_cap_rank?: Maybe<Scalars['BigInt']>
  fully_diluted_valuation?: Maybe<Scalars['Int']>
  total_supply?: Maybe<Scalars['Int']>
  max_supply?: Maybe<Scalars['Int']>
  circulating_supply?: Maybe<Scalars['Float']>
  current_price?: Maybe<Scalars['Float']>
  high_24h_price?: Maybe<Scalars['Float']>
  low_24h_price?: Maybe<Scalars['Float']>
  price_change_24h?: Maybe<Scalars['Float']>
  price_change_percentage_24h?: Maybe<Scalars['Float']>
}

export type GeckoSocial = {
  __typename?: 'GeckoSocial'
  id: Scalars['ID']
  timestamp: Scalars['BigInt']
  gecko_id: Scalars['String']
  gecko_score?: Maybe<Scalars['Float']>
  gecko_rank?: Maybe<Scalars['Int']>
  alexa_rank?: Maybe<Scalars['Int']>
  public_interest_score?: Maybe<Scalars['Float']>
  liquidity_score?: Maybe<Scalars['Float']>
  sentiment_votes_up_percentage?: Maybe<Scalars['Float']>
  sentiment_votes_down_percentage?: Maybe<Scalars['Float']>
  token?: Maybe<Token>
}

export type Query = {
  __typename?: 'Query'
  tokens: Array<Token>
  findTokenByGeckoId?: Maybe<Token>
}

export type QueryFindTokenByGeckoIdArgs = {
  gecko_id: Scalars['String']
}

export type Token = {
  __typename?: 'Token'
  id: Scalars['ID']
  name: Scalars['String']
  symbol: Scalars['String']
  description?: Maybe<Scalars['String']>
  sol_address?: Maybe<Scalars['String']>
  gecko_id?: Maybe<Scalars['String']>
  serum_id?: Maybe<Scalars['String']>
  social?: Maybe<TokenSocial>
  market_cap?: Maybe<Scalars['Float']>
  price?: Maybe<Scalars['Float']>
  upvotes?: Maybe<Scalars['Float']>
  gecko_rank?: Maybe<Scalars['Float']>
  geckoSocial?: Maybe<GeckoSocial>
  geckoFinance?: Maybe<GeckoFinance>
}

export type TokenSocial = {
  __typename?: 'TokenSocial'
  id: Scalars['ID']
  website: Scalars['String']
  twitter: Scalars['String']
  logoURI: Scalars['String']
  token_id: Scalars['Int']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>
  GeckoFinance: ResolverTypeWrapper<GeckoFinance>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  GeckoSocial: ResolverTypeWrapper<GeckoSocial>
  Query: ResolverTypeWrapper<{}>
  Token: ResolverTypeWrapper<Token>
  TokenSocial: ResolverTypeWrapper<TokenSocial>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']
  GeckoFinance: GeckoFinance
  ID: Scalars['ID']
  String: Scalars['String']
  Int: Scalars['Int']
  Float: Scalars['Float']
  GeckoSocial: GeckoSocial
  Query: {}
  Token: Token
  TokenSocial: TokenSocial
  Boolean: Scalars['Boolean']
}

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt'
}

export type GeckoFinanceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeckoFinance'] = ResolversParentTypes['GeckoFinance']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  gecko_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  market_cap?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >
  market_cap_rank?: Resolver<
    Maybe<ResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >
  fully_diluted_valuation?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  total_supply?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  max_supply?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  circulating_supply?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  current_price?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  high_24h_price?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  low_24h_price?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  price_change_24h?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  price_change_percentage_24h?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type GeckoSocialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['GeckoSocial'] = ResolversParentTypes['GeckoSocial']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>
  gecko_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  gecko_score?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  gecko_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  alexa_rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  public_interest_score?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  liquidity_score?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  sentiment_votes_up_percentage?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  sentiment_votes_down_percentage?: Resolver<
    Maybe<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
  token?: Resolver<Maybe<ResolversTypes['Token']>, ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  tokens?: Resolver<Array<ResolversTypes['Token']>, ParentType, ContextType>
  findTokenByGeckoId?: Resolver<
    Maybe<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<QueryFindTokenByGeckoIdArgs, 'gecko_id'>
  >
}

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Token'] = ResolversParentTypes['Token']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  symbol?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  sol_address?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  gecko_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  serum_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  social?: Resolver<
    Maybe<ResolversTypes['TokenSocial']>,
    ParentType,
    ContextType
  >
  market_cap?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  price?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  upvotes?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  gecko_rank?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  geckoSocial?: Resolver<
    Maybe<ResolversTypes['GeckoSocial']>,
    ParentType,
    ContextType
  >
  geckoFinance?: Resolver<
    Maybe<ResolversTypes['GeckoFinance']>,
    ParentType,
    ContextType
  >
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TokenSocialResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['TokenSocial'] = ResolversParentTypes['TokenSocial']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  website?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  twitter?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  logoURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  token_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType
  GeckoFinance?: GeckoFinanceResolvers<ContextType>
  GeckoSocial?: GeckoSocialResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Token?: TokenResolvers<ContextType>
  TokenSocial?: TokenSocialResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
