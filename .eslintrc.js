module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        'no-console': 'off',
        'linebreak-style': 'off',
        'no-empty': 'off',
        'max-len': 'off',
        'import/extensions': 'off',
        'consistent-return': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'no-nested-ternary': 'off',
        'no-throw-literal': 'off',
        indent: ['warn', 4],
        'no-plusplus': 'off',
    },
};
