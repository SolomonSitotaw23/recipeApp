alter table "public"."ingredients" drop constraint "ingredients_recipe_id_fkey",
  add constraint "ingredients_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update restrict on delete restrict;
