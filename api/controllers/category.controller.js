const db = require('../db/config')
const { Category } = require('../models/Category')

exports.all = async (req, res) => {
  try {
    db.connect()
    const categories = await Category.query()
      .select('id', 'name')
      .where('isDeleted', 0)
    res.status(200).send({ data: categories })
  }
  catch (err) {
    console.log(err)
    res.status(404).send({ message: 'Data not found!' })
  }
  finally {
    db.destroy()
  }
}

exports.create = async (req, res) => {
  console.log(req.body)
  try {
    db.connect()
    await Category.query().insert({
      name: req.body.name
    })
    res.status(200).send({ message: 'Category created with success!' })
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Internal server error!' })
  }
  finally {
    db.destroy()
  }
}

exports.delete = async (req, res) => {
  console.log(req.params.id)
  try {
    db.connect()
    await Category.query()
      .patch({
        isDeleted: 1
      })
      .where('id', req.params.id)
    res.status(200).send({ message: 'Category deleted with success!' })
  }
  catch (err) {
    console.log(err)
    res.status(500).send({ message: 'Internal server error!' })
  }
  finally {
    db.destroy()
  }
}