const express = require('express')
const app = express();
const cors = require('cors')
const users = require('./user.json');
const postRouter = require('./controller/posts');
const userRouter = require('./controller/users');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const logger = require('./config/log');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const authentication = require('./auth/authentication')

dotenv.config()
mongoose.connect(process.env.MONGO_CONNNECTION_STRING).then((mongoose) => {
  console.log('MongoDb Connected');
}).catch(err => {console.error(err)})

app.use(cors());
app.use(express.json())
const base = '/api/v1'


app.post(base+'/login', (req, res)=>{
  console.log(bcrypt.compareSync('admin', req.body.password))
  var user = users.find(u => u.username == req.body.username && bcrypt.compareSync(u.password, req.body.password))
  if(user) {
    logger.info(`User found for username: ${req.body.username}`);
    var token = jwt.sign({username: user.username, role: user.role}, process.env.JWT_SIGN_SECRET);
    res.send(token)
  } else {
    logger.error(`username: ${req.body.username} was not found!`)
    res.status(401).send('Auth failed');
  }
})


app.use(base + '/posts', authentication, postRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
  console.log('Server started in port: 3000');
})





