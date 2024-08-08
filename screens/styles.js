import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  downloadButton: {
    marginTop: 20,
    backgroundColor: '#0965ef',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
});
