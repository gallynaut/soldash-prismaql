/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Token.name_unique" ON "Token"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token.symbol_unique" ON "Token"("symbol");
