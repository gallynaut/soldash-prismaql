/*
  Warnings:

  - A unique constraint covering the columns `[sol_address]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token.sol_address_unique" ON "Token"("sol_address");
