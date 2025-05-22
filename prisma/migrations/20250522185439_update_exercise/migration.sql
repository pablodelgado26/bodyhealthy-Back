/*
  Warnings:

  - You are about to drop the column `MuscleGroup` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `muscleGroup` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "MuscleGroup",
ADD COLUMN     "muscleGroup" TEXT NOT NULL;
