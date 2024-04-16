import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  dropdown: {
    height: 42,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  loading: {
    marginTop: 36,
  },
  supportedLines: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 12,
    justifyContent: 'center',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginBottom: 12,
  },
});

export default styles;
