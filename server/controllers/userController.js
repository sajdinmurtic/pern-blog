const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const pool = require('../db');
const generateToken = require('../utils/generateToken');

const register = async (req, res)=>{
 const {email, username, password} = req.body;
    
try{
    const user  = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", 
   [email,username]);
        
        if(user.rows.length > 0) return res.status(401).json('User already exist')
        
            const salt =  await bcrypt.genSalt(10)
            const hashedPassword =  await bcrypt.hash(password, salt)
            
            const newUser = await pool.query("INSERT INTO users(username,email,password) VALUES ($1, $2, $3) RETURNING *",
            [username,email, hashedPassword] );
            return res.json(newUser.rows[0].user_id)
}catch(err){
    console.log(err.message)
    res.status(500).send('Server error')
}
 };

const login = async(req, res)=>{
    const {email, password} = req.body;
    try{
        const user  = await pool.query("SELECT * FROM users WHERE email = $1",
        [email]);
        if(user.rows.length === 0) return res.status(401).json('Invalid credentials')
 
        const checkedPassword = await bcrypt.compare(
            password, user.rows[0].password
        );
        if(!checkedPassword){
            return res.status(401).json('Invalid credentials')
        }
        const token = generateToken(user.rows[0].user_id);
        
       
     return res.json({token, user})
    }catch(err){
        res.status(401).send({err})
    }
}
module.exports = {
    register,
    login
}