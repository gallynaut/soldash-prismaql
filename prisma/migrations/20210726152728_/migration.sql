/*
  Warnings:

  - You are about to drop the column `market_cap_btc` on the `GeckoFinance` table. All the data in the column will be lost.
  - You are about to drop the column `market_cap_usd` on the `GeckoFinance` table. All the data in the column will be lost.
  - Added the required column `market_cap` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeckoFinance" DROP COLUMN "market_cap_btc",
DROP COLUMN "market_cap_usd",
ADD COLUMN     "market_cap" INTEGER NOT NULL;
