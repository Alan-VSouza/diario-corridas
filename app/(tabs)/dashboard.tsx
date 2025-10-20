import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';
import CorridaForm from '../../components/CorridaForm';

export default function Dashboard() {
  const [total, setTotal] = useState(0);
  const [media, setMedia] = useState(0);
  const [ultima, setUltima] = useState<string>('');

  const fetchResumo = async () => {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('corridas')
      .select('valor_cobrado,created_at')
      .eq('motorista_id', user.data.user?.id);
    if (!error && data) {
      const valores = data.map((r: any) => r.valor_cobrado || 0);
      const soma = valores.reduce((a: number,b: number) => a+b,0);
      setTotal(soma);
      setMedia(valores.length ? soma/valores.length : 0);
      setUltima(data.length ? new Date(data[data.length-1].created_at).toLocaleString() : '');
    }
  };

  useEffect(() => { fetchResumo(); }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumo de Corridas</Text>
      <Text>Total arrecadado: R$ {total.toFixed(2)}</Text>
      <Text>Média por corrida: R$ {media.toFixed(2)}</Text>
      <Text>Última corrida: {ultima || '—'}</Text>
      <CorridaForm onSave={fetchResumo} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 }
});
