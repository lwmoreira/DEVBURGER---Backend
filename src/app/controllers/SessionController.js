import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import authConfig from '../../config/auth'

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(9).required(),
    })

    const emailOrPasswordIncorrect = () => {
      return response
        .status(401)
        .json({ error: 'Make sure your email or pa  ssword are correct' })
    }

    const { email, password } = request.body

    if (!(await schema.isValid(request.body))) return emailOrPasswordIncorrect

    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      emailOrPasswordIncorrect()
    }

    const isSamePassword = await user.checkPassword(password)

    if (!isSamePassword) {
      emailOrPasswordIncorrect()
    }

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email,
      admin: user.admin,
      token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
