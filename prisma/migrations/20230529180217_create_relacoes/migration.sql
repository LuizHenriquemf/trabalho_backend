/*
  Warnings:

  - Added the required column `usuarioId` to the `Receitas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `receitas` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Receitas` ADD CONSTRAINT `Receitas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex

