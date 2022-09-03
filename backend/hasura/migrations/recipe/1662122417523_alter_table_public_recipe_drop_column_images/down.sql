alter table "public"."recipe" alter column "images" drop not null;
alter table "public"."recipe" add column "images" uuid;
