-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cellPhone" BIGINT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "descriptionObjective" TEXT,
    "restriction" TEXT,
    "conditioning" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cellPhone_key" ON "users"("cellPhone");
