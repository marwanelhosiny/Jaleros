/*
  Warnings:

  - You are about to drop the column `userId` on the `Card` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropIndex
DROP INDEX "Card_userId_idx";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_username_key" ON "Card"("username");

-- CreateIndex
CREATE INDEX "Card_username_idx" ON "Card"("username");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE CASCADE ON UPDATE CASCADE;
