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

    const lines = currentValue.map((node) => {
      const {
        key, children, status, value1, value2,
      } = node;
      const value = status === 'nested'
        ? `${currentIndent}  ${key}: ${iter(children, depth + 1)}`
        : status === 'deleted'
          ? `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`
          : status === 'added'
            ? `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`
            : status === 'unchanged'
              ? `${currentIndent}  ${key}: ${stringify(value1, depth + 1)}`
              : status === 'changed'
                ? [
                  `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}`,
                  `${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`,
                ].join('\n')
                : throw new Error(`Unknown type ${status}.`);
    }).join('\n');

    return `{${lines}}`;
  };

  try {
    return iter(tree);
  } catch (error) {
    console.error(error.message);
    return 'Error: Unknown type';
  }
};

export default getStylish;