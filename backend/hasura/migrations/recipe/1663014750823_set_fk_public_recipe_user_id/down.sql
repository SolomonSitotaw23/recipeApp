alter table "public"."recipe" drop constraint "recipe_user_id_fkey",
  add constraint "recipe_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete restrict;
