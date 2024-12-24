module.exports ={
    "singleQuote": true,
    "parser": "typescript",
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "printWidth": 120,
    "arrowParens": "always",

    "plugins": [require.resolve("@trivago/prettier-plugin-sort-imports")],
    "importOrder": [
        "^[a-z]",
        "^@components/(.*)$",
        "^@hooks/(.*)$",
        "^\\.{1,2}/"
    ],
    "importOrderSeparation": true,
    "importOrderSortSpecifiers": true
}