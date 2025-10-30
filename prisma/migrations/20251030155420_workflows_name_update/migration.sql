/*
  Warnings:

  - You are about to drop the `Workflows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Workflows" DROP CONSTRAINT "Workflows_usedId_fkey";

-- DropTable
DROP TABLE "public"."Workflows";

-- CreateTable
CREATE TABLE "Workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usedId" TEXT NOT NULL,

    CONSTRAINT "Workflow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workflow" ADD CONSTRAINT "Workflow_usedId_fkey" FOREIGN KEY ("usedId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
