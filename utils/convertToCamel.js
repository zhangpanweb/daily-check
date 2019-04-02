function convertObjectToCamel (row) {
  if (!(row instanceof Object)) return row;
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

function convertToCamel (result) {
  if (Array.isArray(result)) {
    return result.map(row => convertObjectToCamel(row));
  } else {
    return convertObjectToCamel(result);
  }
}

module.exports = convertToCamel;
