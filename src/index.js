import fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

export default(filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));

  const keys = _.uniq(_.keys(obj1).concat(_.keys(obj2)));

  const diff = keys
    .sort()
    .map((key) => {
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return (obj1[key] === obj2[key]) ? `    ${key}: ${obj1[key]}` : `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
  });

  return(`{\n${diff.join('\n')}\n}`);
}
