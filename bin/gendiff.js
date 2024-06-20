import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js'; // Функция для парсинга данных
import format from './formatters/index.js'; // Функция для форматирования результата

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filepath1));
  const data2 = parse(readFile(filepath2));

  // Функция для сравнения данных
  const diff = compare(data1, data2);

  // Возвращаем отформатированный результат
  return format(diff, formatName);
};

// Функция для сравнения данных (примерная реализация)
const compare = (data1, data2) => {
  // Ваш код для сравнения данных и создания структуры с различиями
};

export default gendiff;
