-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "symbol" VARCHAR(16) NOT NULL,
    "description" VARCHAR(256) NOT NULL,
    "sol_address" VARCHAR(64) NOT NULL,
    "gecko_id" VARCHAR(64) NOT NULL,
    "website" VARCHAR(256) NOT NULL,
    "twitter" VARCHAR(256) NOT NULL,

    PRIMARY KEY ("id")
);
