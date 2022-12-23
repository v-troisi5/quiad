/*
  Warnings:

  - You are about to drop the `Capability` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Operation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Capability` DROP FOREIGN KEY `Capability_operationId_fkey`;

-- DropForeignKey
ALTER TABLE `Capability` DROP FOREIGN KEY `Capability_roleId_fkey`;

-- DropTable
DROP TABLE `Capability`;

-- CreateTable
CREATE TABLE `_OperationToRole` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OperationToRole_AB_unique`(`A`, `B`),
    INDEX `_OperationToRole_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Operation_name_key` ON `Operation`(`name`);

-- AddForeignKey
ALTER TABLE `_OperationToRole` ADD CONSTRAINT `_OperationToRole_A_fkey` FOREIGN KEY (`A`) REFERENCES `Operation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OperationToRole` ADD CONSTRAINT `_OperationToRole_B_fkey` FOREIGN KEY (`B`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
