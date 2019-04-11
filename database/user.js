const name = 'user';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.string('name');
    table.string('password');
    table.timestamps(false, true);

    table.unique('name', 'name');
  });
};

module.exports = {
  name,
  create
};
