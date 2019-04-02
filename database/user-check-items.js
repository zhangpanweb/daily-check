const name = 'user_check_items';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.integer('owner_id').unsigned();
    table.integer('check_item_id').unsigned();
    table.timestamps();

    table.foreign('owner_id').references('user.id');
    table.foreign('check_item_id').references('check_item.id');
  });
};

module.exports = {
  name,
  create
};
