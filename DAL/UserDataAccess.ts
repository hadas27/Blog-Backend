import User from "../models/User";
import pool from "./DBconnect";
import { DataAccess } from "./DataAccess";

export class UserDataAccess implements DataAccess<User> {
    async add(user: User): Promise<void> {
        const query = 'INSERT INTO public."user" (first_name, last_name) VALUES ($1, $2)'
        await pool.query(query, [user.firstName, user.lastName])
    }

    async delete(userId: number): Promise<void> {
        const query = 'DELETE FROM "user" WHERE id = $1'
        const result = await pool.query(query, [userId])

        if (result.rowCount === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
    }

    async get(userId: number): Promise<User> {
        const query = 'SELECT * FROM "user" WHERE id = $1'
        const result = await pool.query(query, [userId])
        if (result.rowCount === 0) {
            throw new Error(`User with ID ${userId} not found`)
        }
        return result.rows[0]
    }

    async update(userId: number, updateData: Partial<User>): Promise<void> {
        let query = 'UPDATE "user" SET ';
        const updates: string[] = [];
        const values: (string | number)[] = [];

        Object.entries(updateData).forEach(([key, value], index) => {
            updates.push(`${key} = $${index + 1}`);
            values.push(value);
        });

        query += updates.join(', ') + ' WHERE id = $' + (values.length + 1);
        values.push(userId);

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
    }
    async fetch(): Promise<User[]> {
        const query = 'SELECT * FROM "user"';
        let result = await pool.query(query);

        if (result.rows.length === 0) {
            throw new Error(`Users not found`);
        }
        return result.rows;
    }

}
