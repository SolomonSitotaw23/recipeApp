alter table "public"."favorites" drop constraint "favorites_recipe_id_fkey",
  add constraint "favourites_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update restrict on delete restrict;
