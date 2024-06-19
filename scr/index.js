import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import fs from 'node:fs';
import getTree from './getTree.js';
import getFormatDiff from './formaters/index.js';
import getParseFile from './parsers.js';

const readFile = (filepath) => fs.readFileSync(resolve(cwd(), filepath), 'utf-8');
const getFormat = (filepath) => extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1 = getParseFile(readFile(filepath1), getFormat(filepath1));
  const file2 = getParseFile(readFile(filepath2), getFormat(filepath2));
  const getDiffTree = getTree(file1, file2);
  const result = getFormatDiff(getDiffTree, format);

  return result;
};

export default genDiff;