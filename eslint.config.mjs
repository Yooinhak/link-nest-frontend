import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { 
    files: ['**/*.ts', '**/*.tsx'], 
    rules: {} // 필요한 룰 추가 가능
  },
  {
    ignores: ['.yarn/*', '.next/*'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json', // TypeScript 프로젝트 설정 파일 경로
        },
      },
    },
  },
];

export default eslintConfig;
