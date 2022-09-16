alter table "public"."rating"
    add constraint "rating_pkey"
    primary key ("user_id", "recipe_id");
