const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    return typeof value === 'string' ? `'${value}'` : value;
  };
  
  const genDiff = (file1, file2, format) => {
    // ... ваша логика сравнения файлов ...
    // Предположим, что `diff` - это результат сравнения
  
    const formattedDiff = diff.map(({ key, type, value, newValue }) => {
      const formattedValue = formatValue(value);
      const formattedNewValue = formatValue(newValue);
      switch (type) {
        case 'added':
          return `Property '${key}' was added with value: ${formattedValue}`;
        case 'deleted':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${formattedValue} to ${formattedNewValue}`;
        // ... другие случаи ...
        default:
          return `Property '${key}' is unchanged`;
      }
    }).join('\n');
  
    return formattedDiff;
  };
