import { Request, Response } from 'express';
import { pool } from '../db.config';

const userController = require('../user/userController');
const { authenticate } = userController;

// get the whole list of blog posts
const getBlog = async (req:Request, res:Response) => {
    let status = authenticate(req.headers.authorization);
    
    switch(status) {
      case 200:
        const result = await pool.query('SELECT * FROM blogposts ORDER BY date DESC')
        try {
          res.status(200).send(result.rows);
        } catch(err:any) {
          console.error(err)
        };
        break;
      case 401:
        res.status(401).send('Your session has timed out. Please log in again');
        break;
      default:
        res.send('Another error');
    } 
  }

//for testing only
const getOneBlog = async (req:Request, res:Response) => {
  const { blogID } = req.params;
  const result = await pool.query(`SELECT * FROM blogposts WHERE "blogID"=${blogID}`)
        try {
          res.status(200).send(result.rows);
        } catch(err:any) {
          console.error(err)
        };
}


// add blog created by user to the blogposts table with authentication
// on success, add the blogID-userID relationship to the user_blog_relationship table
const postBlog = async (req:Request, res:Response) => {
    let status = authenticate(req.headers.authorization);

    switch(status) {
      case 200:
        const { title, author, fulltext, previewtext, date, userID} = req.body;
        try {
          const addedPost = 
            await pool.query({
              text:`INSERT INTO blogposts (title, author, fulltext, previewtext, date) 
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING "blogID"`,
              values: [title, author, fulltext, previewtext, date]  
            })
              if(!addedPost.rows || addedPost.rows.length !== 1) {
                res.status(400).send('There was a problem adding your post to the database!');
                return;
              } 
              const newBlogID = addedPost.rows[0].blogID;
              const updatedRelationship = 
                await pool.query({
                  text: `INSERT INTO user_blog_relationship ("blogID", "userID") 
                  VALUES ($1, $2)`,
                  values: [newBlogID, userID]
                })
              res.status(200).send(updatedRelationship);
          } catch (err:any){
              console.error(err);
              res.send(err);
          }
        break;
      case 401:
        res.status(status).send("You are not authorized to make that request. Try signing in again!")
        break;
      case 400:
        res.status(status).send("Something went wrong adding your post!")
        break;
    }
}

//delete a blog post with authentication
const deleteBlog = async (req:Request, res:Response) => {
  let status = authenticate(req.headers.authorization);

  switch(status) {
    case 200:
      const { blogID } = req.body;
      const didDeletePost = await pool.query(
        `DELETE FROM blogposts WHERE "blogID" = ${blogID};`
      )
      try {
        console.log("deleted post!")
        res.status(200).send(didDeletePost);
      } catch(err) {
        console.error("Didn't delete post: " + err);
        res.send(err);
      }
      break;
    case 401:
      res.status(status).send("You are not authorized to delete that post. Try signing in again!")
      break;
    case 400:
      res.status(status).send("Something went wrong deleting your post!")
      break;
  } 
}

//update a blog post with authentication
const updateBlog = async (req:Request, res:Response) => {
  let status = authenticate(req.headers.authorization);

  switch(status) {
    case 200:
      const { blogID, title, author, fulltext, previewtext, date } = req.body;
      const didUpdatePost = await pool.query({
        text: `UPDATE blogposts
              SET title=$1, author=$2, 
              fulltext=$3, previewtext=$4, date=$5
              WHERE "blogID" = $6;`,
        values: [title, author, fulltext, previewtext, date, blogID]
      })
      try {
        console.log("updated post!")
        res.status(200).send(didUpdatePost);
      } catch(err) {
        console.error("Didn't update post: " + err);
        res.send(err);
      }
      break;
    case 401:
      res.status(status).send("You are not authorized to delete that post. Try signing in again!")
      break;
    case 400:
      res.status(status).send("Something went wrong deleting your post!")
      break;
  }
}

module.exports = {getBlog, postBlog, deleteBlog, updateBlog, getOneBlog};