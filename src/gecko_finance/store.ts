import { GeckoFinance } from '@prisma/client'
import { Context } from '../context'
import { AddGeckoFinanceInput } from './type'

export async function createGeckoFinanceRecord(
  ctx: Context,
  geckoFinanceRecord: AddGeckoFinanceInput | any
): Promise<GeckoFinance | null> {
  let geckoFinance: GeckoFinance
  try {
    geckoFinance = await ctx.prisma.geckoFinance.create({
      data: geckoFinanceRecord,
    })
    console.log('CREATE, GECKO_FINANCE:', geckoFinance.gecko_id)
    return geckoFinance
  } catch (err) {
    console.log('ERR- CREATE, GECKO_FINANCE:', geckoFinanceRecord.gecko_id, err)
  }
  return null
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
