import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJSON from './json.js';

export default (data, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    case 'json':
      return formatJSON(data);
    default:
      throw new Error(`Error: Unknown type: ${format}`);
  }
};