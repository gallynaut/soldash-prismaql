-- AlterTable
ALTER TABLE "GeckoSocial" ALTER COLUMN "public_interest_score" DROP NOT NULL,
ALTER COLUMN "liquidity_score" DROP NOT NULL,
ALTER COLUMN "alexa_rank" DROP NOT NULL,
ALTER COLUMN "sentiment_votes_down_percentage" DROP NOT NULL,
ALTER COLUMN "sentiment_votes_up_percentage" DROP NOT NULL;
