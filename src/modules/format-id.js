const formatId = (sub) => {
  const pipeIndex = sub.indexOf('|') + 1;
  console.log(sub.substring(pipeIndex, sub.length));
  return sub.substring(pipeIndex, sub.length);
}

export default formatId;
