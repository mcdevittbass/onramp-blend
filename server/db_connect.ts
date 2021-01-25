import { Request, Response } from 'express';
const pg = require('pg');


const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blendblog',
  password: 'BL3nd2021',
  port: 5432,
})


const getBlog = async (req:Request, res:Response) => {
    //const client = await pool.connect();
    const result = await pool.query('SELECT * FROM blogposts ORDER BY date DESC')
    .catch((err:Error) => console.error(err));

    //need to adjust date to remove time?
    
    res.status(200).json(result.rows);
  }

module.exports = {getBlog};