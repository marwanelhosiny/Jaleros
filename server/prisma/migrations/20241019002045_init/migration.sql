-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_plan_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "plan" DROP NOT NULL,
ALTER COLUMN "plan" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plan_fkey" FOREIGN KEY ("plan") REFERENCES "Plan"("plan") ON DELETE SET NULL ON UPDATE CASCADE;