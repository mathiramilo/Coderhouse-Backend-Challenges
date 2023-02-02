const path = require('path')
const { fork } = require('child_process')
const { successResponse } = require('../utils/api.utils')

class RandomsController {
  getRandoms(req, res, next) {
    try {
      const { qty } = req.query
      const calculateRandoms = fork(path.resolve(__dirname, '../utils/randoms.utils.js'))
      calculateRandoms.send(qty || 100000000)
      calculateRandoms.on('message', data => {
        const response = successResponse(data)
        res.json(response)
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new RandomsController()
