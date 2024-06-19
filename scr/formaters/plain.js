import _ from 'lodash';

const renderToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

export default (tree) => {
  const iter = (node, keys) => {
    const result = node
      .filter(({ type }) => type !== 'unchanged')
      .map(({
        key, value, type, newValue,
      }) => {
        switch (type) {
          case 'added':
            return `Property '${keys}${key}' was added with value: ${renderToString(value)}`;
          case 'deleted':
            return `Property '${keys}${key}' was removed`;
          case 'changed':
            return `Property '${keys}${key}' was updated. From ${renderToString(value)} to ${renderToString(newValue)}`;
          case 'nested':
            return iter(value, `${keys}${key}.`);
          default:
            throw new Error('This type is not in use.');
        }
      });
    return result.join('\n');
  };
  return iter(tree, '');
};