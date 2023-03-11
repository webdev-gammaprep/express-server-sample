const express = require('express')
const app = express();
const cors = require('cors')
const users = require('./user.json');
const postRouter = require('./controller/posts');
const userRouter = require('./controller/users');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/aniblog').then((mongoose) => {
  console.log('MongoDb Connected');

}).catch(err => { console.error(err) })

app.use(cors());
app.use(express.json())


const v1 = '/api/v1'
app.post(v1 + '/login', (req, res) => {
  var user = users.find(u => u.username == req.body.username && bcrypt.compareSync(u.password, req.body.password))
  if (user) {
    var token = jwt.sign({ username: user.username, role: user.role }, 'secret');
    res.send(token)
  } else {
    res.status(401).send('Auth failed');
  }
})


app.use(v1 + '/posts', postRouter)
app.use(v1 + '/users', userRouter)

app.listen(3000, () => {
  console.log('Server started in port: 3000');
})





