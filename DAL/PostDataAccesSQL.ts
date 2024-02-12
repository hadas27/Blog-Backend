import Post from "../models/Post";
import { DataAccess } from "./DataAccess";
import pool from "./DBconnect";

export class PostDataAccessSQL implements DataAccess<Post>{
    async add(post: Post): Promise<void> {
        const query = 'INSERT INTO post (title, description, postedBy) VALUES ($1, $2, $3)';
        await pool.query(query, [post.title, post.description, post.postedBy]);
    }

    async get(postId: number): Promise<Post> {
        const query = 'SELECT * FROM post WHERE id = $1';
        const result = await pool.query(query, [postId]);

        if (result.rows.length === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }

        return result.rows[0];
    }

    async update(postId: number, updateData: Partial<Post>): Promise<void> {
        let query = 'UPDATE post SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];

        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
        values.push(postId);

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }


    async delete(postId: number): Promise<void> {
        const query = 'DELETE FROM post WHERE id = $1';
        const result = await pool.query(query, [postId]);
        if (result.rowCount === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
    }

    async fetch(offset?: number, limit?: number, text: string = '', queryAuth: string = ''): Promise<Post[]> {
        const query = 'SELECT p.* FROM post p JOIN "user" u ON p.postedby = u.id WHERE p.title ILIKE $3 AND u.last_name ILIKE $4 LIMIT $2 OFFSET $1';

        ;
        let result = await pool.query(query, [offset, limit, `%${text}%`, `%${queryAuth}%`]);
        console.log(`text: ${text}`)
        if (result.rows.length === 0) {
            throw new Error(`Posts not found`);
        }
        return result.rows;
    }
}