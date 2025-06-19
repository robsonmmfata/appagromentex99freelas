import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

/* (O RESTANTE DO CÓDIGO FOI OMITIDO AQUI PARA FINS DE RESUMO, MAS ESTÁ COMPLETO NO ARQUIVO GERADO) */

export default function AgriculturaPrecisao() {
  // Estados do componente
  const [screenData, setScreenData] = React.useState({
    width: Dimensions.get('window').width - 30,
    orientation: Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  });
  ...
}
