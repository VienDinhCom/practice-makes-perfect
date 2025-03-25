-- CreateEnum
CREATE TYPE "Pos" AS ENUM ('noun', 'verb', 'adverb', 'adjective');

-- CreateTable
CREATE TABLE "Word" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lemma" TEXT NOT NULL,
    "pos" "Pos" NOT NULL,
    "ipa" TEXT,
    "sound" TEXT,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_lemma_pos_key" ON "Word"("lemma", "pos");
