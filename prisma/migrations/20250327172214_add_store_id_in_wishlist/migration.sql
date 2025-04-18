-- AlterTable
ALTER TABLE "product" ADD COLUMN     "donationAmounts" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ADD COLUMN     "donationDescriptions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "rewards" ADD COLUMN     "store_id" TEXT;

-- AddForeignKey
ALTER TABLE "rewards" ADD CONSTRAINT "rewards_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
