/*
  Warnings:

  - You are about to drop the column `assignerId` on the `AssignerToRef` table. All the data in the column will be lost.
  - You are about to drop the column `refId` on the `AssignerToRef` table. All the data in the column will be lost.
  - Added the required column `assignerUserId` to the `AssignerToRef` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refUserId` to the `AssignerToRef` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."RefType" AS ENUM ('Center', 'AR1', 'AR2');

-- DropForeignKey
ALTER TABLE "public"."AssignerToRef" DROP CONSTRAINT "AssignerToRef_assignerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AssignerToRef" DROP CONSTRAINT "AssignerToRef_refId_fkey";

-- AlterTable
ALTER TABLE "public"."AssignerToRef" DROP COLUMN "assignerId",
DROP COLUMN "refId",
ADD COLUMN     "assignerUserId" INTEGER NOT NULL,
ADD COLUMN     "refUserId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Assignment" (
    "assignmentId" SERIAL NOT NULL,
    "assignerUserId" INTEGER NOT NULL,
    "refUserId" INTEGER NOT NULL,
    "gameId" BIGINT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refType" "public"."RefType" NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "isAnswered" BOOLEAN NOT NULL DEFAULT false,
    "responseAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("assignmentId")
);

-- CreateIndex
CREATE INDEX "Assignment_assignerUserId_idx" ON "public"."Assignment"("assignerUserId");

-- CreateIndex
CREATE INDEX "Assignment_refUserId_idx" ON "public"."Assignment"("refUserId");

-- CreateIndex
CREATE INDEX "Assignment_gameId_idx" ON "public"."Assignment"("gameId");

-- AddForeignKey
ALTER TABLE "public"."AssignerToRef" ADD CONSTRAINT "AssignerToRef_assignerUserId_fkey" FOREIGN KEY ("assignerUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AssignerToRef" ADD CONSTRAINT "AssignerToRef_refUserId_fkey" FOREIGN KEY ("refUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_assignerUserId_fkey" FOREIGN KEY ("assignerUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_refUserId_fkey" FOREIGN KEY ("refUserId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Assignment" ADD CONSTRAINT "Assignment_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "public"."Game"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;
