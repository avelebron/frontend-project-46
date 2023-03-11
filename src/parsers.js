import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load
};

export default (data, format) => {
  if (!Object.hasOwn(parsers, format)) {
    throw new Error(`Format ${format} - unsupported.`);
  }
  return parsers[format](data);
};
