
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function DadosLavoura() {
  const [dadosSolo] = useState({
    ph: 6.2,
    nitrogenio: 'Médio',
  });

  const [dadosClima, setDadosClima] = useState({
    temperatura: '28°C',
    umidade: '60%',
    previsao: 'Sol com poucas nuvens',
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDadosClima((prev) => ({
        ...prev,
        temperatura: `${Math.floor(Math.random() * 5) + 26}°C`,
      }));
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Dados da Terra</Text>

      {/* Dados do Solo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Terra (Solo)</Text>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="vial" size={16} color="#2A5A3C" />
            <Text style={styles.label}> ACIDEZ (PH):</Text>
          </View>
          <Text style={[
            styles.value,
            { color: dadosSolo.ph >= 6 && dadosSolo.ph <= 7 ? '#2A5A3C' : '#EA702D' }
          ]}>
            {dadosSolo.ph} {dadosSolo.ph < 6 ? '(Ácido)' : dadosSolo.ph > 7 ? '(Alcalino)' : '(Ideal)'}
          </Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.label}>FERTILIDADE (NITROGÊNIO): {dadosSolo.nitrogenio}</Text>
          <View style={{ height: 8, backgroundColor: '#e0e0e0', borderRadius: 4 }}>
            <View style={{
              width: dadosSolo.nitrogenio === 'Baixo' ? '30%' :
                    dadosSolo.nitrogenio === 'Médio' ? '60%' : '90%',
              height: '100%',
              backgroundColor: '#2A5A3C',
              borderRadius: 4
            }} />
          </View>
        </View>
      </View>

      {/* Dados do Clima */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Clima</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Temperatura:</Text>
          <Text style={styles.value}>{dadosClima.temperatura}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Umidade:</Text>
          <Text style={styles.value}>{dadosClima.umidade}</Text>
        </View>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons 
              name={dadosClima.previsao.includes('Sol') ? 'wb-sunny' : 'cloud'} 
              size={18} 
              color="#EA702D" 
            />
            <Text style={styles.label}> Previsão:</Text>
          </View>
          <Text style={styles.value}>{dadosClima.previsao}</Text>
        </View>
      </View>

      {/* Recomendações */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recomendações</Text>
        <Text style={styles.value}>• Adubar com NPK 10-20-10</Text>
        <Text style={styles.value}>• Irrigar no final da tarde</Text>
      </View>

      <TouchableOpacity 
        style={styles.botaoAtualizar} 
        onPress={() => alert('Dados atualizados!')}
      >
        <Text style={styles.botaoTexto}>Atualizar Agora</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9f7',
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2A5A3C',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A5A3C',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  botaoAtualizar: {
    backgroundColor: '#EA702D',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },
});
