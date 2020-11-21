module.exports = {
    preset: 'jest-expo',
    //setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native"
      + "|react-navigation-tabs"
      + "|react-native-splash-screen"
      + "|react-native-screens"
      + "|react-native-reanimated"
    + ")/)",
  ],
  verbose: false
};