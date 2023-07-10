CREATE TABLE "public"."users" (
    "id" SERIAL,
    "name" text,
    "email" text,
    "password" text,
    "role {user|admin}" text,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."order" (
    "id" SERIAL,
    "user_id"int references "users",
    "order_status" TEXT,
    "remark"TEXT,
    "price_all" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."menu" (
    "id" SERIAL,
    "is_public" BOOLEAN,
    "name" text,
    "detail" TEXT,
    "sort" INT,
    "price" INT,
    "group_id" int references "group_menu",
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."order_list" (
    "id" SERIAL,
    "menu_id" int references "menu",
    "price_log" INT,
    "price_with_option" INT,
    "qty" INT,
    "order_id" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."menu_add_option" (
    "id" SERIAL,
    "menu_id"INT,
    "filter_menu_id" INT,
    "group_filter_id"INT,
    "sort" INT,
    "option_price" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."order_list_filter_menu" (
    "id" SERIAL,
    "order_list_id"int references "order_list",
    "menu_filter_id"int references "menu_filter",
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."group_menu" (
    "id" SERIAL,
    "name" text,
    "sort" INT,
    "is_public" BOOLEAN,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."group_menu_option" (
    "id" SERIAL,
    "sort" INT,
    "name" text,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."option_filter" (
    "id" SERIAL,
    "name" text,
    "is_public" BOOLEAN,
    "price_option" INT,
    "inserted_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
    "updated_at" timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),\
    PRIMARY KEY ("id")
);