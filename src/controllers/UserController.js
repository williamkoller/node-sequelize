const User = require('../models/User')

module.exports = {
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

    return res
      .status(200)
      .send({ status: 1, message: 'Usuário cadastrado com sucesso', user })
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
    await User.destroy({
      where: {
        id: user_id,
      },
    })
    return res.status(200).send({
      status: 1,
      message: 'Usuário deletado com sucesso',
    })
  },
}
