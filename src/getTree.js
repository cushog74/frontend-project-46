import _ from 'lodash';

const сomparisonFile = (file1, file2) => {
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keysFile1, keysFile2));

  return keys.map((key) => {
    const type = !Object.hasOwn(file1, key) ? 'added' :
                 !Object.hasOwn(file2, key) ? 'deleted' :
                 _.isObject(file1[key]) && _.isObject(file2[key]) ? 'nested' :
                 file1[key] !== file2[key] ? 'changed' :
                 'unchanged';

    const value = type === 'nested' ? сomparisonFile(file1[key], file2[key]) :
                  type === 'added' ? file2[key] :
                  type === 'deleted' ? file1[key] :
                  type === 'changed' ? { oldValue: file1[key], newValue: file2[key] } :
                  file1[key];

    return { key, type, ...(type === 'changed' && { value: value.oldValue, newValue: value.newValue }), ...(type !== 'changed' && { value }) };
  });
};

export default сomparisonFile;
