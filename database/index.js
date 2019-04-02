const path = require('path');
const fs = require('fs');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'daily_check',
    password: 'daily_check',
    database: 'daily_check_db'
  },
  debug: true,
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map(row => convertToCamel(row));
    } else {
      return convertToCamel(result);
    }
  }
});

function convertToCamel (row) {
  const result = {};
  const keys = Object.keys(row);

  keys.forEach(key => {
    let finalKey = key;
    while (finalKey.indexOf('_') !== -1) {
      const index = key.indexOf('_');
      const dropSnakeKey = key.replace('_', '');
      const letter = dropSnakeKey[index];
      finalKey = dropSnakeKey.replace(letter, letter.toUpperCase());
    }

    result[finalKey] = row[key];
  });

  return result;
}

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
