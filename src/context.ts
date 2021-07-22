import { CoinGeckoClient } from 'coingecko-api-v3';
import { PrismaClient } from '../prisma/generated/prisma-client-js'

const prisma = new PrismaClient({
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ]
})
const gecko = new CoinGeckoClient({
  timeout: 10000,
  autoRetry: true,
});

export interface Context {
  prisma: PrismaClient
  gecko: CoinGeckoClient
}

const context: Context = {
  prisma: prisma,
  gecko: gecko
}

export default context