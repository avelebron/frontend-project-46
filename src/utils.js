import fs from 'fs';
import path from 'path';
import process from 'process';

export default (file) => fs.readFileSync(path.resolve(process.cwd(), '__fixtures__', file), 'utf-8');