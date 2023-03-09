import { test, expect } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const correctResult = readFixture('correctResult.txt');

test('json test', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');
  expect(genDiff(filePath1, filePath2)).toBe(correctResult);
});

test('yaml test', () => {
  const filePath1 = getFixturePath('filepath1.yaml');
  const filePath2 = getFixturePath('filepath2.yaml');
  expect(genDiff(filePath1, filePath2)).toBe(correctResult);
});
