import dotenv from 'dotenv'
import path from 'path'
import { Pool } from 'pg'

//load environment variables from the project root.
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

//create a postgreSQL connection pool.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
  ssl: {
    rejectUnauthorized: false,
  },
})

//log unexpected database connection errors.
pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL error:', error)
})
