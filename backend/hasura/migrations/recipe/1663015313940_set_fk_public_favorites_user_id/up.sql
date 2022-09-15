alter table "public"."favorites" drop constraint "favourites_user_id_fkey",
  add constraint "favorites_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update cascade on delete cascade;
