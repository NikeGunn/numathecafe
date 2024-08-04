import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 120,
  },
  centeredContainer: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 600,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  cardActions: {
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
