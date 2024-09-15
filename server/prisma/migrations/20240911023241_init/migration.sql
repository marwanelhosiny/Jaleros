-- DropForeignKey
ALTER TABLE "Social" DROP CONSTRAINT "Social_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
