
exports.up = (knex) => {
    return knex.schema.createTable('Categories', (table) => {
      table.increments('id')
      table.string('name', 128)
      table.tinyint('isDeleted', 1).defaultTo(0)
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists('Categories')
  };
