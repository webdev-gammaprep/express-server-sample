const express = require('express')
var router = express.Router()
const fs = require('fs')
const authentication = require('../auth/authentication')
const authorization = require('../auth/authorization')

//service logic

function getAllUsers(req, res) {
  var users = JSON.parse(fs.readFileSync('user.json').toString());
  res.json(users)
}

function getUserById(req, res) {
  var users = JSON.parse(fs.readFileSync('user.json').toString());
  res.json(users.find(u => u.id == req.params.userId));
}

function createUser(req, res) {
  var users = JSON.parse(fs.readFileSync('user.json').toString());
  req.body.id = users.length != 0 ? users[users.length-1].id + 1 : 1;
  users = [...users, req.body]
  fs.writeFileSync('user.json', JSON.stringify(users, null, 2))
  res.json(req.body)
}

function updateUserById (req, res) {
  var users = JSON.parse(fs.readFileSync('user.json').toString());
  users = users.map(u => { return u.id == req.params.userId ? req.body : u})
  fs.writeFileSync('user.json', JSON.stringify(users, null, 2))
  res.json(req.body)
}

function deleteUser(req, res) {
  var users = JSON.parse(fs.readFileSync('user.json').toString());
  users = users.filter(u => u.id != req.params.userId);
  fs.writeFileSync('user.json', JSON.stringify(users, null, 2))
  res.json({message: 'Delete successfull!'})
}

// set user routes
router.get('/', authentication, authorization, getAllUsers)
router.get('/:userId', authentication, authorization, getUserById)
router.post('/', authentication, authorization, createUser)
router.put('/:userId', authentication, authorization, updateUserById)
router.delete('/:userId', authentication, authorization, deleteUser)

module.exports = router;