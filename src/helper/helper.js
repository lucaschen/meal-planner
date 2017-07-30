const generateId = () => {
  return Math.random().toString(36).substring(2);
}

const arrayDiff = (a, b) => {
  return a.filter(i => b.indexOf(i) < 0);
}

const roundTo = decPlaces => num => {
  return Math.round(num * 10 ** decPlaces) / 10 ** decPlaces;
}

const oneDec = roundTo(1);
const twoDec = roundTo(2);

export {
  generateId,
  arrayDiff,
  roundTo,
  oneDec,
  twoDec
}
