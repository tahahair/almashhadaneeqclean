-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('OFFER_4', 'OFFER_8', 'OFFER_12', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "TimePeriod" AS ENUM ('MORNING', 'EVENING');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "locationUrl" TEXT,
    "serviceType" "ServiceType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timePeriod" "TimePeriod" NOT NULL,
    "extraHours" INTEGER NOT NULL DEFAULT 0,
    "workerCount" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
