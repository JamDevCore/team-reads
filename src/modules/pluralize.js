const pluralize = (count, string, plural) => {
  if (plural) {
    return count === 1 ? string : plural;
  }
  return count === 1 ? string : `${string}s`;
};

export default pluralize;
