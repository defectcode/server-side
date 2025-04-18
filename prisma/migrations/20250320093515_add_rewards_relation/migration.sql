/*
  Warnings:

  - You are about to drop the column `size_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_size_id_fkey";

-- DropForeignKey
ALTER TABLE "size" DROP CONSTRAINT "size_store_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "size_id",
ADD COLUMN     "video" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "name" SET DEFAULT 'Not specified';

-- DropTable
DROP TABLE "size";

-- CreateTable
CREATE TABLE "rewards" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "rewards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
