const express = require('express')
const app = express();
const cors = require('cors')
const users = require('./user.json');
const postRouter = require('./controller/posts');
const userRouter = require('./controller/users');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const logger = require('./config/log');
mongoose.connect('mongodb://127.0.0.1:27017/aniblog').then((mongoose) => {
  console.log('MongoDb Connected');
}).catch(err => {console.error(err)})

app.use(cors());
app.use(express.json())

app.post('/login', (req, res)=>{
  var user = users.find(u => u.username == req.body.username && u.password == req.body.password)
  if(user) {
    logger.info(`User found for username: ${req.body.username}`);
    var token = jwt.sign({username: user.username, role: user.role}, 'secret');
    res.send(token)
  } else {
    logger.error(`username: ${req.body.username} was not found!`)
    res.status(401).send('Auth failed');
  }
})


app.use('/posts', postRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('Server started in port: 3000');
})





