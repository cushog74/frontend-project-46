import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  return _.isObject(value) ? '[complex value]' : String(value);
};

const getPlain = (data) => {
  const iter = (value, path) => {
    const result = value
      .flatMap((node) => {
        const {
          key, children, status, value1, value2,
        } = node;
        const fullPath = (path === '') ? `${key}` : `${path}.${key}`;
        switch (status) {
          case 'nested':
            return iter(children, fullPath);
          case 'deleted':
            return `Property '${fullPath}' was removed`;
          case 'added':
            return `Property '${fullPath}' was added with value: ${getValue(value2)}`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown type: ${status}.`);
        }
      });
    return [...result].join('\n');
  };
  return iter(data, '');
};

export default getPlain;
