const express = require('express')
const dotenv = require('dotenv')

const cors = require('cors')
dotenv.config()
const app = express()
const db = require('./db');


db.connect()
.then(() => {console.log('Database connected.'); })
.catch(async (err) => {
    console.err(err);
    await db.end();
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))


app.listen(3001, ()=>{
    console.log('server started on port 3001')
})
