CREATE TABLE "public"."comment" ("author" text NOT NULL, "content" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "recipe_id" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("id") REFERENCES "public"."recipe"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
