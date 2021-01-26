import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Login: "login",
      HomePage:"home",
      SelectedBook:"book",
      NotFound: '*',
    },
  },
};
