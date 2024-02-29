import YAML from 'yaml';

const parsing = {
  json: JSON.parse,
  yaml: YAML.parse,
  yml: YAML.parse,
};

export default (filepath, ext) => {
  try {
    return parsing[ext](filepath);
  } catch (error) {
    throw new Error(`Unknown format ${ext}!`);
  }
};