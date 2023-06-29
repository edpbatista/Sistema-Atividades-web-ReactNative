import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

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

  const handleVoltar = () => {
    navigation.navigate('Home'); // Navega de volta para a tela inicial
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
        <br></br>
        <TouchableOpacity style={styles.button} onPress={handleVoltar}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  inputContainer: {
    width: '300px',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5f',
    marginBottom: '16px',
    fontSize: '14px'
  },
  errorContainer: {
    color: 'red',
    marginBottom: 8,
    fontSize: '14px'
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
  error: {
    color: 'red',
    fontSize: 16,
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
  button: {
    width: '300px',
    padding: '12px',
    borderRadius: 4,
    backgroundColor: '#222',
    marginBottom: '16px',
    fontSize: '14px',
  },
  buttonText: {
    color: '#f5f5f5',
    fontSize: 14,
    textAlign: 'center',
  },
});
