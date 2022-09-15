alter table "public"."likes" alter column "is_liked" set default false;
alter table "public"."likes" alter column "is_liked" drop not null;
alter table "public"."likes" add column "is_liked" bool;
