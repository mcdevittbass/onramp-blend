import { Request, Response } from 'express';
import { pool } from './db.config';
import { authenticate } from './authController';


//return the whole list of blogs
const getBlog = async (req:Request, res:Response) => {
    let status;
    if(req.headers.authorization !== undefined) {
      status = authenticate(req.headers.authorization);
    } else {
      res.status(401).end();
    }
    
    switch(status) {
      case 200:
        const result = await pool.query('SELECT * FROM blogposts ORDER BY date DESC')
          .catch((err:Error) => console.error(err));
        res.status(200).send(result.rows);
        break;
      case 401:
        res.status(401).send('Your session has timed out. Please log in again');
        break;
      default:
        res.send('Unknown error');
    } 
  }

module.exports = {getBlog};