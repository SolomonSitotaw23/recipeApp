alter table "public"."images"
  add constraint "images_foodId_fkey"
  foreign key ("foodId")
  references "public"."food"
  ("id") on update restrict on delete restrict;
