alter table "public"."direction"
  add constraint "direction_userId_fkey"
  foreign key ("userId")
  references "public"."user"
  ("id") on update restrict on delete restrict;
