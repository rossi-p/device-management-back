const db = require('../db')
require('dotenv').config()

exports.all = async (req, res) => {
    try {
        const devices = await db.Device.query()
            .select('Devices.id', 'category as categoryId', 'color', 'partNumber', 'Categories.name as categoryName')
            .from('Devices')
            .join('Categories', 'Devices.category', 'Categories.id')
            .where('Devices.isDeleted', 0)
        res.status(200).send({ data: devices })
    }
    catch (err) {
        console.log(err)
        res.status(404).send({ message: process.env.ERROR_MESSSAGE_404  })
    }
}

exports.create = async (req, res) => {
    try {
        await db.Device.query().insert({
            category: req.body.category,
            color: req.body.color,
            partNumber: req.body.partNumber
        })
        res.status(200).send({ message: process.env.SUCCESS_MESSSAGE_200 })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: process.env.ERROR_MESSSAGE_500  })
    }
}

exports.delete = async (req, res) => {
    try {
        await db.Device.query()
            .findById(req.params.id)
            .patch({
                isDeleted: 1
            })
        res.status(200).send({ message: process.env.SUCCESS_MESSSAGE_200 })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: process.env.ERROR_MESSSAGE_500 })
    }
}