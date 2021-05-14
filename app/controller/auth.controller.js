const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../config/index')
const { SuccessModel } = require('../core/ResModel')

class AuthController {
  async login(ctx, next) {
    const { id, username } = ctx.user

    const TOKEN = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    ctx.body = new SuccessModel({ id, username, token: TOKEN })
  }
}

module.exports = new AuthController()
