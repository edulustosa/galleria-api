/*
  Warnings:

  - The values [APROVED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'APPROVED', 'REJECT');
ALTER TABLE "images" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "images" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "images" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
