### Hexlet tests and linter status:
[![Actions Status](https://github.com/cushog74/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/cushog74/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/62102a8551abe9e36f95/maintainability)](https://codeclimate.com/github/cushog74/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/62102a8551abe9e36f95/test_coverage)](https://codeclimate.com/github/cushog74/frontend-project-46/test_coverage)

# Description

Difference Calculator is a program that determines the difference between two data structures.

# Installation:

```
 $ make install

 $ npm link
```
System requirements :

```
 Node.js 21

 npm 10
```

# Usage example :

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```


## stylish comparison :
```
gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json
```
or
```
gendiff __fixtures__/file1.json __fixtures__/file2.json
```
![asciicast]

## plain comparison :
```
gendiff -f plain __fixtures__/file1.json __fixtures__/file2.json
```
![asciicast]

## json comparison :
```
gendiff -f json __fixtures__/file1.json __fixtures__/file2.json
```
![asciicast]
