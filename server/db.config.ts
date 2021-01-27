const pg = require('pg'); 
const config = require('./config');

export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blendblog',
    password: config.postgresPassword,
    port: 5432,
  })