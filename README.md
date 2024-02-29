### Hexlet tests and linter status:
[![Actions Status](https://github.com/cushog74/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/cushog74/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/62102a8551abe9e36f95/maintainability)](https://codeclimate.com/github/cushog74/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/62102a8551abe9e36f95/test_coverage)](https://codeclimate.com/github/cushog74/frontend-project-46/test_coverage)
[Deeploy badge]
[License]

Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.
https://ru.hexlet.io/programs/frontend/projects/46


Возможности утилиты:

Поддержка разных входных форматов: yaml, json
Генерация отчета в виде plain text, stylish и json

Требования:
Требуется node.js версия 13.2.0 и выше (проверить версию установленной node возможно командой в терминале node -v)

Установка:
1. Клонируйте данный репозиторий командой: git clone git@github.com:cushog74/frontend-project-46.git
2. Выполните установку командой: npm link


Аргументы и опции

node bin/gendiff -h 



Рекурсивное сравнение

bin/gendiff.js __fixtures__/filepath1.json __fixtures__/filepath2.json





Сравнение плоских файлов (JSON)

bin/gendiff.js __fixtures__/filepath1.json __fixtures__/filepath2.json



Сравнение плоских файлов (yaml)

bin/gendiff.js __fixtures__/filepath1.yaml __fixtures__/filepath2.yaml

![asciicast]


Плоский формат

node bin/gendiff -f plain  __fixtures__/filepath1.yaml __fixtures__/filepath2.yaml

![asciicast]


Вывод в json

bin/gendiff.js --format json __fixtures__/filepath1.json __fixtures__/filepath2.json

![asciicast]