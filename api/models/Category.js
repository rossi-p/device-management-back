const { Model } = require('objection')

class Category extends Model {
    static get tableName() {
        return 'Categories'
    }

    static get relationMappings() {
        const { Device } = require('./Device')
        return {
            equipments: {
                relation: Model.HasManyRelation,
                modelClass: Device,
                join: {
                    from: 'categories.id',
                    to: 'devices.category'
                }
            }
        }

    }
}

module.exports = {
    Category,
}