import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from "@solana/spl-token-registry"
import { createGeckoSocial } from "../gecko_social/utils"
import context, { Context } from '../context'
import Token, { TokenSocial } from './type'
import {PublicKey} from '@solana/web3.js'

export const fetch_tokens = () => {
  var date: Date = new Date();
  console.log(date.toLocaleTimeString(), ' Refreshing token data - looking for new data on gecko')
}

export async function check_sol_coins(ctx: Context) {
  new TokenListProvider().resolve().then((tokens) => {
    const mainnetTokens:TokenInfo[] = tokens.filterByChainId(SolanaENV.MainnetBeta).getList();
    // loop through token list and compare with prisma
    mainnetTokens.forEach((tkn:TokenInfo) => {
      const gecko_id = get_gecko_id(tkn)
      upsertToken(ctx, tkn)
      if(gecko_id !== null ) {
        setTimeout(() => {
          createGeckoSocial(ctx, gecko_id)
        }, 1000)
      }  
    })
  });
}
interface UpdateToken {
  name: string | null,
  symbol: string | null,
  sol_address: string | null,
  gecko_id: string | null
}

async function upsertToken( ctx: Context, tkn:TokenInfo ) {
  const gecko_id = get_gecko_id(tkn)
  const sym =  tkn.symbol === "" ? null : tkn.symbol
  const sol_addr = tkn.address !== "" ? new PublicKey(tkn.address) : null
  const tokenObj: UpdateToken = {
    name: tkn.name, 
    symbol: sym,
    sol_address: sol_addr ? tkn.address : null,
    gecko_id: gecko_id,
  }

  let token: Token;
  try {
    token = await ctx.prisma.token.upsert({
      where: { symbol: sym},
      update: tokenObj,
      create: tokenObj,
    })
  } catch(err) {
    console.log(err);
    return
  }
  upsertTokenSocial(ctx, tkn, token.id)

}
async function upsertTokenSocial( ctx: Context, tkn:TokenInfo, tkn_id:number ) {
  try {
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
    const updTknSocial = {
      website: website === "" ? null : website,
      twitter: twitter === "" ? null : twitter,
      logoURI: tkn.logoURI,
      token_id: tkn_id,
    }
    const tokenSocial:TokenSocial = await ctx.prisma.tokenSocial.upsert({
      where: {id: tkn_id},
      update: updTknSocial,
      create: updTknSocial,
      })
    console.log("Added token social for ", tkn.name)
  } catch(err) {
    console.log(err);
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

