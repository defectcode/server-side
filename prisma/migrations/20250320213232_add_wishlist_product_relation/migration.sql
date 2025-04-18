/*
  Warnings:

  - You are about to drop the `_WishlistToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `product_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_WishlistToProduct" DROP CONSTRAINT "_WishlistToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_WishlistToProduct" DROP CONSTRAINT "_WishlistToProduct_B_fkey";

-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "product_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_WishlistToProduct";

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
