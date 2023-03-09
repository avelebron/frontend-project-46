import calculateDiff from './calculateDiff.js';
import readFile from './utils.js';
import parse from './parsers.js';

const getParesedData = (file) => {
  const data = readFile(file);
  return parse(data);
};

export default (file1, file2) => {
  const diff = calculateDiff(getParesedData(file1), getParesedData(file2));
  return diff;
};
