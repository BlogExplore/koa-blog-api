const fs = require('fs')
const path = require('path')
const dotEnv = require('dotenv')
const result = dotEnv.config()

if (result.error) {
  throw result.error
}

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, '../../private.key')
)

const PUBLIC_PEM = fs.readFileSync(path.resolve(__dirname, '../../public.pem'))
module.exports = {
  APP_PORT,
  APP_HOST,
  JJ_FANS_URL,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  CRYPTO_SECRET_KEY,
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_PEM = PUBLIC_PEM
