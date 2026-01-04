import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const [codigoEmpleado, setCodigoEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const buildEmail = (codigo) => `${codigo.toLowerCase()}@empresa.local`;

  const handleLogin = async () => {
    if (!codigoEmpleado || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: buildEmail(codigoEmpleado),
      password,
    });

    if (error) {
      Alert.alert('Error', 'Código o contraseña incorrectos');
    }

    setLoading(false);
  };

  const handleSignUp = async () => {
    if (!codigoEmpleado || !password) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: buildEmail(codigoEmpleado),
      password,
    });

    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }

    const { error: dbError } = await supabase
      .from('empleados')
      .insert({
        id: data.user.id,
        codigo_empleado: codigoEmpleado,
      });

    if (dbError) {
      Alert.alert('Error', 'No se pudo guardar el empleado');
    } else {
      Alert.alert('Registro exitoso', 'Cuenta creada correctamente');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>M</Text>
        </View>
        <Text style={styles.headerTitle}>Manufactura SV</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.welcomeText}>Bienvenido</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Código de Empleado</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: EMP001"
            placeholderTextColor="#aaa"
            value={codigoEmpleado}
            onChangeText={setCodigoEmpleado}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Cargando...' : 'INICIAR SESIÓN'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.secondaryButtonText}>Crear cuenta nueva</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ===== ESTILOS (ESTO ERA LO QUE FALTABA) ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    height: '40%',
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -50,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  secondaryButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 15,
  },
});
