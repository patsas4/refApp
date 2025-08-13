/*
  Warnings:

  - You are about to drop the column `field` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Game" DROP COLUMN "field",
ADD COLUMN     "ar1UserId" INTEGER,
ADD COLUMN     "ar2UserId" INTEGER,
ADD COLUMN     "centerRefUserId" INTEGER,
ADD COLUMN     "fieldId" INTEGER;

-- CreateIndex
CREATE INDEX "Field_createdByUserId_idx" ON "public"."Field"("createdByUserId");

-- CreateIndex
CREATE INDEX "Field_locationId_idx" ON "public"."Field"("locationId");

-- CreateIndex
CREATE INDEX "Game_createdByUserId_idx" ON "public"."Game"("createdByUserId");

-- CreateIndex
CREATE INDEX "Game_homeTeamId_idx" ON "public"."Game"("homeTeamId");

-- CreateIndex
CREATE INDEX "Game_awayTeamId_idx" ON "public"."Game"("awayTeamId");

-- CreateIndex
CREATE INDEX "Game_fieldId_idx" ON "public"."Game"("fieldId");

-- CreateIndex
CREATE INDEX "Game_centerRefUserId_idx" ON "public"."Game"("centerRefUserId");

-- CreateIndex
CREATE INDEX "Game_ar1UserId_idx" ON "public"."Game"("ar1UserId");

-- CreateIndex
CREATE INDEX "Game_ar2UserId_idx" ON "public"."Game"("ar2UserId");

-- CreateIndex
CREATE INDEX "League_createdByUserId_idx" ON "public"."League"("createdByUserId");

-- CreateIndex
CREATE INDEX "Location_createdByUserId_idx" ON "public"."Location"("createdByUserId");

-- CreateIndex
CREATE INDEX "Team_createdByUserId_idx" ON "public"."Team"("createdByUserId");

-- CreateIndex
CREATE INDEX "TeamInLeague_createdByUserId_idx" ON "public"."TeamInLeague"("createdByUserId");

-- CreateIndex
CREATE INDEX "TeamInLeague_leagueId_idx" ON "public"."TeamInLeague"("leagueId");

-- CreateIndex
CREATE INDEX "TeamInLeague_teamId_idx" ON "public"."TeamInLeague"("teamId");

-- CreateIndex
CREATE INDEX "User_firstName_idx" ON "public"."User"("firstName");

-- CreateIndex
CREATE INDEX "User_lastName_idx" ON "public"."User"("lastName");

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "public"."Field"("fieldId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_centerRefUserId_fkey" FOREIGN KEY ("centerRefUserId") REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_ar1UserId_fkey" FOREIGN KEY ("ar1UserId") REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Game" ADD CONSTRAINT "Game_ar2UserId_fkey" FOREIGN KEY ("ar2UserId") REFERENCES "public"."User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
