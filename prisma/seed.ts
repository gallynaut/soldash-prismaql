import { PrismaClient, Prisma } from '../prisma/generated/prisma-client-js'
// import {TokenCreateInput} from '../src/TokenResolver';

const prisma = new PrismaClient()

const tokenData: Prisma.TokenCreateInput[] = [
  // {
  //   name: 'Solana',
  //   symbol: 'SOL',
  //   description: 'temp description of Solana',
  //   sol_address: 'So11111111111111111111111111111111111111112',
  //   gecko_id: 'solana',
  //   website: 'solana.com',
  //   twitter: 'twitter.com/solana'
  // },
  // {
  //   name: 'Serum',
  //   symbol: 'SRM',
  //   description: 'temp description of Serum',
  //   sol_address: 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt',
  //   gecko_id: 'serum',
  //   website: 'projectserum.com',
  //   twitter: 'twitter.com/projectserum'
  // },

]

async function main() {
  console.log(`Start seeding ...`)
  for (const t of tokenData) {
    const token = await prisma.token.create({
      data: t,
    })
    console.log(`Created token with id: ${token.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
