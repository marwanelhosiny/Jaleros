-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('basic', 'premium', 'professional');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "sponsored" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "CardType" NOT NULL DEFAULT 'basic';
