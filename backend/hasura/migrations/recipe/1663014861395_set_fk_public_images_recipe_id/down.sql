alter table "public"."images" drop constraint "images_recipe_id_fkey",
  add constraint "images_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update restrict on delete restrict;
