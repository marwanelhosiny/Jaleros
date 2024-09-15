/*
  Warnings:

  - You are about to drop the column `links` on the `Card` table. All the data in the column will be lost.
  - Added the required column `email` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaFolder` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "links",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "mediaFolder" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" SERIAL NOT NULL,
    "cardId" INTEGER NOT NULL,
    "facebook" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "youtube" TEXT NOT NULL,
    "X" TEXT NOT NULL,
    "tikTok" TEXT NOT NULL,
    "snapchat" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "telegram" TEXT NOT NULL,
    "reddit" TEXT NOT NULL,
    "pinterest" TEXT NOT NULL,
    "custom1" TEXT NOT NULL,
    "custom2" TEXT NOT NULL,
    "custom3" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Social_cardId_key" ON "Social"("cardId");

-- CreateIndex
CREATE INDEX "Social_cardId_idx" ON "Social"("cardId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
