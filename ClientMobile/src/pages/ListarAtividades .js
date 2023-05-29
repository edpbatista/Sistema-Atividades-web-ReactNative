import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ListarAtividades = () => {
  const [atividades, setAtividades] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAtividades();
  }, []);

  const fetchAtividades = async () => {
    try {
      const response = await fetch('http://localhost:4003/atividade');
      const data = await response.json();
      setAtividades(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoltar = () => {
   Navegation.navigate('HomeScreen'); // Redireciona para a página inicial
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4003/atividade/${id}`, {
        method: 'DELETE',
      });
      fetchAtividades();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (value, id, fieldName) => {
    setAtividades((prevState) =>
      prevState.map((atividade) =>
        atividade.id === id ? { ...atividade, [fieldName]: value } : atividade
      )
    );
  };

  const handleSalvar = async (id) => {
    try {
      const atividade = atividades.find((atividade) => atividade.id === id);
      await fetch(`http://localhost:4003/atividade/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(atividade),
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
      <Text style={styles.title}>Lista de Atividades</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Nome</Text>
          <Text style={styles.tableHeader}>Data</Text>
          <Text style={styles.tableHeader}>Ações</Text>
        </View>
        {atividades.map((atividade) => (
          <View style={styles.tableRow} key={atividade.id}>
            <View style={styles.tableCell}>
              {editingId === atividade.id ? (
                <TextInput
                  style={styles.input}
                  value={atividade.nome}
                  onChangeText={(value) => handleInputChange(value, atividade.id, 'nome')}
                />
              ) : (
                <Text>{atividade.nome}</Text>
              )}
            </View>
            <View style={styles.tableCell}>
              {editingId === atividade.id ? (
                <TextInput
                  style={styles.input}
                  value={atividade.data}
                  onChangeText={(value) => handleInputChange(value, atividade.id, 'data')}
                />
              ) : (
                <Text>{atividade.data}</Text>
              )}
            </View>
            <View style={styles.tableCell}>
              {editingId === atividade.id ? (
                <React.Fragment>
                  <TouchableOpacity style={styles.button} onPress={() => handleSalvar(atividade.id)}>
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
                  <TouchableOpacity style={styles.button} onPress={() => handleEditar(atividade.id)}>
                    <Text style={styles.buttonText}>Alterar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonSpace]}
                    onPress={() => handleDelete(atividade.id)}
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

export default ListarAtividades;
