function convertToSnakeCase (key) {
  let finalKey = key;

  while (finalKey.match(/[A-Z]/)) {
    const index = finalKey.match(/[A-Z]/).index;
    finalKey = finalKey.slice(0, index) + '_' + finalKey[index].toLowerCase() + finalKey.slice(index + 1);
  }

  return finalKey;
}

module.exports = convertToSnakeCase;
