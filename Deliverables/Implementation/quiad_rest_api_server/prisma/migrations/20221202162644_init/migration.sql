-- DropIndex
DROP INDEX `Capability_roleId_fkey` ON `capability`;

-- DropIndex
DROP INDEX `Node_fatherId_fkey` ON `node`;

-- DropIndex
DROP INDEX `Node_motherId_fkey` ON `node`;

-- DropIndex
DROP INDEX `User_accountId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_nodeId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `node` MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `birthdate` DATETIME(3) NULL,
    MODIFY `deathdate` DATETIME(3) NULL,
    MODIFY `birthplace` VARCHAR(191) NULL,
    MODIFY `deathplace` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Capability` ADD CONSTRAINT `Capability_operationId_fkey` FOREIGN KEY (`operationId`) REFERENCES `Operation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Capability` ADD CONSTRAINT `Capability_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_nodeId_fkey` FOREIGN KEY (`nodeId`) REFERENCES `Node`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Node` ADD CONSTRAINT `Node_motherId_fkey` FOREIGN KEY (`motherId`) REFERENCES `Node`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Node` ADD CONSTRAINT `Node_fatherId_fkey` FOREIGN KEY (`fatherId`) REFERENCES `Node`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curator` ADD CONSTRAINT `Curator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Supervisor` ADD CONSTRAINT `Supervisor_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `Account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
