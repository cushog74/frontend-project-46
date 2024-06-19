import _ from 'lodash';

const getType = (file1, file2, key) => {
  if (!Object.hasOwn(file1, key)) {
    return 'added';
  }
  if (!Object.hasOwn(file2, key)) {
    return 'deleted';
  }
  if (_.isObject(file1[key]) && _.isObject(file2[key])) {
    return 'nested';
  }
  if (file1[key] !== file2[key]) {
    return 'changed';
  }
  return 'unchanged';
};

const getValue = (file1, file2, key, type) => {
  switch (type) {
    case 'added':
      return file2[key];
    case 'deleted':
      return file1[key];
    case 'nested':
      return сomparisonFile(file1[key], file2[key]);
    case 'changed':
      return { oldValue: file1[key], newValue: file2[key] };
    default:
      return file1[key];
  }
};

const сomparisonFile = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keysFile1, keysFile2));

  return keys.map((key) => {
    const type = getType(file1, file2, key);
    const value = getValue(file1, file2, key, type);

    return type === 'changed'
      ? { key, type, ...value }
      : { key, value, type };
  });
};

export default сomparisonFile;
