/*
  Warnings:

  - You are about to drop the column `commentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `responses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_id_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "commentId";

-- DropTable
DROP TABLE "responses";
