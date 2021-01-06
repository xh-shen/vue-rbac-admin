module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['plugin:vue/recommended', 'prettier', 'prettier/vue'],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [0], // 开启会影响 dev 环境打包速度
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'spaced-comment': [2, 'always'], // 注释风格要有空格
    'no-sparse-arrays': [2], // 禁止稀疏数组 [1,,2]
    'comma-dangle': [0], // 对象字面量项尾不能有逗号
    'vue/eqeqeq': [0],
    'vue/this-in-template': [0],
    'vue/attribute-hyphenation': [0],
    'vue/require-default-prop': [0],
    'vue/require-prop-types': [0],
    'vue/name-property-casing': [0],
    'vue/component-name-in-template-casing': [0]
  }
};
