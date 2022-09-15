alter table "public"."ingredients" drop constraint "ingredients_recipe_id_fkey",
  add constraint "ingredients_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update cascade on delete cascade;
