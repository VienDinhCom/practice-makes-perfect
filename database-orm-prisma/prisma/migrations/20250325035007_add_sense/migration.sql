-- CreateTable
CREATE TABLE "Sense" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "definition" TEXT NOT NULL,
    "wordId" UUID NOT NULL,

    CONSTRAINT "Sense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sense" ADD CONSTRAINT "Sense_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
