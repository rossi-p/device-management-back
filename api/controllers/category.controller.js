const db = require('../db')
require('dotenv').config()

exports.all = async (req, res) => {
  try {
    const categories = await db.Category.query()
      .select('id', 'name')
      .where('isDeleted', 0)
    res.status(200).send({ data: categories })
  }
  catch (err) {
    console.log(err)
    res.status(404).send({ message: process.env.ERROR_MESSAGE_404 })
  }
}

exports.create = async (req, res) => {
  try {
    await db.Category.query().insert({
      name: req.body.name
    })
    res.status(200).send({ message: process.env.SUCCESS_MESSSAGE_200 })
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: process.env.ERROR_MESSSAGE_500 })
  }
}

exports.delete = async (req, res) => {
  try {
    await db.Category.query()
      .patch({
        isDeleted: 1
      })
      .where('id', req.params.id)
    res.status(200).send({ message: process.env.SUCCESS_MESSSAGE_200 })
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: process.env.ERROR_MESSSAGE_500 })
  }
}