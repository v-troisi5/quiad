/*
  Warnings:

  - Added the required column `nome` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originDate` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originPlace` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retrievalDate` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `retrievalPlace` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Document` ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `originDate` DATETIME(3) NOT NULL,
    ADD COLUMN `originPlace` VARCHAR(191) NOT NULL,
    ADD COLUMN `retrievalDate` DATETIME(3) NOT NULL,
    ADD COLUMN `retrievalPlace` VARCHAR(191) NOT NULL;
