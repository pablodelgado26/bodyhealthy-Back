/*
  Warnings:

  - Added the required column `userName` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trainings" ADD COLUMN     "userName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("userName") ON DELETE CASCADE ON UPDATE CASCADE;
