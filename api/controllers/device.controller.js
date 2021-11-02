const db = require('../db/config')
const { Device } = require('../models/Device')

exports.all = async (req, res) => {
    try {
        db.connect()
        const devices = await Device.query()
            .select('Devices.id', 'category as categoryId', 'color', 'partNumber', 'Categories.name as categoryName')
            .from('Devices')
            .join('Categories', 'Devices.category', 'Categories.id')
            .where('Devices.isDeleted', 0)
        console.log(devices)
        res.status(200).send({ data: devices })
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
        await Device.query().insert({
            category: req.body.category,
            color: req.body.color,
            partNumber: req.body.partNumber
        })
        res.status(200).send({ message: 'Device created with success!' })
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
        await Device.query()
            .findById(req.params.id)
            .patch({
                isDeleted: 1
            })
        res.status(200).send({ message: 'Device deleted with success!' })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Internal server error!' })
    }
    finally {
        db.destroy()
    }
}