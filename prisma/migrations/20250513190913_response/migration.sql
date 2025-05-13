/*
  Warnings:

  - You are about to drop the column `response` on the `comments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "response",
ADD COLUMN     "commentId" SERIAL NOT NULL;

-- CreateTable
CREATE TABLE "responses" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "commentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_id_fkey" FOREIGN KEY ("id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
