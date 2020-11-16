module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    /* 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', */
    'no-console': 'off',
    'no-debugger':'off',
    "no-irregular-whitespace":"off",
    "prettier/prettier": "off",
    //关闭严格检查模式
    "no-console": "off",
    "no-unused-vars":"off", //重要 var 变量为引入
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  }
}
