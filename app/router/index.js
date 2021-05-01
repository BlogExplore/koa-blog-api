const fs = require('fs')

const useRoutes = (app) => {
  const rotesList = fs.readdirSync(__dirname)
  let len = rotesList.length
  for (let i = 0; i < len; i++) {
    if (rotesList[i] !== 'index.js') {
      const router = require(`./${rotesList[i]}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  }
}
module.exports = useRoutes
