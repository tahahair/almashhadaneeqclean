/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Uncompleted` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Uncompleted` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Uncompleted` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Uncompleted` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Uncompleted" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Uncompleted_name_key" ON "Uncompleted"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Uncompleted_phone_key" ON "Uncompleted"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Uncompleted_email_key" ON "Uncompleted"("email");
