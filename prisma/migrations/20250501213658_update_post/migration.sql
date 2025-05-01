-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userName_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("userName") ON DELETE CASCADE ON UPDATE CASCADE;
