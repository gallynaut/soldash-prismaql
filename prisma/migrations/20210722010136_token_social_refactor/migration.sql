/*
  Warnings:

  - You are about to drop the column `twitter` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "twitter",
DROP COLUMN "website";

-- CreateTable
CREATE TABLE "TokenSocial" (
    "id" SERIAL NOT NULL,
    "website" VARCHAR(256),
    "twitter" VARCHAR(256),
    "logoURI" VARCHAR(256),
    "token_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenSocial.logoURI_unique" ON "TokenSocial"("logoURI");

-- CreateIndex
CREATE UNIQUE INDEX "TokenSocial_token_id_unique" ON "TokenSocial"("token_id");

-- AddForeignKey
ALTER TABLE "TokenSocial" ADD FOREIGN KEY ("token_id") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
