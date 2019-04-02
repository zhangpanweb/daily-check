const name = 'user_check_items';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.integer('owner_id').unsigned();
    table.integer('check_item_id').unsigned();
    table.timestamps(false, true);

    table.index('owner_id');
    table.index('check_item_id');
  });
};

module.exports = {
  name,
  create
};
