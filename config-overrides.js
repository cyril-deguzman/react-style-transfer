const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config.plugins.push(new NodePolyfillPlugin());
  return config
}