/*
  Warnings:

  - You are about to drop the column `usuario` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomeDeUsuario]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomeDeUsuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `usuario_usuario_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `usuario`,
    ADD COLUMN `nomeDeUsuario` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuario_nomeDeUsuario_key` ON `usuario`(`nomeDeUsuario`);
