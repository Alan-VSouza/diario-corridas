import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { supabase } from '../../lib/supabase';
import { exportToCsv } from '../../components/exportCSV';

export default function Historico() {
  const [corridas, setCorridas] = useState<any[]>([]);
  const [nome, setNome] = useState('');

  const fetchHistorico = async () => {
    const user = await supabase.auth.getUser();
    setNome(user.data.user?.user_metadata.nome_completo || 'motorista');
    const { data, error } = await supabase
      .from('corridas')
      .select('*')
      .eq('motorista_id', user.data.user?.id)
      .order('data_corrida', { ascending: false });
    if (!error && data) setCorridas(data);
  };

  useEffect(() => { fetchHistorico(); }, []);

  return (
    <View style={{ flex:1, padding:16 }}>
      <Button
        title="Exportar CSV"
        onPress={() => exportToCsv(corridas, nome)}
      />
      <FlatList
        data={corridas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical:8 }}>
            <Text>{item.data_corrida} {item.hora_corrida}</Text>
            <Text>{item.ponto_partida} → {item.destino}</Text>
            <Text>R$ {item.valor_cobrado?.toFixed(2) || '—'}</Text>
            <Button
              title="Excluir"
              color="#ef4444"
              onPress={async () => {
                await supabase.from('corridas').delete().eq('id', item.id);
                fetchHistorico();
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
