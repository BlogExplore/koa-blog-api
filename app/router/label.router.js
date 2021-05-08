const Router = require('@koa/router')
const { create, list } = require('../controller/label.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const router = new Router({
  prefix: '/api/v1/label',
})

router.post('/', verifyAuth, create)
router.get('/', list)
module.exports = router
