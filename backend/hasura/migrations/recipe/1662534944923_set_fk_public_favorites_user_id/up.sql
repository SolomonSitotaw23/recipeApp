alter table "public"."favorites"
  add constraint "favorites_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("id") on update restrict on delete restrict;
