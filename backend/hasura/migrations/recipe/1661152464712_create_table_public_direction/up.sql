CREATE TABLE "public"."direction" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "foodId" uuid NOT NULL, "steps" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("foodId") REFERENCES "public"."food"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
