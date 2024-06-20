import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareFiles from './comparefiles.js';
import parse from './parse.js';
import choiceFormat from './formatters/index.js';

const getFileType = (filepath) => path.extname(filepath).slice(1);
const getFilePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => readFileSync(getFilePath(filepath), 'utf-8');
const dataParse = (filepath, ext) => parse(filepath, ext);

const gendiff = (filePath1, filePath2, format = 'stylish') => {
  const ext1 = getFileType(filePath1);
  const path1 = getFilePath(filePath1);
  const data1 = readFile(path1);

  const ext2 = getFileType(filePath2);
  const path2 = getFilePath(filePath2);
  const data2 = readFile(path2);

  const parseData1 = dataParse(data1, ext1);
  const parseData2 = dataParse(data2, ext2);
  const diff = compareFiles(parseData1, parseData2);
  return choiceFormat(diff, format);
};

export default gendiff;
