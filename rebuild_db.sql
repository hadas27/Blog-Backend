
DROP DATABASE IF exists blog_db;
CREATE DATABASE blog_db;
-- Connect to the desired database
\c blog_db;
-- Table: public.post

DROP TABLE IF EXISTS public.post;
DROP TABLE IF EXISTS public."user";

CREATE TABLE post
(
    id serial NOT NULL PRIMARY KEY,
    title character varying NOT NULL,
    description character varying NOT NULL,
    postedBy integer
);


INSERT INTO post (title, description, postedby)
VALUES 
    ('My First Post', 'A short post to test things out',  1),
    ('Another Post', 'The second post is always harder', 1),
    ('Guest Post', 'A visiting author writes on my blog',  2),
    ('Fourth Post Title', 'Fourth Post Description',3),
    ('Fifth Post Title', 'Fifth Post Description',3),
    ('Exploring SQL', 'Diving deeper into SQL queries and how they work', 1),
    ('Tech Trends 2024', 'Predictions and insights into the future of technology', 1),
    ('Understanding Indexes', 'How indexes can speed up database operations', 2),
    ('SQL vs NoSQL', 'A comparison of database technologies for developers', 3),
    ('Best Coding Practices', 'Tips and tricks for cleaner code', 2),
    ('The Future of AI', 'Exploring the advancements and ethical considerations of AI', 3),
    ('JavaScript Tips', 'Improving your JavaScript code for better performance', 1),
    ('Guest Insights', 'An industry expert shares their thoughts on tech evolution', 2);



CREATE TABLE "user"
(
    id serial NOT NULL PRIMARY KEY,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL
);

INSERT INTO "user" (first_name, last_name)
VALUES 
    ('Israel', 'Israel'),
    ('Sefi', 'Antebi'),
    ('Shay', 'Yehezkel'),
    ('Hadas', 'Weiner'),
    ('Noa', 'Peiser')