import _ from 'lodash';

const сomparisonFile = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keysFile1, keysFile2));
  const result = keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, value: сomparisonFile(file1[key], file2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(file1, key)) {
      return { key, value: file2[key], type: 'added' };
    }
    if (!Object.hasOwn(file2, key)) {
      return { key, value: file1[key], type: 'deleted' };
    }
    if (file1[key] !== file2[key]) {
      return {
        key, value: file1[key], type: 'changed', newValue: file2[key],
      };
    }
    return { key, value: file1[key], type: 'unchanged' };
  });
  return result;
};

export default сomparisonFile;