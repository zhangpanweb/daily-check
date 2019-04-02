const path = require('path');
const fs = require('fs');
const convertToCamel = require('../utils/convertToCamel');
const convertToSnakeCase = require('../utils/convertToSnakeCase');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'daily_check',
    password: 'daily_check',
    database: 'daily_check_db'
  },
  debug: true,
  postProcessResponse: (result, queryContext) => convertToCamel(result),
  wrapIdentifier: (value, origImpl, queryContext) => origImpl(convertToSnakeCase(value))
});

establishDb();

async function establishDb () {
  const dbDictionary = path.resolve(__dirname, './');

  const files = fs.readdirSync(dbDictionary);

  files.forEach(async file => {
    if (file === 'index.js') return;
    const table = require(`${dbDictionary}/${file}`);

    const exists = await knex.schema.hasTable(`${table.name}`);
    if (exists) return;

    table.create(knex);
  });
}

module.exports = knex;
