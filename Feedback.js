import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert, ScrollView,
  RefreshControl, Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const textos = {
  titulo: 'Deixe sua avaliação',
  placeholder: 'Digite seu feedback aqui...',
  sucesso: 'Obrigado pelo seu feedback!',
  erroSalvar: 'Não foi possível enviar seu feedback',
  erroCarregar: 'Erro ao carregar histórico.',
  alertaVazio: 'Por favor, digite seu feedback',
  alertaCurto: 'Por favor, digite pelo menos 10 caracteres',
  historico: 'Histórico de Feedbacks'
};

const MAX_CARACTERES = 500;
const CHAVE_ARMAZENAMENTO = '@feedback';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [historico, setHistorico] = useState([]);
  const [caracteresRestantes, setCaracteresRestantes] = useState(MAX_CARACTERES);
  const [enviando, setEnviando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  const loadHistorico = async () => {
    try {
      const saved = await AsyncStorage.getItem(CHAVE_ARMAZENAMENTO);
      if (saved) {
        const historicoOrdenado = JSON.parse(saved)
          .sort((a, b) => new Date(b.data) - new Date(a.data));
        setHistorico(historicoOrdenado);
      }
    } catch (e) {
      console.error(textos.erroCarregar, e);
      setErro(textos.erroCarregar);
    }
  };

  useEffect(() => {
    loadHistorico();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadHistorico();
    setRefreshing(false);
  }, []);

  const saveFeedback = async () => {
    setErro(null);
    if (!feedback.trim()) {
      Alert.alert('Aviso', textos.alertaVazio);
      return;
    }
    if (feedback.trim().length < 10) {
      setErro(textos.alertaCurto);
      return;
    }

    setEnviando(true);
    try {
      const novoItem = {
        texto: feedback,
        data: new Date().toISOString()
      };
      const novoHistorico = [novoItem, ...historico];
      await AsyncStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(novoHistorico));
      setHistorico(novoHistorico);
      setFeedback('');
      setCaracteresRestantes(MAX_CARACTERES);
      Alert.alert('Sucesso', textos.sucesso);
    } catch (e) {
      console.error(textos.erroSalvar, e);
      setErro(textos.erroSalvar);
    }
    setEnviando(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textos.titulo}</Text>

      <TextInput
        style={styles.input}
        value={feedback}
        onChangeText={(text) => {
          setFeedback(text);
          setCaracteresRestantes(MAX_CARACTERES - text.length);
        }}
        placeholder={textos.placeholder}
        multiline
        maxLength={MAX_CARACTERES}
        accessibilityLabel="Campo de feedback"
        accessibilityHint="Digite seu feedback com até 500 caracteres"
      />

      <Text style={[
        styles.contador,
        caracteresRestantes < 50 && { color: '#e74c3c', fontWeight: 'bold' }
      ]}>
        {caracteresRestantes}/{MAX_CARACTERES} caracteres restantes
      </Text>

      {erro && (
        <View style={styles.erroContainer}>
          <MaterialCommunityIcons name="alert-circle" size={20} color="#e74c3c" />
          <Text style={styles.erroText}>{erro}</Text>
        </View>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          (!feedback.trim() || enviando) && styles.buttonDisabled
        ]}
        onPress={saveFeedback}
        disabled={!feedback.trim() || enviando}
      >
        <Text style={styles.buttonText}>
          {enviando ? 'Enviando...' : 'Enviar Feedback'}
        </Text>
      </Pressable>

      {historico.length > 0 && (
        <>
          <Text style={styles.subtitle}>{textos.historico}</Text>
          <ScrollView
            style={styles.historicoContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#2A5A3C']}
              />
            }
          >
            {historico.map((item, index) => (
              <FeedbackItem key={index} item={item} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const FeedbackItem = React.memo(({ item }) => (
  <View style={styles.feedbackItem}>
    <Text style={styles.feedbackText}>{item.texto}</Text>
    <Text style={styles.feedbackDate}>
      {new Date(item.data).toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      })}
    </Text>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A5A3C',
    marginBottom: 15,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A5A3C',
    marginTop: 25,
    marginBottom: 10
  },
  input: {
    minHeight: 120,
    borderColor: '#76B95E',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    textAlignVertical: 'top'
  },
  contador: {
    color: '#76B95E',
    textAlign: 'right',
    marginBottom: 15
  },
  erroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10
  },
  erroText: {
    color: '#e74c3c',
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#2A5A3C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonPressed: {
    opacity: 0.8
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  historicoContainer: {
    flex: 1
  },
  feedbackItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2A5A3C'
  },
  feedbackText: {
    color: '#333',
    fontSize: 16,
    marginBottom: 5
  },
  feedbackDate: {
    color: '#76B95E',
    fontSize: 12,
    textAlign: 'right'
  }
});
