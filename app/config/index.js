const dotEnv = require('dotenv')
const result = dotEnv.config()

if (result.error) {
  throw result.error
}
module.exports = { APP_PORT ,JJ_FANS_URL} = process.env
