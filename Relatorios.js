
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

export default function Relatorios() {
  const screenWidth = Dimensions.get('window').width - 20;
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mensal');

  const botoesPeriodo = [
    { id: 'mensal', label: 'Mensal' },
    { id: 'trimestral', label: 'Trimestral' },
    { id: 'anual', label: 'Anual' }
  ];

  const handleExportar = async () => {
    try {
      Alert.alert('Sucesso', 'Relatório exportado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao exportar relatório');
    }
  };

  const produtividadeData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{ data: [2.5, 3.0, 3.8, 3.2, 4.0, 3.5], strokeWidth: 2 }]
  };

  const custoData = {
    labels: ['Adubo', 'Sementes', 'Mão de obra', 'Combustível'],
    datasets: [{ data: [1200, 800, 950, 400] }]
  };

  const culturaData = [
    { name: 'Soja', population: 45, color: '#2A5A3C', legendFontColor: '#2A5A3C', legendFontSize: 14 },
    { name: 'Milho', population: 35, color: '#76B95E', legendFontColor: '#2A5A3C', legendFontSize: 14 },
    { name: 'Trigo', population: 20, color: '#A5D6A7', legendFontColor: '#2A5A3C', legendFontSize: 14 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Relatórios de Produção</Text>

      {/* Filtro de período */}
      <View style={styles.filtroContainer}>
        {botoesPeriodo.map((periodo) => (
          <TouchableOpacity
            key={periodo.id}
            style={[
              styles.botaoFiltro,
              periodoSelecionado === periodo.id && styles.botaoFiltroAtivo
            ]}
            onPress={() => setPeriodoSelecionado(periodo.id)}
          >
            <Text style={periodoSelecionado === periodo.id ? styles.botaoFiltroTextoAtivo : styles.botaoFiltroTexto}>
              {periodo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Produtividade (toneladas/hectare)</Text>
      <LineChart
        data={produtividadeData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Custos por categoria (R$)</Text>
      <BarChart
        data={custoData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.subtitle}>Distribuição de culturas</Text>
      <PieChart
        data={culturaData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        style={styles.chart}
      />

      <TouchableOpacity style={styles.botaoExportar} onPress={handleExportar}>
        <Text style={styles.botaoExportarTexto}>Exportar Relatório</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#f5f9f7",
  backgroundGradientTo: "#f5f9f7",
  color: (opacity = 1) => `rgba(42, 90, 60, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(42, 90, 60, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A5A3C',
    textAlign: 'center',
    marginVertical: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2A5A3C',
    marginTop: 15,
    marginBottom: 5
  },
  chart: {
    borderRadius: 8,
    marginBottom: 15
  },
  filtroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  botaoFiltro: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2A5A3C',
    marginHorizontal: 5,
  },
  botaoFiltroAtivo: {
    backgroundColor: '#2A5A3C',
  },
  botaoFiltroTexto: {
    color: '#2A5A3C',
    fontWeight: '500',
  },
  botaoFiltroTextoAtivo: {
    color: '#fff',
    fontWeight: '600',
  },
  botaoExportar: {
    backgroundColor: '#2A5A3C',
    marginTop: 20,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  botaoExportarTexto: {
    color: '#fff',
    fontWeight: '600',
  }
});
