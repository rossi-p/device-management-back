const { Model } = require('objection')

class Device extends Model {
    static get tableName() {
        return 'Devices'
    }

    static get relationMappings() {
        const { Category } = require('./Category')
        return {
            type: {
                relation: Model.BelongsToOneRelation,
                modelClass: Category,
                join: {
                    from: 'devices.category',
                    to: 'categories.id'
                }
            }
        }

    }
}

module.exports = {
    Device,
}