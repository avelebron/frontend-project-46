import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedJSON = readFixture('result_json.txt');
const expectedStylish = readFixture('result_stylish.txt');
const expectedPlain = readFixture('result_plain.txt');

const extensions = ['yaml', 'json'];

test.each([
  extensions,
])('genDiff tests', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
