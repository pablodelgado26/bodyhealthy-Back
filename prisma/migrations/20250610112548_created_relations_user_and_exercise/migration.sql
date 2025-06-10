/*
  Warnings:

  - Added the required column `userName` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "userName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("userName") ON DELETE CASCADE ON UPDATE CASCADE;
