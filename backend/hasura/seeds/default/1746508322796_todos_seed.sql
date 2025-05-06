SET check_function_bodies = false;
INSERT INTO public.todos (id, user_id, title, description, priority, status, created_at, updated_at) VALUES (7, 1, 'Buy Presents', 'Go out and buy Christmas presents for Laura and Sandra', 'high', 'todo', '2025-05-05 21:36:44.65111', '2025-05-05 21:36:44.65111');
INSERT INTO public.todos (id, user_id, title, description, priority, status, created_at, updated_at) VALUES (8, 1, 'Go To The Store', 'Eggs, bacon, milk, frozen yogurt, sweets', 'high', 'todo', '2025-05-05 21:38:49.961449', '2025-05-05 21:38:49.961449');
INSERT INTO public.todos (id, user_id, title, description, priority, status, created_at, updated_at) VALUES (10, 1, 'Go For A Walk', 'Walk a minimum of 3 km today', 'normal', 'todo', '2025-05-05 21:39:44.577026', '2025-05-05 21:39:44.577026');
INSERT INTO public.todos (id, user_id, title, description, priority, status, created_at, updated_at) VALUES (11, 1, 'Call James', 'Call James for a meeting update', 'normal', 'done', '2025-05-05 21:40:03.534555', '2025-05-05 21:40:03.534555');
SELECT pg_catalog.setval('public.todos_id_seq', 11, true);
