import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:4003/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoltar = () => {
    navigation.navigate('HomeScreen'); // Redireciona para a página inicial
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4003/usuario/${id}`, {
        method: 'DELETE',
      });
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (value, id, fieldName) => {
    setUsuarios((prevState) =>
      prevState.map((usuario) =>
        usuario.id === id ? { ...usuario, [fieldName]: value } : usuario
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const usuario = usuarios.find((usuario) => usuario.id === id);
      await fetch(`http://localhost:4003/usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelarEdicao = () => {
    setEditingId(null);
  };

  const handleEditar = (id) => {
    setEditingId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nome</Text>
          <Text style={styles.tableHeader}>Nome de Usuário</Text>
          <Text style={styles.tableHeader}>Ações</Text>
        </View>
        {usuarios.map((usuario) => (
          <View style={styles.tableRow} key={usuario.id}>
            <View style={styles.tableCell}>
              {editingId === usuario.id ? (
                <TextInput
                  style={styles.input}
                  value={usuario.nome}
                  onChangeText={(value) => handleInputChange(value, usuario.id, 'nome')}
                />
              ) : (
                <Text>{usuario.nome}</Text>
              )}
            </View>
            <View style={styles.tableCell}>
              {editingId === usuario.id ? (
                <TextInput
                  style={styles.input}
                  value={usuario.nomeDeUsuario}
                  onChangeText={(value) => handleInputChange(value, usuario.id, 'nomeDeUsuario')}
                />
              ) : (
                <Text>{usuario.nomeDeUsuario}</Text>
              )}
            </View>
            <View style={styles.tableCell}>
              {editingId === usuario.id ? (
                <React.Fragment>
                  <TouchableOpacity style={styles.button} onPress={() => handleSalvar(usuario.id)}>
                    <Text style={styles.buttonText}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSpace]}
                    onPress={handleCancelarEdicao}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <TouchableOpacity style={styles.button} onPress={() => handleEditar(usuario.id)}>
                    <Text style={styles.buttonText}>Alterar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSpace]}
                    onPress={() => handleDelete(usuario.id)}
                  >
                    <Text style={styles.buttonText}>Deletar</Text>
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </View>
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.buttonVoltar} onPress={handleVoltar}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
  },
  tableCell: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonSpace: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonVoltar: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});

export default ListarUsuarios;
