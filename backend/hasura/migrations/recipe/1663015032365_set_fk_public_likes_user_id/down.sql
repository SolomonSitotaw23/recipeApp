alter table "public"."likes" drop constraint "likes_user_id_fkey",
  add constraint "likes_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete restrict;
