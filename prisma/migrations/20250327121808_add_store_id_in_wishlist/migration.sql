-- AlterTable
ALTER TABLE "donation" ADD COLUMN     "store_id" TEXT;

-- AddForeignKey
ALTER TABLE "donation" ADD CONSTRAINT "donation_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
