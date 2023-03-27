import _ from 'lodash';

const convert = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (data) => {
  const iter = (curentValue, ancestry) => {
    const lines = Object
      .entries(curentValue)
      .flatMap(([key, val]) => {
        const newKey = `${ancestry}.${key}`;
        const tree = _.trimStart(newKey, '.');
        switch (val.type) {
          case 'added':
            return `Property '${tree}' was added with value: ${convert(val.value)}`;
          case 'deleted':
            return `Property '${tree}' was removed`;
          case 'changed':
            return `Property '${tree}' was updated. From ${convert(val.value1)} to ${convert(val.value2)}`;
          case 'unchanged':
            return [];
          case 'nested':
            return `${iter(val.children, newKey)}`;
          default:
            throw new Error(`Unknown type: '${val.type}'!`);
        }
      }).join('\n');
    return lines;
  };
  return iter(data, '');
};
