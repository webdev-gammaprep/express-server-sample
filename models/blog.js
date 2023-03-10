const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogSchema = new Schema({
  'title': String,
  'image': String,
  'content': String
})

module.exports = mongoose.model('Blog', BlogSchema);