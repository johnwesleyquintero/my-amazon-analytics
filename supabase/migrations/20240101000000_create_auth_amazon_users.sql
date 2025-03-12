CREATE TABLE "auth"."amazon_users" (
    "instance_id" uuid NOT NULL,
    "id" uuid PRIMARY KEY NOT NULL,
    "aud" varchar(255),
    "role" varchar(255),
    "email" varchar(255) UNIQUE,
    "encrypted_password" varchar(255),
    "email_confirmed_at" timestamptz,
    "is_super_admin" boolean DEFAULT false,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);

ALTER TABLE "auth"."amazon_users" ENABLE ROW LEVEL SECURITY;