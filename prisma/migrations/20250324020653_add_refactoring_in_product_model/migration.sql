/*
  Warnings:

  - You are about to drop the column `amountRaised` on the `donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "donation" DROP COLUMN "amountRaised";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "video" SET DEFAULT 'none';
