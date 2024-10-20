-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('basic', 'premium', 'professional');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "PlanType" NOT NULL DEFAULT 'basic';

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "plan" "PlanType" NOT NULL DEFAULT 'basic',

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_plan_key" ON "Plan"("plan");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plan_fkey" FOREIGN KEY ("plan") REFERENCES "Plan"("plan") ON DELETE RESTRICT ON UPDATE CASCADE;
