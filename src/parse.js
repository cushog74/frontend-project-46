import yaml from 'js-yaml';

export default (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};
