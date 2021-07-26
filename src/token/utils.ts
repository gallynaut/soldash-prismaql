import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from "@solana/spl-token-registry"
import { fetchGeckoSocial } from "../gecko_social/utils"
import { Context } from '../context'
import { upsertToken, upsertTokenSocial } from "./store"
import { AddTokenInput, AddTokenSocialInput } from "./type"
import {PublicKey} from '@solana/web3.js'

export async function check_sol_coins(ctx: Context) {
  new TokenListProvider().resolve().then((tokens) => {
    const mainnetTokens:TokenInfo[] = tokens.filterByChainId(SolanaENV.MainnetBeta).getList();
    mainnetTokens.forEach((tkn:TokenInfo) => parse_sol_coins(ctx, tkn))
  });
}

// parses TokenInfo and builds data for Prisma
export async function parse_sol_coins(ctx: Context, tkn: TokenInfo): Promise<any> {
  const gecko_id = get_gecko_id(tkn)
  const sym =  tkn.symbol === "" ? null : tkn.symbol
  const sol_addr = tkn.address !== "" ? new PublicKey(tkn.address) : null
  const tokenObj: AddTokenInput = {
    name: tkn.name, 
    symbol: sym,
    sol_address: sol_addr ? tkn.address : null,
    // wrapped tokens throwing errors - need to address another way
    // gecko_id: gecko_id,
  }
  const id = await upsertToken(ctx, tokenObj)

  if(id == null) {
    return
  }
  let website = "";
  let twitter = "";
  if (typeof tkn.extensions !== "undefined") {
    if (typeof tkn.extensions.website !== "undefined") {
      website = tkn.extensions.website;
    }
    if (typeof tkn.extensions.twitter !== "undefined") {
      twitter = tkn.extensions.twitter;
    }
  }
  const updTknSocial: AddTokenSocialInput = {
    token_id: id,
    website: website === "" ? null : website,
    twitter: twitter === "" ? null : twitter,
    logoURI: tkn.logoURI,
  }
  upsertTokenSocial(ctx, updTknSocial)

  if(gecko_id !== null ) {
    setTimeout(() => {
      fetchGeckoSocial(ctx, gecko_id)
    }, 10000)
  }
}


export const get_gecko_id = (t: TokenInfo): string | null => {
  if (typeof t.extensions !== "undefined") {
    if (typeof t.extensions.coingeckoId !== "undefined") {
      return t.extensions.coingeckoId
    }
  }
  return null
};
export const get_website = (t: TokenInfo): string | null => {
  if (typeof t.extensions !== "undefined") {
    if (typeof t.extensions.website !== "undefined") {
      return t.extensions.website
    }
  }
  return null
};

