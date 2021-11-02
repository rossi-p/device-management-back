const Knex = require('knex')
const knexConfig = require('../../knexfile')
const { Model } = require('objection')


module.exports = {
    connect(){
       Model.knex(Knex(knexConfig.dev))
    },

    destroy(){
        Knex(knexConfig.dev).destroy()
    }
}
