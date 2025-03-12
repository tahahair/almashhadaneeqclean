-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "email" TEXT;

-- CreateTable
CREATE TABLE "Uncompleated" (
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

    CONSTRAINT "Uncompleated_pkey" PRIMARY KEY ("id")
);
