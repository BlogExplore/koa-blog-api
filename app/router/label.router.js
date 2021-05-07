const Router = require('@koa/router')
const { create } = require('../controller/label.controller')

const router = new Router({
  prefix: '/label',
})

router.post('/', create)

module.exports = router
