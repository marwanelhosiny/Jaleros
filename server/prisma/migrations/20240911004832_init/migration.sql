/*
  Warnings:

  - You are about to drop the column `address` on the `Card` table. All the data in the column will be lost.
  - Added the required column `city` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
