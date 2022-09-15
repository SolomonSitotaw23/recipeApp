alter table "public"."favorites" drop constraint "favourites_recipe_id_fkey",
  add constraint "favorites_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update cascade on delete cascade;
