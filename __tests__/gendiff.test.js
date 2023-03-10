import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedJSON = readFixture('resultJSON.txt');
const expectedStylish = readFixture('resultStylish.txt');
const expectedPlain = readFixture('resultPLAIN.txt');

const extensions = ['yaml', 'json'];

test.each([
  extensions,
])('test', (extension) => {
  const filepath1 = getFixturePath(`before.${extension}`);
  const filepath2 = getFixturePath(`after.${extension}`);

  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(genDiff(filepath1, filepath2, 'json')).toBe(expectedJSON);
});
