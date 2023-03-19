import _ from 'lodash';

const plainFormatter = (tree) => {
  const iter = (objects, ancestry) => {
    const stylishedObjects = objects.flatMap((object) => {
      const { name, value, status } = object;

      const valueType = (val) => {
        if (_.isObject(val)) {
          return '[complex value]';
        } if (_.isString(val)) {
          return `'${val}'`;
        }
        return val;
      };
      const newName = [...ancestry, name].join('');
      if (status === 'removed') {
        return `Property '${newName}' was removed`;
      } if (status === 'added') {
        return `Property '${newName}' was added with value: ${valueType(value)}`;
      } if (status === 'updated') {
        return `Property '${newName}' was updated. From ${valueType(object.oldValue)} to ${valueType(value)}`;
      } if (status === 'nested') {
        return iter(value, `${newName}.`);
      }
      return [];
    });
    return `${stylishedObjects.join('\n')}`;
  };
  return iter(tree, '');
};

export default plainFormatter;
