import { test, expect } from '@jest/globals';

import genDiff from '../bin/gendiff.js';
const compare = genDiff();

import { fileURLToPath } from 'url';
import { dirname, path } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('first test', () => {
  expect(compare(getFixturePath('file1'), getFixturePath('file2'))).toBe('...');
});