/*
  Warnings:

  - You are about to drop the `Fotos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Fotos" DROP CONSTRAINT "Fotos_servicoId_fkey";

-- DropTable
DROP TABLE "Fotos";
