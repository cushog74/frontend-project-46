import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (filepath) => {
  const fullPath = path.join(__dirname, '..', '__fixtures__', filepath);
  console.log(`Путь к файлу: ${fullPath}`); // Вывод лога для отладки
  return fullPath;
};

const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getString = (data) => String(data).trim();

const files = [['filepath1.json', 'filepath2.json'], ['filepath1.yaml', 'filepath2.yaml'], ['filepath1.yml', 'filepath2.yml']];

test.each(files)('gendiff for "stylish" format', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const result = readFile('resultstylish.txt');
  expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(getString(result));
});

test.each(files)('gendiff for "plain" format', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const result = readFile('resultplain.txt');
  expect(gendiff(filepath1, filepath2, 'plain')).toEqual(getString(result));
});

test.each(files)('gendiff for "json" format', (file1, file2) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const result = readFile('resultjson.txt');
  expect(getString(gendiff(filepath1, filepath2, 'json'))).toEqual(getString(result));
});
