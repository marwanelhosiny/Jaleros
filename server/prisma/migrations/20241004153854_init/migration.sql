-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_category_key" ON "Category"("category");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("category") ON DELETE SET NULL ON UPDATE CASCADE;
