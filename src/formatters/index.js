import plain from './plain.js';
import stylish from './stylish.js';

export default (diffTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diffTree);
    case 'plain':
      return plain(diffTree);
    case 'json':
      return JSON.stringify(diffTree, null, ' ');
    default:
      throw new Error(`Unknown format! ${format}`);
  }
};
