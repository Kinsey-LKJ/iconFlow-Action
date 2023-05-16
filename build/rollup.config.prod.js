process.env.NODE_ENV = 'production';

const terser = require('@rollup/plugin-terser');

const configList = require('./rollup.config');

module.exports = configList.map((config, index) => {
  return {
    ...config,
    output: {
      ...config.output,
      sourcemap: false,
    },
    plugins: [
      ...config.plugins,
      terser() // 添加 terser 插件
    ]
  };
});
