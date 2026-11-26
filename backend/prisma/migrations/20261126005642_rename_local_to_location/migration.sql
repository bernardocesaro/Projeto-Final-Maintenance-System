/*
  Warnings:

  - You are about to drop the column `localId` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the `Local` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LogLocal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `locationId` to the `Equipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_localId_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "localId",
ADD COLUMN     "locationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Local";

-- DropTable
DROP TABLE "LogLocal";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT,
    "state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogLocation" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE INDEX "LogLocation_locationId_idx" ON "LogLocation"("locationId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
