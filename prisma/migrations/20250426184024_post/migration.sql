-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagePost" TEXT,
    "like" INTEGER NOT NULL DEFAULT 0,
    "comment" INTEGER NOT NULL DEFAULT 0,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_title_key" ON "posts"("title");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("userName") ON DELETE RESTRICT ON UPDATE CASCADE;
