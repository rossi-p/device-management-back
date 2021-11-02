const { destroy } = require('../db/config')
const db = require('../db/config')
const { Category } = require('../models/Category')
const { Device } = require('../models/Device')

verifyWhenCreate = async (req, res, next) => {
    try {
        if (!req.body.category) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        if (!req.body.color) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        if (!req.body.partNumber) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        if (req.body.color.length > 16 || !/^[a-zA-Z\s]*$/.test(req.body.color)) {
            res.status(400).send({ message: 'Bad request!' })
            return
        }
        db.connect()
        const ifCategoryExist = await Category.query()
            .count('id as quantity')
            .where('id', req.body.category)
            .andWhere('isDeleted', 0)
        console.log('teste', ifCategoryExist[0].quantity)
        if (ifCategoryExist[0].quantity === 0) {
            res.status(400).send({ message: 'Bad request!' })
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
        const countDevice = await Device.query()
            .count('id as quantity')
            .where('id', req.params.id)
            .andWhere('isDeleted', 0)
        if (countDevice[0].quantity === 0) {
            res.status(404).send({ message: 'Device not found!' })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    } finally {
        db.destroy()
    }
}

module.exports = {
    verifyWhenCreate,
    verifyWhenDelete
}