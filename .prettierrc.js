module.exports = {
  singleQuote: true,
  parser: 'typescript',
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  arrowParens: 'always',

  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^(react|next)', '<THIRD_PARTY_MODULES>', '^(components|utils)(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
