function convertToSnakeCase (key) {
  const result = key.replace(/([A-Z])/g, function (match, $1) {
    return '_' + ($1).toLowerCase();
  });
  return result;
}

module.exports = convertToSnakeCase;
