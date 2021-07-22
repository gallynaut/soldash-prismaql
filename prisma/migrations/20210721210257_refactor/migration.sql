/*
  Warnings:

  - You are about to drop the column `token_id` on the `GeckoFinance` table. All the data in the column will be lost.
  - You are about to drop the column `token_id` on the `GeckoSocial` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[gecko_id]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `circulating_supply` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_price` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fully_diluted_valuation` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gecko_id` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `high_24h_price` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low_24h_price` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_supply` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_change_24h` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_change_percentage_24h` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_supply` to the `GeckoFinance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alexa_rank` to the `GeckoSocial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gecko_id` to the `GeckoSocial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `GeckoSocial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GeckoFinance" DROP CONSTRAINT "GeckoFinance_token_id_fkey";

-- DropForeignKey
ALTER TABLE "GeckoSocial" DROP CONSTRAINT "GeckoSocial_token_id_fkey";

-- AlterTable
ALTER TABLE "GeckoFinance" DROP COLUMN "token_id",
ADD COLUMN     "circulating_supply" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "current_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fully_diluted_valuation" INTEGER NOT NULL,
ADD COLUMN     "gecko_id" VARCHAR(64) NOT NULL,
ADD COLUMN     "high_24h_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "low_24h_price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "max_supply" INTEGER NOT NULL,
ADD COLUMN     "price_change_24h" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_change_percentage_24h" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "timestamp" BIGINT NOT NULL,
ADD COLUMN     "total_supply" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GeckoSocial" DROP COLUMN "token_id",
ADD COLUMN     "alexa_rank" INTEGER NOT NULL,
ADD COLUMN     "gecko_id" VARCHAR(64) NOT NULL,
ADD COLUMN     "timestamp" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "serum_id" VARCHAR(64),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(64),
ALTER COLUMN "symbol" SET DATA TYPE VARCHAR(32);

-- CreateTable
CREATE TABLE "Serum" (
    "id" SERIAL NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "market_name" VARCHAR(256) NOT NULL,
    "token_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token.gecko_id_unique" ON "Token"("gecko_id");

-- AddForeignKey
ALTER TABLE "GeckoSocial" ADD FOREIGN KEY ("gecko_id") REFERENCES "Token"("gecko_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeckoFinance" ADD FOREIGN KEY ("gecko_id") REFERENCES "Token"("gecko_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Serum" ADD FOREIGN KEY ("token_id") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
