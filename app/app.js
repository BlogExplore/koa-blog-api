const Koa = require('koa')
const app = new Koa()

const useRoutes = require('./router')
const { APP_PORT } = require('./config')

useRoutes(app)
app.listen(APP_PORT, () => {
  console.log(`http://127.0.0.1:${APP_PORT}`)
})
