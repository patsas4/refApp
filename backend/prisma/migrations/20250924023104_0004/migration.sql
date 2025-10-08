/*
  Warnings:

  - The `date` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `time` column on the `Game` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "date",
ADD COLUMN     "date" VARCHAR(10),
DROP COLUMN "time",
ADD COLUMN     "time" VARCHAR(5);
