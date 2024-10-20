/*
  Warnings:

  - The `plan` column on the `Plan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_plan_fkey";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "plan",
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'basic';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "plan",
ADD COLUMN     "plan" TEXT;

-- DropEnum
DROP TYPE "PlanType";

-- CreateIndex
CREATE UNIQUE INDEX "Plan_plan_key" ON "Plan"("plan");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plan_fkey" FOREIGN KEY ("plan") REFERENCES "Plan"("plan") ON DELETE SET NULL ON UPDATE CASCADE;
