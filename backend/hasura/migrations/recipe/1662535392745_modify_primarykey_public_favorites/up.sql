BEGIN TRANSACTION;
ALTER TABLE "public"."favorites" DROP CONSTRAINT "favorites_pkey";

ALTER TABLE "public"."favorites"
    ADD CONSTRAINT "favorites_pkey" PRIMARY KEY ("user_id");
COMMIT TRANSACTION;
