function convertObjectToCamel (row) {
  if (!(row instanceof Object)) return row;
  const result = {};
  const keys = Object.keys(row);

  keys.forEach(key => {
    const covertedKey = key.replace(/(_)(\w)/g, function (match, $1, $2) {
      return ($2).toUpperCase();
    });

    result[covertedKey] = row[key];
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
