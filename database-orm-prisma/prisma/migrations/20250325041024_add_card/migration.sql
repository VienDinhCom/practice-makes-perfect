/*
  Warnings:

  - Added the required column `count` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "goal" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Card" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "practicedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "interval" INTEGER NOT NULL DEFAULT 0,
    "repetition" INTEGER NOT NULL DEFAULT 0,
    "efactor" DOUBLE PRECISION NOT NULL DEFAULT 2.5,
    "count" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senseId" UUID NOT NULL,
    "learnerId" UUID NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("learnerId","senseId")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_senseId_fkey" FOREIGN KEY ("senseId") REFERENCES "Sense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
