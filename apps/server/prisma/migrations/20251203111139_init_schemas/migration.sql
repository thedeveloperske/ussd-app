/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sharing" AS ENUM ('PF', 'PP');

-- CreateEnum
CREATE TYPE "Relationship" AS ENUM ('SP', 'CH');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "MedicalProduct" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MedicalProduct_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ProductLimit" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "rate" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "product" INTEGER,

    CONSTRAINT "ProductLimit_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "ProductRate" (
    "code" SERIAL NOT NULL,
    "product" INTEGER NOT NULL,
    "familySize" INTEGER NOT NULL,
    "sharing" "Sharing" NOT NULL,

    CONSTRAINT "ProductRate_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Customer" (
    "code" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "famSize" INTEGER NOT NULL,
    "premium" DOUBLE PRECISION NOT NULL,
    "productCode" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "customer_dependants" (
    "code" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "relationship" "Relationship" NOT NULL,
    "customerCode" INTEGER,

    CONSTRAINT "customer_dependants_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalProduct_name_key" ON "MedicalProduct"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLimit_product_name_key" ON "ProductLimit"("product", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRate_product_familySize_sharing_key" ON "ProductRate"("product", "familySize", "sharing");

-- CreateIndex
CREATE UNIQUE INDEX "customer_dependants_customerCode_full_name_dob_key" ON "customer_dependants"("customerCode", "full_name", "dob");

-- AddForeignKey
ALTER TABLE "ProductLimit" ADD CONSTRAINT "ProductLimit_product_fkey" FOREIGN KEY ("product") REFERENCES "MedicalProduct"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRate" ADD CONSTRAINT "ProductRate_product_fkey" FOREIGN KEY ("product") REFERENCES "MedicalProduct"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "MedicalProduct"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_dependants" ADD CONSTRAINT "customer_dependants_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "Customer"("code") ON DELETE SET NULL ON UPDATE CASCADE;
