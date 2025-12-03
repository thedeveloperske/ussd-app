/*
  Warnings:

  - You are about to drop the column `product` on the `ProductLimit` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `ProductRate` table. All the data in the column will be lost.
  - You are about to drop the `customer_dependants` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[medicalProductCode,name]` on the table `ProductLimit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productCode,familySize,sharing]` on the table `ProductRate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productCode` to the `ProductRate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductLimit" DROP CONSTRAINT "ProductLimit_product_fkey";

-- DropForeignKey
ALTER TABLE "ProductRate" DROP CONSTRAINT "ProductRate_product_fkey";

-- DropForeignKey
ALTER TABLE "customer_dependants" DROP CONSTRAINT "customer_dependants_customerCode_fkey";

-- DropIndex
DROP INDEX "ProductLimit_product_name_key";

-- DropIndex
DROP INDEX "ProductRate_product_familySize_sharing_key";

-- AlterTable
ALTER TABLE "ProductLimit" DROP COLUMN "product",
ADD COLUMN     "medicalProductCode" INTEGER;

-- AlterTable
ALTER TABLE "ProductRate" DROP COLUMN "product",
ADD COLUMN     "productCode" INTEGER NOT NULL;

-- DropTable
DROP TABLE "customer_dependants";

-- CreateTable
CREATE TABLE "CustomerDependant" (
    "code" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "customerCode" INTEGER,

    CONSTRAINT "CustomerDependant_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDependant_customerCode_fullName_dob_key" ON "CustomerDependant"("customerCode", "fullName", "dob");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLimit_medicalProductCode_name_key" ON "ProductLimit"("medicalProductCode", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRate_productCode_familySize_sharing_key" ON "ProductRate"("productCode", "familySize", "sharing");

-- AddForeignKey
ALTER TABLE "ProductLimit" ADD CONSTRAINT "ProductLimit_medicalProductCode_fkey" FOREIGN KEY ("medicalProductCode") REFERENCES "MedicalProduct"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRate" ADD CONSTRAINT "ProductRate_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "MedicalProduct"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDependant" ADD CONSTRAINT "CustomerDependant_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "Customer"("code") ON DELETE SET NULL ON UPDATE CASCADE;
