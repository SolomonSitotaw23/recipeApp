alter table "public"."recipe" alter column "steps" drop not null;
alter table "public"."recipe" add column "steps" text;
