const name = 'check_item';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.integer('owner_id').unsigned();
    table.string('name');
    table.string('description');
    table.boolean('journal_must');
    table.timestamps();

    table.foreign('owner_id').references('user.id');
  });
};

module.exports = {
  name,
  create
};
