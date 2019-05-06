const name = 'check_item';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.integer('owner_id').unsigned();
    table.string('name');
    table.boolean('enabled').defaultTo(true);
    table.timestamps(false, true);

    table.index('owner_id');
  });
};

module.exports = {
  name,
  create
};
