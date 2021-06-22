module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    ignore: [new RegExp("d3-array/src/cumsum.js")],
    plugins: ["react-native-reanimated/plugin"],
  };
};
