alter table "public"."favorites" drop constraint "favorites_pkey";
alter table "public"."favorites"
    add constraint "favorites_pkey"
    primary key ("id");
