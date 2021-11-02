const db = require('../db/config')
const { Category } = require('../models/Category')

verifyWhenCreate = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        if (req.body.name.length > 128) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        db.connect()
        if (await checkIfExists({ name: req.body.name }) !== 0) {
            res.status(409).send({ message: 'Conflict, category already exist!' })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    } finally {
        db.destroy()
    }
}

verifyWhenDelete = async (req, res, next) => {
    try {
        db.connect()
        if (await checkIfExists({ id: req.params.id }) === 0) {
            res.status(404).send({ message: 'Data not found!' })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    } finally {
        db.destroy()
    }
}

async function checkIfExists({ name, id }) {
    let countCategory = null
    console.log(name, id)
    if (name) {
        countCategory = await Category.query()
            .count('name as quantity')
            .where('name', name)
            .andWhere('isDeleted', 0)
    } else {
        countCategory = await Category.query()
            .count('name as quantity')
            .where('id', id)
            .andWhere('isDeleted', 0)
    }
    return countCategory[0].quantity
}

module.exports = {
    verifyWhenCreate,
    verifyWhenDelete
}