const name = 'check_record';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.integer('owner_id').unsigned();
    table.integer('check_item_id').unsigned();
    table.date('date');
    table.timestamps(false, true);

    table.index('owner_id');
    table.index('date');
    table.unique(['check_item_id', 'date']);
  });
};

module.exports = {
  name,
  create
};
