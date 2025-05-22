-- CreateTable
CREATE TABLE "trainings" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "MuscleGroup" TEXT NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "series" INTEGER NOT NULL,
    "trainingTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trainings_title_key" ON "trainings"("title");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_title_key" ON "exercises"("title");

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_trainingTitle_fkey" FOREIGN KEY ("trainingTitle") REFERENCES "trainings"("title") ON DELETE CASCADE ON UPDATE CASCADE;
