export function exportToCsv(corridas: any[], nome: string) {
  const header = ['Data','Hora','Origem','Destino','Valor','Observações'];
  const rows = corridas.map(c => [
    c.data_corrida,
    c.hora_corrida,
    c.ponto_partida,
    c.destino,
    c.valor_cobrado?.toFixed(2) ?? '',
    c.observacoes ?? ''
  ]);
  const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `corridas_${nome}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}
