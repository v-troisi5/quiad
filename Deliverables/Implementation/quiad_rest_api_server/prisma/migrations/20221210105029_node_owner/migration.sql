-- DropForeignKey
ALTER TABLE `Node` DROP FOREIGN KEY `Node_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Node` MODIFY `ownerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Node` ADD CONSTRAINT `Node_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
