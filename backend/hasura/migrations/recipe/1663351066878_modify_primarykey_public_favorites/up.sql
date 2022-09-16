BEGIN TRANSACTION;
ALTER TABLE "public"."favorites" DROP CONSTRAINT "favourites_pkey";

ALTER TABLE "public"."favorites"
    ADD CONSTRAINT "favourites_pkey" PRIMARY KEY ("user_id", "recipe_id");
COMMIT TRANSACTION;
