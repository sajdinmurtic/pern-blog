const jwt = require('jsonwebtoken')
const pool = require('../db');

const addPost = async(req, res)=>{

try {
    console.log(req.body)
    const {title, description} = req.body;
   
    const newPost = await pool.query(
        "INSERT INTO posts (user_id, title, description) VALUES($1, $2, $3 ) RETURNING *",
        [req.user.id, title, description]
    );
    res.json(newPost.rows[0])
}catch(err){
    console.log(err.message)
}
}
const updatePost = async(req, res)=>{
try{
    const {id} = req.params;
    const {title, description } = req.body;
    const result = await pool.query(
        "UPDATE posts SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *",
        [title, description, id, req.user.id]

    )
    if(result.rows.length === 0){
        return res.json('This post is not yours')
    }
    res.json('Post was updated')
}catch(err){
    console.log(err.message)
}
}
const deletePost = async(req, res)=>{
    try{
        const {id} = req.params;
        
        const result = await pool.query(
            "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
            [id, req.user.id]
    
        )
        if(result.rows.length === 0){
            return res.json('This post is not yours')
        }
        res.json('Post was deleted')
    }catch(err){
        console.log(err.message)
    }
    }
    
    const getPosts = async(req, res)=>{
        
        try{
            const allPosts = await pool.query(
                "SELECT  * FROM posts"
                
                 
            )
            res.json(allPosts.rows)
        }catch(err){
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
 const getPost = async(req, res)=>{
 try{
    const {id} = req.params;
    const user = await pool.query("SELECT post.id, username, post.title, post.description FROM users JOIN posts post  ON users.user_id = post.user_id WHERE post.id = $1 ",
    [id])
    res.json(user.rows[0])
 }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
 }
 }
module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPost,
    getPosts
}