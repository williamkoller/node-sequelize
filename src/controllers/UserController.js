const User = require('../models/User')

module.exports = {
  async index(req, res) {
    const user = await User.findAll()

    if (user == '' || user == null) {
      return res.status(200).send({ message: 'Nenhum usuário encontrado' })
    }

    return res.status(200).send({ user })
  },
  async store(req, res) {},
  async update(req, res) {},
  async delete(req, res) {},
}
