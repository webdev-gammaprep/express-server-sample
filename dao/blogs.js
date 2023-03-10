const Blog = require('../models/blog')

exports.getAllBlogs = async function () {
  let blogs = await Blog.find({});
  console.log(blogs);
  return blogs;
}

exports.getBlogById = function (id) {
  console.log(id)
  return Blog.findOne({ _id: id });
}

exports.createBlog = function (newBlog) {
  let blog = new Blog(newBlog);
  return blog.save();
}

exports.updateBlog = async function (id, updatedBlog) {
  try {
    var oldBlog = await Blog.findOne({ _id: id })
    oldBlog.title = updatedBlog.title;
    oldBlog.image = updatedBlog.image;
    oldBlog.content = updatedBlog.content;
    await oldBlog.save();
    return true;
  } catch (err) { console.log(err); return false; }
}

exports.deleteBlog = async function (id) {
  try {
    await Blog.deleteOne({ _id: id })
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}