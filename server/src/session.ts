import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { pool } from './db'

//store user sessions in PostgreSQL.
const PostgreSQLStore = connectPgSimple(session)

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET is not configured')
}

export const sessionMiddleware = session({
  store: new PostgreSQLStore({
    pool,
    tableName: 'session',
    createTableIfMissing: false,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  },
})
