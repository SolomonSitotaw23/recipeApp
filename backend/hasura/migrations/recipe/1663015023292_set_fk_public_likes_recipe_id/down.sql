alter table "public"."likes" drop constraint "likes_recipe_id_fkey",
  add constraint "likes_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update restrict on delete restrict;
