const pg = require('pg'); 
const config = require('./config');

export const pool = new pg.Pool({
    user: 'postgres',
    host: '192.168.0.12',
    database: 'blendblog',
    password: config.postgresPassword,
    port: 5432,
  })