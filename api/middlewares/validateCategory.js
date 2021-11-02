const db = require('../db')

verifyWhenCreate = async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        if (req.body.name.length > 128) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        if (await checkIfExists({ name: req.body.name }) !== 0) {
            res.status(409).send({ message: process.env.ERROR_MESSSAGE_409 })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

verifyWhenDelete = async (req, res, next) => {
    try {
        if (await checkIfExists({ id: req.params.id }) === 0) {
            res.status(404).send({ message: process.env.ERROR_MESSSAGE_404  })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

async function checkIfExists({ name, id }) {
    let countCategory = null
    if (name) {
        countCategory = await db.Category.query()
            .count('name as quantity')
            .where('name', name)
            .andWhere('isDeleted', 0)
    } else {
        countCategory = await db.Category.query()
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