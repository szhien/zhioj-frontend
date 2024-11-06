module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    "@babel/plugin-transform-private-methods", //TODO 配置mdEditor插件时加入的
    "@babel/plugin-transform-class-static-block", //TODO 配置MonacoEditor插件时加入的
  ],
};
