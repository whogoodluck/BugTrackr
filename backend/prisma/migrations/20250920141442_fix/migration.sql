/*
  Warnings:

  - The primary key for the `bugs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."bugs" DROP CONSTRAINT "bugs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "bugs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "bugs_id_seq";
