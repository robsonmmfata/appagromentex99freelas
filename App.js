
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Import das telas
import Dashboard from './Dashboard';
import CadastroTalhao from './CadastroTalhao';
import Relatorios from './Relatorios';
import Feedback from './Feedback';
import TelaMedicaoArea from './TelaMedicaoArea';
import TelaVisualizacaoNDVI from './TelaVisualizacaoNDVI';

const Drawer = createDrawerNavigator();

// Componente personalizado para o cabeçalho do Drawer
const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Image 
          source={require('./assets/agromentex-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.drawerTitle}>Agromentex</Text>
      </View>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('Dashboard')}
      >
        <MaterialIcons name="home" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('CadastroTalhao')}
      >
        <MaterialCommunityIcons name="map-marker" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Cadastrar Talhão</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('Relatorios')}
      >
        <MaterialIcons name="bar-chart" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Relatórios</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('Feedback')}
      >
        <MaterialIcons name="feedback" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Fale Conosco</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('MedicaoArea')}
      >
        <MaterialIcons name="crop-free" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Medição de Área</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => navigation.navigate('VisualizacaoNDVI')}
      >
        <MaterialIcons name="image" size={24} color="#2A5A3C" />
        <Text style={styles.drawerItemText}>Visualização NDVI</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <Text style={styles.drawerFooter}>Versão 1.0 - 2025</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveBackgroundColor: '#e8f5e9',
          drawerActiveTintColor: '#2A5A3C',
          drawerInactiveTintColor: '#555',
          headerStyle: {
            backgroundColor: '#2A5A3C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{
            title: 'Visão Geral',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="CadastroTalhao" 
          component={CadastroTalhao} 
          options={{
            title: 'Cadastrar Talhão',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-marker" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Relatorios" 
          component={Relatorios} 
          options={{
            title: 'Relatórios',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="bar-chart" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="Feedback" 
          component={Feedback} 
          options={{
            title: 'Feedback',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="feedback" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="MedicaoArea" 
          component={TelaMedicaoArea} 
          options={{
            title: 'Medição de Área',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="crop-free" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen 
          name="VisualizacaoNDVI" 
          component={TelaVisualizacaoNDVI} 
          options={{
            title: 'Visualização NDVI',
            drawerIcon: ({ color }) => (
              <MaterialIcons name="image" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#f5f9f7',
  },
  drawerHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2A5A3C',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#2A5A3C',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  drawerFooter: {
    textAlign: 'center',
    color: '#95a5a6',
    marginTop: 'auto',
    padding: 10,
  },
});
