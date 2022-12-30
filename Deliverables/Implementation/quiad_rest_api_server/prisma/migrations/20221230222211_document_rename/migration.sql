/*
  Warnings:

  - You are about to drop the column `nome` on the `Document` table. All the data in the column will be lost.
  - Added the required column `name` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Document` DROP COLUMN `nome`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
