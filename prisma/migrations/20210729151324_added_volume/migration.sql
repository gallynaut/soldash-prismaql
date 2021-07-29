-- AlterTable
ALTER TABLE "GeckoFinance" ADD COLUMN     "volume" BIGINT;

-- AlterTable
ALTER TABLE "Serum" ALTER COLUMN "timestamp" SET DATA TYPE BIGINT;
