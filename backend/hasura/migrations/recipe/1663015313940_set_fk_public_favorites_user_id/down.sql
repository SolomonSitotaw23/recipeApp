alter table "public"."favorites" drop constraint "favorites_user_id_fkey",
  add constraint "favourites_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete restrict;
