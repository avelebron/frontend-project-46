import _ from 'lodash';

const calculateDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const diff = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, type: 'object', children: calculateDiff(file1[key], file2[key]) };
    }

    if (!_.has(file1, key)) {
      return { key, type: 'added', val2: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { key, type: 'deleted', val1: file1[key] };
    }
    if (file1[key] !== file2[key]) {
      return { key, type: 'changed', val1: file1[key], val2: file2[key] };
    }

    return { key, type: 'unchanged', val1: file1[key] };
  });

  return diff;
}

export default calculateDiff;
