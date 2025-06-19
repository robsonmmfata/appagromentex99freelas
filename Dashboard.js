
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();

  // Dados simulados para o protótipo
  const dadosProducao = {
    areaTotal: '150 ha',
    areaPlantada: '120 ha',
    proximaColheita: '15 dias',
    umidadeSolo: '65%'
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Bem-vindo ao Agromentex</Text>

      {/* Resumo da Produção */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo da Produção</Text>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Área Total:</Text>
          <Text style={styles.metricValue}>{dadosProducao.areaTotal}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Área Plantada:</Text>
          <Text style={styles.metricValue}>{dadosProducao.areaPlantada}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Próxima Colheita:</Text>
          <Text style={styles.metricValue}>{dadosProducao.proximaColheita}</Text>
        </View>
        <View style={styles.metricRow}>
          <Text style={styles.metricLabel}>Umidade do Solo:</Text>
          <Text style={styles.metricValue}>{dadosProducao.umidadeSolo}</Text>
        </View>
      </View>

      {/* Botões para novas funcionalidades */}
      <View style={styles.card}>
        <Button
          title="Medição de Área Manual"
          onPress={() => navigation.navigate('MedicaoArea')}
          color="#2A5A3C"
        />
      </View>
      <View style={styles.card}>
        <Button
          title="Visualização Simples de NDVI"
          onPress={() => navigation.navigate('VisualizacaoNDVI')}
          color="#2A5A3C"
        />
      </View>

      {/* Mensagem de Status */}
      <View style={styles.statusCard}>
        <Text style={styles.statusText}>Sistema operando normalmente</Text>
      </View>
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
    backgroundColor: '#ffffff',
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
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#555',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2A5A3C',
  },
  statusCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statusText: {
    color: '#2A5A3C',
    fontSize: 14,
  }
});
