alter table "public"."favorites" alter column "id" set default gen_random_uuid();
alter table "public"."favorites" alter column "id" drop not null;
alter table "public"."favorites" add column "id" uuid;
