import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

export default function DashboardScreen({ navigation }) {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('SeleccionMaquina')}
      >
        <Text style={styles.cardTitle}>Control de Temperaturas</Text>
        <Text style={styles.cardDescription}>
          Registro y monitoreo de temperatura
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  card: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardDescription: {
    color: '#666',
  },
  logout: {
    marginTop: 'auto',
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff3b30',
    fontWeight: 'bold',
  },
});
