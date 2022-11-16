module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx",
          ],
          alias: {
            screens: "./src/screens",
            core: "./src/core",
            components: "./src/components",
            helpers: "./src/helpers",
            assets: "./src/assets",
          },
        },
      ],
    ],
  };
};
