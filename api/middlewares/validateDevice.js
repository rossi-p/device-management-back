const db = require('../db')

verifyWhenCreate = async (req, res, next) => {
    try {
        if (!req.body.category) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        if (!req.body.color) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        if (!req.body.partNumber) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        if (req.body.color.length > 16 || !/^[a-zA-Z\s]*$/.test(req.body.color)) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        const ifCategoryExist = await db.Category.query()
            .count('id as quantity')
            .where('id', req.body.category)
            .andWhere('isDeleted', 0)
        if (ifCategoryExist[0].quantity === 0) {
            res.status(400).send({ message: process.env.ERROR_MESSSAGE_400 })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

verifyWhenDelete = async (req, res, next) => {
    try {
        const countDevice = await db.Device.query()
            .count('id as quantity')
            .where('id', req.params.id)
            .andWhere('isDeleted', 0)
        if (countDevice[0].quantity === 0) {
            res.status(404).send({ message: process.env.ERROR_MESSSAGE_404 })
            return
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    verifyWhenCreate,
    verifyWhenDelete
}