import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';

export default function TelaVisualizacaoNDVI() {
  const ndviTileUrl = 'https://tileserver.example.com/ndvi/{z}/{x}/{y}.png'; // Replace with actual NDVI tile server URL

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualização NDVI em Tempo Real</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7801,
          longitude: -47.9292,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <UrlTile
          urlTemplate={ndviTileUrl}
          maximumZ={19}
          flipY={false}
          tileSize={256}
        />
      </MapView>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#2ecc71' }]} />
          <Text style={styles.legendText}>Alto Vigor (Verde)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#f1c40f' }]} />
          <Text style={styles.legendText}>Alerta (Amarelo)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#e74c3c' }]} />
          <Text style={styles.legendText}>Alerta (Vermelho)</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f9f7',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2A5A3C',
    marginBottom: 16,
    textAlign: 'center',
  },
  map: {
    flex: 1,
    marginBottom: 24,
  },
  legendContainer: {
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 24,
    height: 24,
    marginRight: 12,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 16,
    color: '#2A5A3C',
  },
});
