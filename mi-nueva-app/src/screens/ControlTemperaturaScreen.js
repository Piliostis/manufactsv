import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function ControlTemperaturaScreen({ route }) {
  const { maquina } = route.params || { maquina: 'Máquina 1' };

  const [temperatura, setTemperatura] = useState('');
  const [humedad, setHumedad] = useState('');
  const [operador, setOperador] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const min = 18;
  const max = 25;

  const registrarTemperatura = async () => {
    const valor = parseFloat(temperatura);
    const valorHumedad = humedad ? parseFloat(humedad) : null;

    if (isNaN(valor)) {
      Alert.alert('Error', 'Ingrese una temperatura válida');
      return;
    }

    if (!operador.trim()) {
      Alert.alert('Error', 'Ingrese el nombre de quien registra');
      return;
    }

    let fechaRegistro = new Date().toISOString();
    if (fecha.trim() && hora.trim()) {
      fechaRegistro = `${fecha} ${hora}`;
    }

    const { error } = await supabase
      .from('control_temperaturas')
      .insert({
        maquina,
        temperatura: valor,
        humedad: valorHumedad,
        operador,
        fecha_registro: fechaRegistro,
      });

    if (error) {
      Alert.alert('Error', 'No se pudo guardar el registro');
      return;
    }

    setTemperatura('');
    setHumedad('');
    setOperador('');
    setFecha('');
    setHora('');

    Alert.alert('Éxito', 'Registro guardado correctamente');

    if (valor < min || valor > max) {
      Alert.alert(
        'Alerta de temperatura',
        `Temperatura fuera de rango en ${maquina} (${min}°C - ${max}°C)`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Temperatura - {maquina}</Text>

      <Text style={styles.rango}>
        Rango permitido: {min}°C - {max}°C
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Temperatura °C"
        keyboardType="numeric"
        value={temperatura}
        onChangeText={setTemperatura}
      />

      <TextInput
        style={styles.input}
        placeholder="Humedad %"
        keyboardType="numeric"
        value={humedad}
        onChangeText={setHumedad}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del operador"
        value={operador}
        onChangeText={setOperador}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha (DD/MM/AAAA)"
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />

      <TouchableOpacity style={styles.button} onPress={registrarTemperatura}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rango: {
    marginBottom: 16,
    color: '#555555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
