-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "like" INTEGER NOT NULL DEFAULT 0,
    "response" INTEGER NOT NULL DEFAULT 0,
    "userName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("userName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_title_fkey" FOREIGN KEY ("title") REFERENCES "posts"("title") ON DELETE CASCADE ON UPDATE CASCADE;
