SET check_function_bodies = false;
INSERT INTO public.users (id, email, password, created_at, updated_at) VALUES (2, 'test2@test2.com', '$2b$10$3emrYTM686snZ0rV47qLIOuAFwqQsjF/0.jSMkaNLq6I1Xx7bUR9C', '2025-05-05 20:35:13.140571', '2025-05-05 20:35:13.140571');
INSERT INTO public.users (id, email, password, created_at, updated_at) VALUES (3, 'test3@test3.com', '$2b$10$sDYpGOWBAwFC8pIb6VqKe.SoHDywS1FETA6IL2V9ogyv4WW56PA3q', '2025-05-05 20:53:53.42748', '2025-05-05 20:53:53.42748');
INSERT INTO public.users (id, email, password, created_at, updated_at) VALUES (1, 'test1@test1.com', '$2b$10$0xQPabPbRkXqxVNlEIsTXeBXE9Ansn2OiUSNHM4.zwyt5GGqVMx12', '2025-05-05 20:31:42.89848', '2025-05-05 20:31:42.89848');
INSERT INTO public.users (id, email, password, created_at, updated_at) VALUES (4, 'test4@test4.com', '$2b$10$FO5JPd1COt/PAXjlaxyZuun/f7Wtk85IxmtyiIJeW3nG32/VosmiS', '2025-05-05 20:57:47.683521', '2025-05-05 20:57:47.683521');
INSERT INTO public.users (id, email, password, created_at, updated_at) VALUES (5, 'test5@test5.com', '$2b$10$4A3fTJomKmYyZQbvsHvvuukMZvlygx.pEVZ1clOB4I7rDVkanEvBu', '2025-05-05 20:58:42.992228', '2025-05-05 20:58:42.992228');
SELECT pg_catalog.setval('public.users_id_seq', 5, true);
