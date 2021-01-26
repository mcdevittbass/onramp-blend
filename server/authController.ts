import { Request, Response } from 'express';
import { pool } from './db.config';

const jwt = require('jsonwebtoken');

const secret = 'apprenticeships_rule!';
//change this!
const jwtExp = 60000;

export const authenticate = (token:string):number => {
    if(!token) return 401;

    let payload;
    try {
        payload = jwt.verify(token, secret);
    } catch (err) {
        if(err instanceof jwt.JsonWebTokenError) {
            //expired or unauthorized token
            return 401;
        } else {
            //bad request
            return 400;
        }
    }
    return 200;
}

export const logIn = async (req:Request, res:Response) => {
    const { email, password } = req.body;
    //account for empty fields
    const results = await pool.query(`SELECT * FROM users WHERE email LIKE '${email}'`).catch((err:any) => console.error(err));
    //rows is an array with one record (email is a unique value in the DB)
    const { rows } = results;
    
    if(password !== rows[0].password) {
        console.error("wrong password")
        res.status(401).end()
    } else {
        const token = jwt.sign({ email }, secret, { expiresIn: jwtExp});

        res.status(200).json({ userID: rows[0].userid, favorites: rows[0].favorites, jwt: token});
    } 
}
