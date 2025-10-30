module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@": "./src",
          src: "./src"
        }
      }
    ],
    '@babel/plugin-transform-export-namespace-from',
  ]
};
