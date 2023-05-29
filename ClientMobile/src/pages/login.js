import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (usuario === '' || senha === '') {
      setErro('Preencha todos os campos');
      return;
    }

    try {
      const response = await fetch('http://localhost:4003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          senha ,
        }),
      });
      

      const data = await response.json();

      console.log(data)

      if (data.success) {
        setErro('');
        Alert.alert('Login Bem Sucedido');
        navigation.navigate('HomeScreen'); // Redireciona para a página HomeScreen
      } else {
        setErro('Usuário ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro durante a requisição:', error);
      setErro('Ocorreu um erro durante o login');
    }    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Login</Text>
      <View style={styles.form}>
        <Text>Usuário:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          value={usuario}
          onChangeText={setUsuario}
        />
        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erro ? <Text style={styles.errorMessage}>{erro}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text>
        Se você ainda não possui uma conta, contate o administrador.
      </Text>
    </View>
  );
};

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
  form: {
    width: '80%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#222',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;
