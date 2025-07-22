import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Button,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { OPENWEATHER_API_KEY } from './config';

export default function Dashboard() {
  const navigation = useNavigation();

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [productionData, setProductionData] = useState(null);
  const [loadingProduction, setLoadingProduction] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Coordenadas fixas para exemplo (Brasília)
        const lat = -15.7801;
        const lon = -47.9292;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${OPENWEATHER_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Erro ao buscar previsão do tempo:', error);
      } finally {
        setLoadingWeather(false);
      }
    };

    const fetchProductionData = async () => {
      try {
        // TODO: Substituir pela URL real da API de dados de produção
        const response = await fetch('https://api.real-de-producao.com/summary');
        if (!response.ok) {
          console.error('Erro na resposta da API de produção:', response.status);
          setProductionData(null);
          return;
        }
        const data = await response.json();
        console.log('Dados de produção recebidos:', data);
        setProductionData(data);
      } catch (error) {
        console.error('Erro ao buscar dados de produção:', error);
        setProductionData(null);
      } finally {
        setLoadingProduction(false);
      }
    };

    fetchWeather();
    fetchProductionData();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Bem-vindo ao Agromentex</Text>

      {/* Resumo da Produção */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo da Produção</Text>
        {loadingProduction ? (
          <ActivityIndicator size="small" color="#2A5A3C" />
        ) : productionData ? (
          <>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Área Total:</Text>
              <Text style={styles.metricValue}>{productionData.areaTotal}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Área Plantada:</Text>
              <Text style={styles.metricValue}>{productionData.areaPlantada}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Próxima Colheita:</Text>
              <Text style={styles.metricValue}>{productionData.proximaColheita}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Umidade do Solo:</Text>
              <Text style={styles.metricValue}>{productionData.umidadeSolo}</Text>
            </View>
          </>
        ) : (
          <Text>Não foi possível carregar os dados de produção.</Text>
        )}
      </View>

      {/* Previsão do Tempo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Previsão do Tempo</Text>
        {loadingWeather ? (
          <ActivityIndicator size="small" color="#2A5A3C" />
        ) : weather ? (
          <View>
            <Text>Temperatura Atual: {weather.main.temp} °C</Text>
            <Text>Condição: {weather.weather[0].description}</Text>
            <Text>Umidade: {weather.main.humidity} %</Text>
          </View>
        ) : (
          <Text>Não foi possível carregar a previsão do tempo.</Text>
        )}
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
  },
});
