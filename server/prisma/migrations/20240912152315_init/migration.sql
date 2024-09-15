/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Social` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Social` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Social" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
