alter table "public"."recipe" alter column "ingredients" drop not null;
alter table "public"."recipe" add column "ingredients" text;
