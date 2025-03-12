/*
  Warnings:

  - You are about to drop the `Uncompleated` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Uncompleated";

-- CreateTable
CREATE TABLE "Uncompleted" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "locationUrl" TEXT,
    "serviceType" "ServiceType" NOT NULL,
    "extraHours" INTEGER NOT NULL DEFAULT 0,
    "workerCount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Uncompleted_pkey" PRIMARY KEY ("id")
);
