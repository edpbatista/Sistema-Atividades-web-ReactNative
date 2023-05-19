/*
  Warnings:

  - You are about to drop the column `login` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `login`,
    ADD COLUMN `usuario` VARCHAR(191) NOT NULL;
