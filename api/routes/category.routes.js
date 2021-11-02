const controller = require('../controllers/category.controller')
const { validateCategory } = require('../middlewares')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/categories', controller.all)

  app.post('/api/categories',
    [validateCategory.verifyWhenCreate],
    controller.create)

  app.delete('/api/categories/:id',
  [validateCategory.verifyWhenDelete], controller.delete)
}