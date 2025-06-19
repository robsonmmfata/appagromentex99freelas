
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroTalhao() {
  const [nomeTalhao, setNomeTalhao] = useState('');
  const [area, setArea] = useState('');
  const [cultura, setCultura] = useState('');
  const [talhoes, setTalhoes] = useState([]);

  const CHAVE_TALHOES = '@talhoes';

  useEffect(() => {
    const carregarTalhoes = async () => {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_TALHOES);
        if (dados) {
          setTalhoes(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os talhões salvos.');
      }
    };

    carregarTalhoes();
  }, []);

  const salvarTalhoes = async (novosTalhoes) => {
    try {
      await AsyncStorage.setItem(CHAVE_TALHOES, JSON.stringify(novosTalhoes));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os talhões.');
    }
  };

  const handleCadastro = () => {
    if (nomeTalhao && area && cultura) {
      const novoTalhao = {
        id: Date.now().toString(),
        nome: nomeTalhao,
        area: parseFloat(area),
        cultura
      };
      const novosTalhoes = [...talhoes, novoTalhao];
      setTalhoes(novosTalhoes);
      salvarTalhoes(novosTalhoes);
      setNomeTalhao('');
      setArea('');
      setCultura('');
    } else {
      Alert.alert('Atenção', 'Preencha todos os campos antes de cadastrar.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Cadastro de Talhões</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do Talhão</Text>
          <TextInput
            style={styles.input}
            value={nomeTalhao}
            onChangeText={setNomeTalhao}
            placeholder="Ex: Talhão Norte"
          />

          <Text style={styles.label}>Área (hectares)</Text>
          <TextInput
            style={styles.input}
            value={area}
            onChangeText={setArea}
            placeholder="Ex: 5.2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Cultura Principal</Text>
          <TextInput
            style={styles.input}
            value={cultura}
            onChangeText={setCultura}
            placeholder="Ex: Soja, Milho"
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleCadastro}
          >
            <Text style={styles.buttonText}>Cadastrar Talhão</Text>
          </TouchableOpacity>
        </View>

        {talhoes.length > 0 && (
          <View style={styles.listaContainer}>
            <Text style={styles.subtitle}>Talhões Cadastrados</Text>
            {talhoes.map(talhao => (
              <View key={talhao.id} style={styles.talhaoCard}>
                <Text style={styles.talhaoNome}>{talhao.nome}</Text>
                <Text>Área: {talhao.area} hectares</Text>
                <Text>Cultura: {talhao.cultura}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2A5A3C',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A5A3C',
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  label: {
    fontSize: 14,
    color: '#2A5A3C',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2A5A3C',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listaContainer: {
    marginTop: 20,
  },
  talhaoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  talhaoNome: {
    fontWeight: '600',
    color: '#2A5A3C',
    marginBottom: 5,
  },
});
