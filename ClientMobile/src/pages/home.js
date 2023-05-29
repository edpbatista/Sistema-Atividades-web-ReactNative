import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/styles';


export default function HomeScreen() {
  const navigation = useNavigation();

  const handleNavigateToActivity = () => {
    navigation.navigate('CreateAtividade');
  };
  const handleNavigateToCadastroUsuario = () => {
    navigation.navigate('CadastroUsuario');
  };
  const handleNavigateToListaAtividades = () => {
    navigation.navigate('ListarAtividades');
  };
  const handleNavigateToListaUsuario = () => {
    navigation.navigate('ListarUsuarios');
  };

  return (
    <View style={styles.containerHome}>
      <View style={styles.menu}>
        <View style={styles.logo}>
          <Text style={styles.logoLink}>Sistema de atividades</Text>
        </View>
        <View style={styles.menuUl}>
          <View style={styles.menuLi}>
          <TouchableOpacity style={styles.menuLink} onPress={handleNavigateToListaAtividades}>
            <Text style={styles.menuLinkText}>Lista Atividade</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuLi}>
          <TouchableOpacity style={styles.menuLink} onPress={handleNavigateToListaUsuario}>
            <Text style={styles.menuLinkText}>Lista Usuário</Text>
          </TouchableOpacity>
        </View> 
          <View style={styles.menuLi}>
            <TouchableOpacity style={styles.menuLink} onPress={handleNavigateToActivity}>
              <Text style={styles.menuLinkText}>Cadastro de Atividade</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuLi}>
            <TouchableOpacity style={styles.menuLink} onPress={handleNavigateToCadastroUsuario}>
              <Text style={styles.menuLinkText}>Cadastrar Usuário</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuLi}>
            <TouchableOpacity style={styles.menuLink} onPress={() => navigation.goBack()}>
              <Text style={styles.menuLinkText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
