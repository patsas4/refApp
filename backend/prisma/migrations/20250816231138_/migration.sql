/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Assigner', 'Ref');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "roles" "public"."Role"[];

-- CreateTable
CREATE TABLE "public"."AssignerToRef" (
    "assignerToRefId" SERIAL NOT NULL,
    "assignerId" INTEGER NOT NULL,
    "refId" INTEGER NOT NULL,

    CONSTRAINT "AssignerToRef_pkey" PRIMARY KEY ("assignerToRefId")
);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."AssignerToRef" ADD CONSTRAINT "AssignerToRef_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignerToRef" ADD CONSTRAINT "AssignerToRef_refId_fkey" FOREIGN KEY ("refId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
