const User = require('../models/User')
const Address = require('../models/Address')

module.exports = {
  async index(req, res) {
    const { user_id } = req.params

    const user = await User.findByPk(user_id, {
      include: { association: 'address' },
    })

    if (!user) {
      return res.status(400).send({
        status: 0,
        message: 'Endereço não encontrado',
      })
    }

    return res.status(200).send(user)
  },
  async store(req, res) {
    try {
      const { user_id } = req.params
      const { street, number, district, city } = req.body

      const user = await User.findByPk(user_id)

      if (!user) {
        return res.status(400).json({
          status: 0,
          message: 'Usuário não encontrado',
        })
      }

      const address = await Address.create({
        street,
        number,
        district,
        city,
        user_id,
      })

      return res.status(200).send({
        status: 1,
        message: 'Endereço cadastrado com sucesso',
        address,
      })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },
  async delete(req, res) {
    const id = req.params.id

    try {
      const address = await Address.findByPk(id)
      if (address) {
        await Address.destroy({ where: { id } })

        return res.status(200).json({
          status: 1,
          message: 'Endereço deletado com sucesso',
        })
      } else {
        return res.status(400).json({
          status: 0,
          message: 'Endereço não encontrado',
        })
      }
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  },
  async update(req, res) {
    const id = req.params.id
    const { street, number, district, city } = req.body

    try {
      const address = await Address.findByPk(id)
      if (address) {
        await Address.update(
          { street, number, district, city },
          { where: { id } }
        )

        return res.status(200).json({
          status: 1,
          message: 'Endereço atualizado com sucesso',
          address,
        })
      } else {
        return res.status(400).json({
          status: 0,
          message: 'Endereço não encontrado',
        })
      }
    } catch (error) {
      return res.status(400).json({
        status: 0,
        message: 'Erro ao atualizar o endereço',
        error,
      })
    }
  },
}
