#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(`Путь к первому файлу: ${filepath1}`);
    console.log(`Путь ко второму файлу: ${filepath2}`);
    const result = gendiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse(process.argv);
