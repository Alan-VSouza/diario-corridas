import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Disclaimer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Este aplicativo é uma ferramenta de registro pessoal de corridas para fins contábeis e administrativos.  
        NÃO realizamos mediação de transporte, NÃO cobramos comissões, NÃO calculamos tarifas e NÃO fornecemos  
        geolocalização em tempo real. O usuário é responsável por suas atividades de transporte conforme  
        legislação municipal (Decreto 36/2016 - Porto Ferreira) e federal (Lei 13.640/2018).
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },
  text: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});
