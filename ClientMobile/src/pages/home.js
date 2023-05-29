import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleNavigateToActivity = () => {
    navigation.navigate('CreateAtividade');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à tela Home!</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigateToActivity}>
        <Text style={styles.buttonText}>Criar Atividade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
