import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    textAlign: 'center'
  },
  menu: {
    width: 350,
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuLi: {
    marginBottom: 10,
  },
  menuLink: {
    display: 'flex',
    color: '#fff',
    textDecorationLine: 'none',
    padding: 10,
    borderRadius: 5,
    transitionDuration: 0.3,
  },
  menuLinkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    textAlign: 'center',
    marginBottom: 20,
  },
  logoLink: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'none',
  },
  contentHome: {
    marginLeft: 300,
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default styles;
