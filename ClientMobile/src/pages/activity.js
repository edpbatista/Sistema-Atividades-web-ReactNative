import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateAtividade() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage('');
    setNome('');
    setData('');
  };

  const handleError = (error) => {
    console.error(error);
    setErrorMessage('Ocorreu um erro ao criar a atividade. Por favor, tente novamente.');
    setSuccessMessage('');
  };

  const handleSubmit = async () => {
    try {
      // Fazer a requisição HTTP para criar a atividade
      // Substitua a URL pela sua rota correta
      const response = await fetch('http://localhost:4003/atividade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          data,
        }),
      });

      const responseData = await response.json();

      console.log(responseData);
      handleSuccess('Atividade criada com sucesso!');
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Atividade</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            placeholder="Data"
            value={data}
            onChangeText={setData}
          />
        </View>
        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        <Button style={styles.button} title="Criar" onPress={handleSubmit} />
        <br></br>
        <Button style={styles.button} title="Voltar" onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  button: {
    width: 300,
    padding: 12,
    borderRadius: 4,
    backgroundColor: '#222',
    color: '#fff',
    fontSize: 16,
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
    fontSize: 14,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    marginTop: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 16,
  },
});
