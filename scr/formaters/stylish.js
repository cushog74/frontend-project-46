import _ from 'lodash';

const getIndents = (depth) => {
  const indent = '  ';
  const indentSize = depth * 2;
  return {
    leftIndent: indent.repeat(indentSize - 1),
    rightIndent: indent.repeat(indentSize - 2),
  };
};

const renderToString = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const idents = getIndents(depth);

  const lines = Object.entries(value).map(([key, val]) => {
    if (!_.isObject(val)) {
      return `${idents.leftIndent}  ${key}: ${val}`;
    }

    return `${idents.leftIndent}  ${key}: ${renderToString(val, depth + 1)}`;
  });
  return ['{', ...lines, `${idents.rightIndent}}`].join('\n');
};

export default (tree) => {
  const iter = (node, depth) => {
    const idents = getIndents(depth);
    const result = node.map(({
      key, value, type, newValue,
    }) => {
      const renderValue = renderToString(value, depth + 1);
      switch (type) {
        case 'unchanged':
          return `${idents.leftIndent}  ${key}: ${renderValue}`;
        case 'changed':
          return `${idents.leftIndent}- ${key}: ${renderValue}\n${idents.leftIndent}+ ${key}: ${renderToString(newValue, depth + 1)}`;
        case 'deleted':
          return `${idents.leftIndent}- ${key}: ${renderValue}`;
        case 'added':
          return `${idents.leftIndent}+ ${key}: ${renderValue}`;
        case 'nested':
          return `${idents.leftIndent}  ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error('This type is not in use.');
      }
    });
    // return result.join('\n');
    return ['{', ...result, `${idents.rightIndent}}`].join('\n');
  };
  return iter(tree, 1);
};