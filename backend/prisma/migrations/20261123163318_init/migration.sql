-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('admin', 'operator');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('active', 'inactive', 'blocked');

-- CreateEnum
CREATE TYPE "StatusEquipment" AS ENUM ('active', 'in_maintenance', 'inactive');

-- CreateEnum
CREATE TYPE "SpecialtyTechnician" AS ENUM ('electrical', 'mechanical', 'hydraulic', 'other');

-- CreateEnum
CREATE TYPE "StatusTechnician" AS ENUM ('active', 'in_service', 'inactive');

-- CreateEnum
CREATE TYPE "PriorityServiceOrder" AS ENUM ('critic', 'high', 'medium', 'low');

-- CreateEnum
CREATE TYPE "StatusServiceOrder" AS ENUM ('opened', 'in_progress', 'waiting', 'finished', 'canceled');

-- CreateEnum
CREATE TYPE "ActionLogTable" AS ENUM ('insert', 'update', 'delete');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "RoleUser" NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'active',
    "lastAccess" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
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

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "patrimony" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "acquisitionDate" TIMESTAMP(3),
    "status" "StatusEquipment" NOT NULL DEFAULT 'active',
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technician" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specialty" "SpecialtyTechnician" NOT NULL,
    "status" "StatusTechnician" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceOrder" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "technicianId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PriorityServiceOrder" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusServiceOrder" NOT NULL DEFAULT 'opened',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogCategory" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogLocal" (
    "id" SERIAL NOT NULL,
    "localId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogLocal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogEquipment" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogTechnician" (
    "id" SERIAL NOT NULL,
    "technicianId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogTechnician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogServiceOrder" (
    "id" SERIAL NOT NULL,
    "serviceOrderId" INTEGER NOT NULL,
    "performedById" INTEGER,
    "action" "ActionLogTable" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogServiceOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Local_name_key" ON "Local"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_patrimony_key" ON "Equipment"("patrimony");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_cellphone_key" ON "Technician"("cellphone");

-- CreateIndex
CREATE UNIQUE INDEX "Technician_email_key" ON "Technician"("email");

-- CreateIndex
CREATE INDEX "LogUser_userId_idx" ON "LogUser"("userId");

-- CreateIndex
CREATE INDEX "LogCategory_categoryId_idx" ON "LogCategory"("categoryId");

-- CreateIndex
CREATE INDEX "LogLocal_localId_idx" ON "LogLocal"("localId");

-- CreateIndex
CREATE INDEX "LogEquipment_equipmentId_idx" ON "LogEquipment"("equipmentId");

-- CreateIndex
CREATE INDEX "LogTechnician_technicianId_idx" ON "LogTechnician"("technicianId");

-- CreateIndex
CREATE INDEX "LogServiceOrder_serviceOrderId_idx" ON "LogServiceOrder"("serviceOrderId");

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceOrder" ADD CONSTRAINT "ServiceOrder_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
