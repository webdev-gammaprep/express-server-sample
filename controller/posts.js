var express = require('express')
var router = express.Router()
const fs = require('fs')
const authentication = require('../auth/authentication');
// const authorization = require('../auth/authorization');
const { getBlogById, getAllBlogs, createBlog, updateBlog, deleteBlog } = require('../dao/blogs')

router.get('/', authentication, async (req, res) => {
  res.json(await getAllBlogs());
})

router.get('/:postId', authentication, async (req, res) => {
  res.json(await getBlogById(req.params.postId))
})

router.post('/', authentication, async (req, res) => {
  try {
    await createBlog(req.body);
    res.status(201).send();
  } catch (err) {
    console.log(err)
    res.status(500).send();
  }
})


router.put('/:postId', authentication, async (req, res) => {
  try {
    await updateBlog(req.params.postId, req.body);
    res.status(200).send('Update successfull');
  } catch (err) {
    console.log(err)
    res.status(500).send('Update failed');
  }
})

router.delete('/:postId', authentication, async (req, res) => {
  await deleteBlog(req.params.postId)
  res.status(200).json({ message: 'Delete succesfull!' })
})

module.exports = router;