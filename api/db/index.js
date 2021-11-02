const Knex = require('knex')
const knexConfig = require('../../knexfile')
const { Model } = require('objection')
const { Category } = require('../models/Category')
const { Device } = require('../models/Device')

Model.knex(Knex(knexConfig.dev))

module.exports = {
    Category,
    Device
}
