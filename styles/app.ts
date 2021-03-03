import { StyleSheet } from 'react-native';

export const app = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    // backgroundColor: 'lemonchiffon', // TESTING PURPOSE
    justifyContent: 'center',
  },

  htmlColorName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16
  },

  htmlColor: {
    fontSize: 20,
    letterSpacing: 2,
  },

  description: {
    marginVertical: 16,
    fontStyle: 'italic',
    opacity: .5,
  },

  settingsButton: {
    fontSize: 18,
    opacity: .8,

  },

  growingCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
  }
});

export const settings = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    // backgroundColor: 'lemonchiffon', // TESTING PURPOSE
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    marginRight: 8,
  },

  label: {
    fontSize: 18,
  }
})