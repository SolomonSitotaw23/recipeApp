alter table "public"."favorites" drop constraint "favorites_pkey";
alter table "public"."favorites"
    add constraint "favourites_pkey"
    primary key ("recipe_id", "user_id");
