import _ from 'lodash';

export default(file1, file2) => {
  const keys = _.uniq(_.keys(file1).concat(_.keys(file2)));

  const diff = keys
    .sort()
    .map((key) => {
    if (_.has(file1, key) && _.has(file2, key)) {
      return (file1[key] === file2[key]) ? `    ${key}: ${file1[key]}` : `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    if (_.has(file1, key) && !_.has(file2, key)) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!_.has(file1, key) && _.has(file2, key)) {
      return `  + ${key}: ${file2[key]}`;
    }
  });

  return(`{\n${diff.join('\n')}\n}`);
}
