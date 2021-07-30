import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from '@solana/spl-token-registry'
import { PublicKey } from '@solana/web3.js'
import { Context } from '../context'
import { upsertToken, upsertTokenSocial } from './store'
import { AddTokenInput, AddTokenSocialInput } from './type'

export async function checkSolCoins(ctx: Context): Promise<void> {
  new TokenListProvider().resolve().then((tokens) => {
    const mainnetTokens: TokenInfo[] = tokens
      .filterByChainId(SolanaENV.MainnetBeta)
      .getList()
    mainnetTokens.forEach((tkn: TokenInfo) => parseSolCoins(ctx, tkn))
  })
}

// parses TokenInfo and builds data for Prisma
export async function parseSolCoins(
  ctx: Context,
  tkn: TokenInfo
): Promise<any> {
  const geckoId = parseGeckoId(tkn)
  const sym = tkn.symbol === '' ? null : tkn.symbol
  const solAddr = tkn.address !== '' ? new PublicKey(tkn.address) : null
  const tokenObj: AddTokenInput = {
    name: tkn.name,
    symbol: sym,
    sol_address: solAddr ? tkn.address : null,
    // wrapped tokens throwing errors - need to address another way
    // gecko_id: geckoId,
  }
  const id = await upsertToken(ctx, tokenObj)

  if (id == null) {
    return
  }
  let website = ''
  let twitter = ''
  if (typeof tkn.extensions !== 'undefined') {
    if (typeof tkn.extensions.website !== 'undefined') {
      website = tkn.extensions.website
    }
    if (typeof tkn.extensions.twitter !== 'undefined') {
      twitter = tkn.extensions.twitter
    }
  }
  const updTknSocial: AddTokenSocialInput = {
    token_id: id,
    website: website === '' ? null : website,
    twitter: twitter === '' ? null : twitter,
    logoURI: tkn.logoURI,
  }
  upsertTokenSocial(ctx, updTknSocial)

  // if (gecko_id !== null) {
  //   setTimeout(() => {
  //     fetchGeckoSocial(ctx, gecko_id);
  //   }, 10000);
  // }
}

export const parseGeckoId = (t: TokenInfo): string | null => {
  if (typeof t.extensions !== 'undefined') {
    if (typeof t.extensions.coingeckoId !== 'undefined') {
      return t.extensions.coingeckoId
    }
  }
  return null
}
