-- CreateTable
CREATE TABLE "wishlist" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WishlistToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WishlistToProduct_AB_unique" ON "_WishlistToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_WishlistToProduct_B_index" ON "_WishlistToProduct"("B");

-- AddForeignKey
ALTER TABLE "_WishlistToProduct" ADD CONSTRAINT "_WishlistToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WishlistToProduct" ADD CONSTRAINT "_WishlistToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
