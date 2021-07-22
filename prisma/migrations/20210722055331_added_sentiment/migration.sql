/*
  Warnings:

  - Added the required column `sentiment_votes_down_percentage` to the `GeckoSocial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sentiment_votes_up_percentage` to the `GeckoSocial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GeckoSocial" ADD COLUMN     "sentiment_votes_down_percentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sentiment_votes_up_percentage" DOUBLE PRECISION NOT NULL;
