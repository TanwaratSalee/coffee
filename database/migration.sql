CREATE TABLE "public"."users" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "Email" text,
    "Password" text,
    "role" text,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."order" (
    "id" SERIAL PRIMARY KEY,
    "user_id"int references "users" ON DELETE CASCADE,,
    "order_status" TEXT,
    "remark"TEXT,
    "price_all" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."group_menu" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "sort" INT,
    "is_public" BOOLEAN,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."menu" (
    "id" SERIAL PRIMARY KEY,
    "is_public" BOOLEAN,
    "picture" 
    "name" text,
    "detail" TEXT,
    "sort" INT,
    "price" INT,
    "user_id" INT references "users" ON DELETE CASCADE,,
    "group_id" INT references "group_menu" ON DELETE CASCADE,, 
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."order_list" (
    "id" SERIAL PRIMARY KEY,
    "menu_id" int references "menu" ON DELETE CASCADE,,
    "price_log" INT,
    "price_with_option" INT,
    "qty" INT,
    "order_id" INT references "order",
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."group_add_on" (
    "id" SERIAL PRIMARY KEY,
    "sort" INT,
    "name" text,
    "is_public" BOOLEAN,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."menu_add_on" (
    "id" SERIAL PRIMARY KEY,
    "menu_id" INT references "menu" ON DELETE CASCADE,
    "group_add_on_id" INT references "group_add_on" ON DELETE CASCADE,,
    "sort" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."add_on" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "is_public" BOOLEAN,
    "group_add_on_id" INT references "group_add_on" ON DELETE CASCADE,,
    "price_add_on" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE "public"."order_list_filter_menu" (
    "id" SERIAL PRIMARY KEY,
    "order_list_id"int references "order_list" ON DELETE CASCADE,,
    "menu_filter_id"int references "menu_add_on" ON DELETE CASCADE,,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);