import * as path from 'path';
import fs from 'node:fs';
import сomparisonFile from './getDiff.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const file1 = JSON.parse(readFile(filepath1));
  const file2 = JSON.parse(readFile(filepath2));
  return сomparisonFile(file1, file2);
};

export default genDiff;