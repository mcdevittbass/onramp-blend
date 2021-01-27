import { Request, Response } from 'express';
import { pool } from '../db.config';

const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const jwtExp = '30m';

const authenticate = (token:string | undefined):number => {
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

const user_logIn_post = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    try {
    const results = await pool.query(`SELECT * FROM users WHERE email LIKE '${email}'`)
        const { rows, rowCount } = results;
        if(rowCount < 1) {
            res.status(404).send("We can't find that email address in our records");
            return;
        }

        // results.rows is an array with one record (email is a unique value in the DB)
        if(!rows[0].password || password !== rows[0].password) {
            res.status(401).send("That password doesn't match.")
        } else {
            const token = jwt.sign({ email }, secret, { expiresIn: jwtExp});

            res.status(200).json({ userID: rows[0].userid, favorites: rows[0].favorites, jwt: token});
        } 
    } catch(err:any) {
        console.error(err);
        res.send(err);
    } 
}

// add user to the users table
const user_signUp_post = async (req:Request, res:Response) => {
    const { first_name, email, password } = req.body;
    try {
        const results = await pool.query({
            text: `INSERT INTO users (first_name, email, password)
                VALUES ($1, $2, $3)`,
            values: [first_name, email, password]
        });
        console.log(results);
        res.send(results);
    } catch (err) {
        console.error(err);
    }
}


const user_info_getBlogIDs = async (req:Request, res:Response) => {
    let status = authenticate(req.headers.authorization);
    
    switch(status) {
        case 200:
            const { userID } = req.params;
            try {
                const results = await pool.query(`SELECT * FROM user_blog_relationship WHERE "userID" = ${userID}`)

                res.status(200).send(results.rows);
            } catch (err) {
                console.error(err);
            }
            break;
        case 401:
            res.status(401).send('Your session has timed out. Please log in again');
            break;
        case 400:
            res.status(400).send('Your request was not formed properly');
            break;
    } 
    
}

// gets the favorites array from the user's account
const user_get_favorites = async (req:Request, res:Response) => {
    let status = authenticate(req.headers.authorization);

    switch(status) {
        case 200:
            const { userID } = req.params;
            try {
            const response = await pool.query({
                text: `SELECT favorites FROM users WHERE userid = $1`,
                values: [userID]
            })
            if(response.rowCount < 1) {
                console.log(response);
                res.status(404).send("We could not find that user.");
                return;
            }
            res.status(200).send(response.rows);
            } catch (err) {
                console.error(err);
            }
            break;
        case 401:
            res.status(401).send('Your session has timed out. Please log in again');
            break;
        case 400:
            res.status(400).send('Your request was not formed properly');
            break; 
    }
    
}

const user_update_favorites = async (req:Request, res:Response) => {
    let status = authenticate(req.headers.authorization);

    switch(status) {
        case 200:
            const { favorites } = req.body;
            const { userID } = req.params;
            const response = await pool.query({
                text: `UPDATE users 
                    SET favorites = $1
                    WHERE userid = $2`,
                values: [favorites, userID]
            })
            try {
                if(response.rowCount < 1) {
                    console.log(response);
                    res.status(404).send("We could not find that user.");
                }
                res.status(200).send(response);
            } catch (err) {
                console.error(err);
            }
            break;
        case 401:
            res.status(401).send('Your session has timed out. Please log in again');
            break;
        case 400:
            res.status(400).send('Your request was not formed properly');
            break;
    }
}

module.exports = {
    user_logIn_post, 
    user_signUp_post,
    user_info_getBlogIDs, 
    user_get_favorites, 
    user_update_favorites,
    authenticate
}
