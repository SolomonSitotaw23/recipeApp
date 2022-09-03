CREATE TABLE "public"."images" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "recipe_id" uuid NOT NULL, "thumbnail_index" integer NOT NULL DEFAULT 0, "urls" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
