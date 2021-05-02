const dotEnv = require('dotenv')
const result = dotEnv.config()

if (result.error) {
  throw result.error
}
module.exports = {
  APP_PORT,
  JJ_FANS_URL,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env
