alter table "public"."comment" drop constraint "comment_recipe_id_fkey",
  add constraint "comment_recipe_id_fkey"
  foreign key ("recipe_id")
  references "public"."recipe"
  ("id") on update cascade on delete cascade;
