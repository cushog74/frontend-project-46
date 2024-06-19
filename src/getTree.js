import _ from 'lodash';

const сomparisonFile = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keysFile1, keysFile2));

  return keys.map((key) => {
    let type;
    let value;

    if (!Object.hasOwn(file1, key)) {
      type = 'added';
      value = file2[key];
    } else if (!Object.hasOwn(file2, key)) {
      type = 'deleted';
      value = file1[key];
    } else if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      type = 'nested';
      value = сomparisonFile(file1[key], file2[key]);
    } else if (file1[key] !== file2[key]) {
      type = 'changed';
      value = { oldValue: file1[key], newValue: file2[key] };
    } else {
      type = 'unchanged';
      value = file1[key];
    }

    return type === 'changed'
      ? { key, type, value: value.oldValue, newValue: value.newValue }
      : { key, type, value };
  });
};

export default сomparisonFile;
