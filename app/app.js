const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const errorHandler = require('./extend/errorHandler')

const app = new Koa()

const useRoutes = require('./router')
const { APP_PORT } = require('./config')
app.use(bodyParser())

useRoutes(app)
require('./config/db')
app.on('error', errorHandler)
app.listen(APP_PORT, () => {
  console.log(`http://127.0.0.1:${APP_PORT}`)
})
