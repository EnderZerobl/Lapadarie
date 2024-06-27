-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "paes" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nome_key" ON "User"("nome");
