import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function SeleccionMaquinaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione una Máquina</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ControlTemperatura', { maquina: 'Máquina 1' })}
      >
        <Text style={styles.cardTitle}>Máquina 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ControlTemperatura', { maquina: 'Máquina 2' })}
      >
        <Text style={styles.cardTitle}>Máquina 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 15,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});