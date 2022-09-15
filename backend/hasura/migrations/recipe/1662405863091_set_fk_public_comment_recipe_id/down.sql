alter table "public"."comment" drop constraint "comment_recipe_id_fkey",
  add constraint "comment_id_fkey"
  foreign key ("id")
  references "public"."recipe"
  ("id") on update no action on delete no action;
