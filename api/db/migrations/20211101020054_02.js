
exports.up = (knex) => {
    return knex.schema.createTable('Devices', (table) => {
      table.increments('id').primary()
      table.integer('category')
           .unsigned()
           .references('id')
           .inTable('Categories')
      table.string('color', 16)
      table.integer('partNumber')
      table.tinyint('isDeleted', 1).defaultTo(0)
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists('Devices')
  };