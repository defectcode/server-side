-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "store_id" TEXT;

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
