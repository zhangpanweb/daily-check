const name = 'user';

async function create (knex) {
  await knex.schema.createTable(name, (table) => {
    table.increments();
    table.string('name');
    table.timestamps();

    table.unique('name', 'name');
  });
};

module.exports = {
  name,
  create
};
