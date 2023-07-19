INSERT INTO "public"."add_on" ( "name", "is_public", "group_add_on_id", "price_add_on", "inserted_at", "updated_at") VALUES
('hot', NULL, 1, NULL, '2023-07-18 10:42:51.412297+00', '2023-07-18 10:42:51.412297+00'),
('cold', NULL, 1, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('smoothie', NULL, 1, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('0%', NULL, 2, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('25%', NULL, 2, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('50%', NULL, 2, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('75%', NULL, 2, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('100%', NULL, 2, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('1 shot', NULL, 3, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('2 shot', NULL, 3, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00'),
('3 shot', NULL, 3, NULL, '2023-07-18 10:44:11.316282+00', '2023-07-18 10:44:11.316282+00');

INSERT INTO "public"."group_add_on" ("sort", "name", "is_public", "inserted_at", "updated_at") VALUES
(NULL, 'temperature', NULL, '2023-07-18 10:45:26.391445+00', '2023-07-18 10:45:26.391445+00'),
(NULL, 'sweet', NULL, '2023-07-18 10:45:26.391445+00', '2023-07-18 10:45:26.391445+00'),
(NULL, 'shot', NULL, '2023-07-18 10:45:26.391445+00', '2023-07-18 10:45:26.391445+00');

INSERT INTO "public"."group_menu" ( "name", "sort", "is_public", "inserted_at", "updated_at") VALUES
('Coffee', NULL, 't', '2023-07-04 07:39:36.800291+00', '2023-07-04 07:39:36.800291+00'),
('Tea', NULL, 't', '2023-07-04 07:39:36.800291+00', '2023-07-04 07:39:36.800291+00'),
('Soda', NULL, 't', '2023-07-04 07:39:36.800291+00', '2023-07-04 07:39:36.800291+00'),
('Milk', NULL, 't', '2023-07-04 07:39:36.800291+00', '2023-07-04 07:39:36.800291+00'),
('Smoothie', NULL, 't', '2023-07-04 07:39:36.800291+00', '2023-07-04 07:39:36.800291+00');

INSERT INTO "public"."menu" ( "is_public", "name", "detail", "sort", "price", "user_id", "group_id", "inserted_at", "updated_at") VALUES
( NULL, 'Black coffee', NULL, NULL, NULL, NULL, 1, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
(NULL, 'Americano', NULL, NULL, NULL, NULL, 1, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Espresso', NULL, NULL, NULL, NULL, 1, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Green tea', NULL, NULL, NULL, NULL, 2, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Thai tea', NULL, NULL, NULL, NULL, 2, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Blue soda', NULL, NULL, NULL, NULL, 3, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Red soda', NULL, NULL, NULL, NULL, 3, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Milk Strawberry', NULL, NULL, NULL, NULL, 4, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00'),
( NULL, 'Citron Smoothie', NULL, NULL, NULL, NULL, 5, '2023-07-18 10:52:11.061355+00', '2023-07-18 10:52:11.061355+00');

INSERT INTO "public"."menu_add_on" ( "menu_id", "group_add_on_id", "sort", "inserted_at", "updated_at") VALUES
( 1, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 1, 3, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 2, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 2, 3, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 3, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 3, 3, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 4, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
( 4, 2, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(9, 5, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(10, 5, 2, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(11, 6, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(12, 7, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(13, 8, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(14, 8, 2, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(15, 9, 1, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00'),
(16, 9, 2, NULL, '2023-07-18 10:58:24.125554+00', '2023-07-18 10:58:24.125554+00');