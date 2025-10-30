/*
  Warnings:

  - You are about to drop the column `usedId` on the `Workflow` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Workflow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Workflow" DROP CONSTRAINT "Workflow_usedId_fkey";

-- AlterTable
ALTER TABLE "Workflow" DROP COLUMN "usedId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
