-- AlterTable
ALTER TABLE `shift` MODIFY `status` ENUM('NORMAL', 'PENDING', 'DELETED') NOT NULL DEFAULT 'NORMAL';

-- AlterTable
ALTER TABLE `site` ADD COLUMN `status` ENUM('NORMAL', 'DELETED') NOT NULL DEFAULT 'NORMAL';
