const authorization = (req, res, next) => {
  if(res.locals.role != 'admin') {
    res.status(403)
    res.send('Operation not authorized!')
  } else {
    next()
  }
}

module.exports = authorization