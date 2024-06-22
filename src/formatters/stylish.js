import _ from 'lodash';

const getIdent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - 2);
const getBrackeIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth * spacesCount) - spacesCount);

const stringify = (data, depth = 1) => {
  if (!_.isPlainObject(data)) return `${data}`;

  const currentIndent = getIdent(depth);
  const bracketIndent = getBrackeIndent(depth);
  const currentValue = Object.entries(data);

  const lines = currentValue.map(([key, value]) => `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`);

  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return result;
};

const getStylish = (tree) => {
  const iter = (currentValue, depth = 1) => {
    const currentIndent = getIdent(depth);
    const bracketIndent = getBrackeIndent(depth);
    const lines = currentValue.flatMap((node) => {
      const {
        key, children, status, value1, value2,
      } = node;
      switch (status) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value1, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`,
            `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type ${status}.`);
      }
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(tree);
};

export default getStylish;
