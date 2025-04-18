/*
  Warnings:

  - You are about to drop the `transaction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_order_id_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "paymentIntentId" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" TEXT;

-- DropTable
DROP TABLE "transaction";

-- CreateIndex
CREATE UNIQUE INDEX "order_paymentIntentId_key" ON "order"("paymentIntentId");
