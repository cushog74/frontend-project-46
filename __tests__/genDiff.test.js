import url from 'url';
import path from 'path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFilePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

const expectedStylish = readFile('resultStylish.txt');
const expectedPlain = readFile('resultPlain.txt');
const expectedJson = readFile('resultJson.txt');

test.each([
  ['stylish', 'two json files', 'file1.json', 'file2.json', expectedStylish],
  ['stylish', 'two yml files', 'filepath1.yml', 'filepath2.yml', expectedStylish],
  ['stylish', 'yaml and json files', 'filepath1.yaml', 'file2.json', expectedStylish],
  ['plain', 'two json files', 'file1.json', 'file2.json', expectedPlain],
  ['plain', 'two yml files', 'filepath1.yml', 'filepath2.yml', expectedPlain],
  ['json', 'two json files', 'file1.json', 'file2.json', expectedJson],
  ['json', 'two yml files', 'filepath1.yml', 'filepath2.yml', expectedJson],
])('%s comparsion %s', (format, nameTest, file1, file2, expected) => {
  expect(genDiff(getFilePath(file1), getFilePath(file2), format)).toBe(expected);
});