import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (data) => {
  const iter = (node, key = '') => {
    const result = node.flatMap((item) => {
      const newKeys = [...key, item.key];

      switch (item.type) {
        case 'object':
          return iter(item.children, newKeys);
        case 'added':
          return `Property '${newKeys.join('.')}' was added with value: ${stringify(item.val)}`;
        case 'deleted':
          return `Property '${newKeys.join('.')}' was removed`;
        case 'unchanged':
          return null;
        case 'changed':
          return `Property '${newKeys.join('.')}' was updated. From ${stringify(item.val1)} to ${stringify(item.val2)}`;
        default:
          return null;
      }
    });
    return result.join('\n');
  };

  return iter(data, []);
};
