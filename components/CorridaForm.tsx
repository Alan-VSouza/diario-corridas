import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../lib/supabase';

export default function CorridaForm({ onSave }: { onSave: () => void }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [valor, setValor] = useState<string>('');
  const [erro, setErro] = useState('');

  const handleSave = async () => {
    if (!origem || !destino) {
      setErro('Origem e destino são obrigatórios');
      return;
    }
    const user = supabase.auth.getUser();
    const { error } = await supabase
      .from('corridas')
      .insert([{
        motorista_id: (await user).data.user?.id,
        ponto_partida: origem,
        destino,
        data_corrida: data.toISOString().split('T')[0],
        hora_corrida: hora.toTimeString().split(' ')[0],
        valor_cobrado: valor ? parseFloat(valor) : null
      }]);
    if (error) setErro(error.message);
    else {
      setOrigem(''); setDestino(''); setValor(''); setErro('');
      onSave();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Origem</Text>
      <TextInput style={styles.input} value={origem} onChangeText={setOrigem} />
      <Text style={styles.label}>Destino</Text>
      <TextInput style={styles.input} value={destino} onChangeText={setDestino} />
      <Text style={styles.label}>Data</Text>
      <DateTimePicker value={data} mode="date" onChange={(_, d) => d && setData(d)} />
      <Text style={styles.label}>Hora</Text>
      <DateTimePicker value={hora} mode="time" onChange={(_, h) => h && setHora(h)} />
      <Text style={styles.label}>Valor (opcional)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      <Button title="Salvar Corrida" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 16 },
  label: { fontWeight: 'bold', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
  error: { color: 'red', marginVertical: 8 }
});
