-- DropForeignKey
ALTER TABLE "public"."bugs" DROP CONSTRAINT "bugs_reporterId_fkey";

-- AddForeignKey
ALTER TABLE "public"."bugs" ADD CONSTRAINT "bugs_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
