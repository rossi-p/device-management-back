const controller = require('../controllers/device.controller')
const { validateDevice } = require('../middlewares')

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.get('/api/devices', controller.all)

  app.post('/api/devices',
    [validateDevice.verifyWhenCreate],
    controller.create)

  app.delete('/api/devices/:id',
    [validateDevice.verifyWhenDelete],
    controller.delete)
}