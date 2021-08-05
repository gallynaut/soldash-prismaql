import { GeckoFinance } from '@prisma/client'
import { Context } from '../context'
import { AddGeckoFinanceInput } from './type'

export async function createGeckoFinanceRecord(
  ctx: Context,
  geckoFinanceRecord: AddGeckoFinanceInput | any
): Promise<GeckoFinance> {
  return ctx.prisma.geckoFinance.create({
    data: geckoFinanceRecord,
  })
}

export async function selectLatestGeckoFinance(
  ctx: Context,
  geckoId: string
): Promise<GeckoFinance> {
  return ctx.prisma.geckoFinance.findFirst({
    where: {
      gecko_id: geckoId,
    },
    orderBy: {
      timestamp: 'desc',
    },
  })
}
