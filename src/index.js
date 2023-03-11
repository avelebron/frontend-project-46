import path from 'path';
import fs from 'fs';
import calculateDiff from './calculateDiff.js';
import parse from './parsers.js';
import format from './formatters/index.js';
import process from 'process';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

const getParsedData = (file) => {
  const data = readFile(file);
  const format = path.extname(file).substring(1);
  return parse(data, format);
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = getParsedData(filepath1);
  const file2 = getParsedData(filepath2);
  const diff = calculateDiff(file1, file2);
  return format(diff, formatName);
};
