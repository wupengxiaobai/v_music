module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 方法前空格检测
    'space-before-function-paren': 0,
    // 缩进检测
    'indent': 0,
    "semi": 0, //语句强制分号结尾
    "quotes": 0, // 引号
    "spaced-comment": 0, //  '//'空格
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
