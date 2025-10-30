/*
  Warnings:

  - Added the required column `updatedAt` to the `Workflows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usedId` to the `Workflows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workflows" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Workflows" ADD CONSTRAINT "Workflows_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
