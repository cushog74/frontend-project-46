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
  const conditions = keys.filter((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isEqual(value1, value2)) {
      return false;
    }
    return true;
  });

  const differences = conditions.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isUndefined(data2[key])) {
      return { key, value1, status: 'deleted' };
    }
    if (_.isUndefined(data1[key])) {
      return { key, value2, status: 'added' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: compareFiles(value1, value2), status: 'nested' };
    }
    return { key, value1, value2, status: 'changed' };
  });

  return differences;
};

export default compareFiles;