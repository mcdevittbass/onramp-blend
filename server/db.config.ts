const pg = require('pg'); 

export const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blendblog',
    password: 'BL3nd2021',
    port: 5432,
  })