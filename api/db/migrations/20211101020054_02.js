
exports.up = (knex) => {
    return knex.schema.createTable('Devices', (table) => {
        table.increments('id').primary()
        table.integer('category')
            .unsigned()
            .references('id')
            .inTable('Categories')
            .notNullable()
        table.string('color', 16)
            .notNullable()
        table.integer('partNumber')
            .notNullable()
        table.tinyint('isDeleted', 1).defaultTo(0)
    })
}

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('Devices')
}