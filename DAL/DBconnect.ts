import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog_db',
    password: 'h8chadas',
    port: 5432
})

export default pool;