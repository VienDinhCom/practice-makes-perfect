-- CreateTable
CREATE TABLE "EnrolledList" (
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listId" UUID NOT NULL,
    "leanerId" UUID NOT NULL,

    CONSTRAINT "EnrolledList_pkey" PRIMARY KEY ("leanerId","listId")
);

-- AddForeignKey
ALTER TABLE "EnrolledList" ADD CONSTRAINT "EnrolledList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnrolledList" ADD CONSTRAINT "EnrolledList_leanerId_fkey" FOREIGN KEY ("leanerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
