import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import MapView, { Polygon, Marker } from 'react-native-maps';
import * as turf from '@turf/turf';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaMedicaoArea() {
  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);
  const [nomeTalhao, setNomeTalhao] = useState('');

  const handleMapPress = (e) => {
    const newPoint = e.nativeEvent.coordinate;
    setPoints([...points, newPoint]);
    if (points.length >= 2) {
      calculateArea([...points, newPoint]);
    }
  };

  const calculateArea = (coords) => {
    if (coords.length < 3) {
      setArea(0);
      return;
    }
    // Convert coords to GeoJSON polygon
    const polygon = turf.polygon([coords.map(p => [p.longitude, p.latitude])]);
    const areaInSqMeters = turf.area(polygon);
    const areaInHectares = areaInSqMeters / 10000;
    setArea(areaInHectares.toFixed(2));
  };

  const handleSave = async () => {
    if (!nomeTalhao) {
      Alert.alert('Erro', 'Por favor, insira um nome para o talhão.');
      return;
    }
    if (points.length < 3) {
      Alert.alert('Erro', 'Desenhe um polígono com pelo menos 3 pontos.');
      return;
    }
    try {
      const talhao = {
        nome: nomeTalhao,
        pontos: points,
        area: area,
      };
      const talhoesSalvos = await AsyncStorage.getItem('talhoes');
      let talhoes = talhoesSalvos ? JSON.parse(talhoesSalvos) : [];
      talhoes.push(talhao);
      await AsyncStorage.setItem('talhoes', JSON.stringify(talhoes));
      Alert.alert('Sucesso', 'Talhão salvo localmente.');
      setNomeTalhao('');
      setPoints([]);
      setArea(0);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o talhão.');
    }
  };

  const handleClear = () => {
    setPoints([]);
    setArea(0);
    setNomeTalhao('');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: -15.7801,
          longitude: -47.9292,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {points.length > 0 && (
          <>
            <Polygon
              coordinates={points}
              strokeColor="#2A5A3C"
              fillColor="rgba(42, 90, 60, 0.3)"
              strokeWidth={2}
            />
            {points.map((point, index) => (
              <Marker key={index} coordinate={point} />
            ))}
          </>
        )}
      </MapView>
      <View style={styles.infoContainer}>
        <Text style={styles.areaText}>Área: {area} ha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Talhão"
          value={nomeTalhao}
          onChangeText={setNomeTalhao}
        />
        <View style={styles.buttonRow}>
          <Button title="Salvar Talhão" onPress={handleSave} />
          <Button title="Limpar" onPress={handleClear} color="#a83232" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 3,
  },
  infoContainer: {
    flex: 2,
    padding: 16,
    backgroundColor: '#fff',
  },
  areaText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2A5A3C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2A5A3C',
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
