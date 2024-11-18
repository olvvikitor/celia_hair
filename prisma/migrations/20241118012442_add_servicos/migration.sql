/*
  Warnings:

  - Added the required column `fotoId` to the `Servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Servico" ADD COLUMN     "fotoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Fotos" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "servicoId" INTEGER NOT NULL,

    CONSTRAINT "Fotos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fotos_id_key" ON "Fotos"("id");

-- AddForeignKey
ALTER TABLE "Fotos" ADD CONSTRAINT "Fotos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
