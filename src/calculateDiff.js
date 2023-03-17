import _ from 'lodash';

const calculateDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diff = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, type: 'nested', children: calculateDiff(file1[key], file2[key]) };
    }

    if (!_.hasOwn(file1, key)) {
      return { key, type: 'added', value: file2[key] };
    }
    if (!_.hasOwn(file2, key)) {
      return { key, type: 'deleted', value: file1[key] };
    }
    if (file1[key] !== file2[key]) {
      return { key, type: 'changed', valueBefore: file1[key], valueAfter: file2[key] };
    }

    return { key, type: 'unchanged', value: file1[key] };
  });

  return diff;
}

export default calculateDiff;
