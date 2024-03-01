import _ from 'lodash';

const getSortedKeys = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys;
};

const compareFiles = (data1, data2) => {
  const keys = getSortedKeys(data1, data2);

  const differences = keys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (value1 !== value2) {
      acc[key] = { value1, value2 };
    }

    return acc;
  }, {});

  return differences;
};

export default compareFiles;