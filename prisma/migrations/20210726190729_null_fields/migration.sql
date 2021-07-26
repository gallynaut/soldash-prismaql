-- AlterTable
ALTER TABLE "GeckoFinance" ALTER COLUMN "market_cap_rank" DROP NOT NULL,
ALTER COLUMN "circulating_supply" DROP NOT NULL,
ALTER COLUMN "current_price" DROP NOT NULL,
ALTER COLUMN "fully_diluted_valuation" DROP NOT NULL,
ALTER COLUMN "high_24h_price" DROP NOT NULL,
ALTER COLUMN "low_24h_price" DROP NOT NULL,
ALTER COLUMN "max_supply" DROP NOT NULL,
ALTER COLUMN "price_change_24h" DROP NOT NULL,
ALTER COLUMN "price_change_percentage_24h" DROP NOT NULL,
ALTER COLUMN "total_supply" DROP NOT NULL;
