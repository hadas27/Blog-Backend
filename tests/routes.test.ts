import Post from '../models/Post';
import request from 'supertest';
import { app } from '../Index' // Assuming your Express app is exported from 'app.ts' or 'app.js'
import { describe } from 'node:test';
import { execSync } from 'child_process';

describe("Post routes", () => {

    beforeAll(() => {
        // Connect to your test database here
        // Load `rebuild_db.sql` to reset the database state
        execSync("psql -U postgres -W -f rebuild_db.sql");
    });
    // ##################################### 1 - craete post ###########################
    it("this will ADD a new post", async () => {
        const res = await request(app)
            .post("/posts")
            .send({
                title: "fake title",
                description: "fake body",
            });

        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("Post created successfully");
    });

    it("this will ADD a new user", async () => {
        const res = await request(app)
            .post("/users")
            .send({
                firstName: "fake first",
                lastName: "fake last",
            });

        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toBe("User created successfully");
    });

    it("get post by id", async () => {
        const res = await request(app)
            .get(`/posts/1`)
        expect(res.status).toEqual(200)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('postedby');

    })

    it("get user by id", async () => {
        const res = await request(app)
            .get(`/users/1`)
        expect(res.status).toEqual(200)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');

    })

    it('should update a post', async () => {
        const updateData = {
            title: 'Updated Test Post',
            description: 'This post has been updated'
        };
        // Assuming a post with id 1 exists and can be updated
        const response = await request(app).put('/posts/1').send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Post 1 updated successfully');
    });

    it('should update a user', async () => {
        const updateData = {
            first_name: 'Updated Test User',
            last_name: 'This user has been updated'
        };
        // Assuming a post with id 1 exists and can be updated
        const response = await request(app).put('/users/1').send(updateData);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User 1 updated successfully');
    });

    it('should delete a post', async () => {
        // Assuming a post with id 1 exists and can be deleted
        const response = await request(app).delete('/posts/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Post 1 deleted successfully');
    });

    it('should delete a user', async () => {
        // Assuming a post with id 1 exists and can be deleted
        const response = await request(app).delete('/users/1');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('User 1 deleted successfully');
    });

    it('should fetch posts filtered by text', async () => {
        // Assuming posts exist that include the word 'Test' in their title
        const response = await request(app).get('/posts?from=1&to=2&text=Fourth');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        // Verify that all returned posts contain the filter text in the title
        response.body.forEach((post: Post) => {
            expect(post.title).toMatch(/Fourth Post Title/);
        });
    });


})