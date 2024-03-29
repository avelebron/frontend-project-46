import path from 'path';
import process from 'process';
import fs from 'fs';
import getDifference from './calculateDiff.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (absolutePath) => fs.readFileSync(absolutePath, 'utf8');
const getExtension = (absolutePath) => path.extname(absolutePath).slice(1);

export default (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const data1 = parse(getData(path1), getExtension(path1));
  const data2 = parse(getData(path2), getExtension(path2));
  return formatter(getDifference(data1, data2), formatName);
};
