import _ from 'lodash';

const сomparisonFile = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const keys = _.union(keysFile1, keysFile2).sort();
  const result = keys.reduce((acc, key) => {
    if (Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        return `${acc}\n    ${key}: ${file1[key]}`;
      } if (!Object.hasOwn(file1, key)) {
        return `${acc}\n  + ${key}: ${file2[key]}`;
      }
      return `${acc}\n  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
    }
    return `${acc}\n  - ${key}: ${file1[key]}`;
  }, '');

  return `{${result}\n}`;
};

export default сomparisonFile;