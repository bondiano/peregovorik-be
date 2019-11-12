const { sign, verify } = require('jsonwebtoken')

module.exports = ({ config }) => {
  return {
    sign: payload =>
      sign(
        {
          ...payload,
          expiresIn: payload.expiresIn || config.JWT_EXPIRESIN,
        },
        config.JWT_SECRET,
      ),
    verify: payload => verify(payload, config.JWT_SECRET),
  }
}
