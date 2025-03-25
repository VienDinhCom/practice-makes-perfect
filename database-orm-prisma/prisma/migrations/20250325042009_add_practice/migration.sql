/*
  Warnings:

  - You are about to drop the column `count` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Profile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnrolledList" DROP CONSTRAINT "EnrolledList_leanerId_fkey";

-- DropForeignKey
ALTER TABLE "EnrolledList" DROP CONSTRAINT "EnrolledList_listId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_senseId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sense" DROP CONSTRAINT "Sense_listId_fkey";

-- DropForeignKey
ALTER TABLE "Sense" DROP CONSTRAINT "Sense_wordId_fkey";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "count",
DROP COLUMN "goal";

-- CreateTable
CREATE TABLE "Practice" (
    "id" UUID NOT NULL,
    "goal" INTEGER NOT NULL,
    "done" INTEGER NOT NULL,
    "learnerId" UUID NOT NULL,

    CONSTRAINT "Practice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Practice_learnerId_key" ON "Practice"("learnerId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Practice" ADD CONSTRAINT "Practice_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sense" ADD CONSTRAINT "Sense_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sense" ADD CONSTRAINT "Sense_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledList" ADD CONSTRAINT "EnrolledList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledList" ADD CONSTRAINT "EnrolledList_leanerId_fkey" FOREIGN KEY ("leanerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
