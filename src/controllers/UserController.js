const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 78300,
  })
}

module.exports = {
  async login(req, res) {
    const { email, password, isLogged } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).send({
        status: 0,
        message: 'E-mail ou senha incorreto!',
        user: {},
      })
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        status: 0,
        message: 'Senha incorreta!',
      })
    }

    const user_id = user.id

    await User.update(
      {
        isLogged,
      },
      {
        where: {
          id: user_id,
        },
      }
    )

    user.password = undefined

    const token = generateToken({ id: user.id })

    return res.status(200).send({
      status: 1,
      message: 'Usuário logado com sucesso',
      user,
      token,
    })
  },
  async index(req, res) {
    const user = await User.findAll()

    if (user == '' || user == null) {
      return res.status(200).send({ message: 'Nenhum usuário encontrado' })
    }

    return res.status(200).send({ user })
  },
  async store(req, res) {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    const token = generateToken({ id: user.id })

    return res
      .status(200)
      .send({
        status: 1,
        message: 'Usuário cadastrado com sucesso',
        user,
        token,
      })
  },
  async update(req, res) {
    const { name, email, password } = req.body
    const { user_id } = req.params
    await User.update(
      {
        name,
        email,
        password,
      },
      {
        where: {
          id: user_id,
        },
      }
    )

    return res.status(200).send({
      status: 1,
      message: 'Usuário atualizado com sucesso',
    })
  },
  async delete(req, res) {
    const { user_id } = req.params
    const user = User.findAll()
    if (!user) {
      return res.status(400).send({
        status: 0,
        message: 'Usuário não encontrado',
      })
    }
    await User.destroy({
      where: {
        id: user_id,
      },
    })
    return res.status(200).send({
      status: 1,
      message: 'Usuário deletado com sucesso',
      user,
    })
  },
}
