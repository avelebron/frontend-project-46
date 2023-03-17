import _ from 'lodash';

const normalize = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value;
};

export default (data) => {
  const iter = (node, path) => {
    const lines = node.flatMap((data) => {
      const {
        type, key, value, valueBefore, valueAfter, children,
      } = data;

      switch (type) {
        case 'nested': {
          return iter(children, `${path}${key}.`);
        }
        case 'added': {
          return `Property '${path}${key}' was added with value: ${normalize(value)}`;
        }
        case 'deleted': {
          return `Property '${path}${key}' was removed`;
        }
        case 'changed': {
          return `Property '${path}${key}' was updated. From ${normalize(valueBefore)} to ${normalize(valueAfter)}`;
        }
        default:
          throw new Error(`Unknown type ${type}`);
      }
    });
    return lines.join('\n');
  };

  return iter(data, '');
};
