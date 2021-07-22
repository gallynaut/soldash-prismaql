-- CreateTable
CREATE TABLE "GeckoSocial" (
    "id" SERIAL NOT NULL,
    "gecko_rank" INTEGER NOT NULL,
    "gecko_score" DOUBLE PRECISION NOT NULL,
    "public_interest_score" DOUBLE PRECISION NOT NULL,
    "liquidity_score" DOUBLE PRECISION NOT NULL,
    "token_id" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeckoFinance" (
    "id" SERIAL NOT NULL,
    "market_cap_usd" INTEGER NOT NULL,
    "market_cap_btc" INTEGER NOT NULL,
    "market_cap_rank" INTEGER NOT NULL,
    "token_id" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeckoSocial" ADD FOREIGN KEY ("token_id") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeckoFinance" ADD FOREIGN KEY ("token_id") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;
