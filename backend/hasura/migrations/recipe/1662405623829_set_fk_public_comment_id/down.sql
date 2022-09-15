alter table "public"."comment" drop constraint "comment_id_fkey",
  add constraint "comment_id_fkey"
  foreign key ("id")
  references "public"."recipe"
  ("id") on update restrict on delete restrict;
