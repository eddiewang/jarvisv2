import jwt from "jsonwebtoken"
import _ from "lodash"
import bcrypt from "bcrypt"

export const createTokens = async (user, secret, refreshTokenSecret) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ["id", "email"])
    },
    secret,
    {
      expiresIn: "1h"
    }
  )

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, "id")
    },
    refreshTokenSecret,
    {
      expiresIn: "7d"
    }
  )

  return [createToken, createRefreshToken]
}

export const refreshTokens = async (token, refreshToken, models, secret, secret2) => {
  let userId = 0
  try {
    const { user: { id } } = jwt.decode(refreshToken)
    userId = id
  } catch (err) {
    return {}
  }
  if (!userId) {
    return {}
  }
  try {
    const user = await models.User.findOne({ where: { id: userId }, raw: true })
  } catch (err) {
    return {}
  }

  const refreshSecret = user.password + secret2

  try {
    jwt.verify(refreshToken, refreshSecret)
  } catch (err) {
    return {}
  }

  const [newToken, newRefreshToken] = await createTokens(user, secret, refreshSecret)
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user
  }
}

export const tryLogin = async (email, password, models, secret, secret2) => {
  const user = await models.User.findOne({ where: { email }, raw: true })
  const defaultErr = {
    ok: false,
    errors: [{ path: "login", message: "Invalid email or password" }]
  }

  if (!user) {
    return defaultErr
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return defaultErr
  }

  const refreshTokenSecret = user.password + secret2

  const [token, refreshToken] = await createTokens(user, secret, refreshTokenSecret)

  return {
    ok: true,
    token,
    refreshToken
  }
}
