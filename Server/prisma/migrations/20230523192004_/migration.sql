/*
  Warnings:

  - A unique constraint covering the columns `[usuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Made the column `usuario` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `usuario` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_usuario_key` ON `usuario`(`usuario`);
