import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [financiamentos, setFinanciamentos] = useState([])
  const [busca, setBusca] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('cliente') 

  // Função para buscar dados (Geral ou com Filtro)
  const carregarDados = async (termo = '') => {
    try {
      let url = 'http://localhost:8080/financiamentos'
      
      // Se houver busca, usa os caminhos do seu Controller (/uf/SP, /setor/TI, etc)
      if (termo) {
        url = `http://localhost:8080/financiamentos/${filtroTipo}/${termo}`
      }

      const response = await axios.get(url)
      
      // O seu Backend retorna ou uma lista direta ou o DTO { dados: [], total: x }
      if (response.data.dados) {
        setFinanciamentos(response.data.dados)
      } else {
        setFinanciamentos(response.data)
      }
    } catch (error) {
      console.error("Erro ao buscar dados. O Backend está ligado?", error)
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  // KPIs baseados nos dados reais da tabela
  const totalFinanciado = financiamentos.reduce((acc, f) => acc + (f.valorOperacao || 0), 0)
  const totalGasto = financiamentos.reduce((acc, f) => acc + (f.valorDesembolsado || 0), 0)

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>SAFT-BNDES</h1>
        <p style={styles.subtitle}>Painel de Controle de Financiamentos Tecnológicos</p>
      </header>

      {/* Seção de Busca */}
      <div style={styles.searchBar}>
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} style={styles.select}>
          <option value="cliente">Empresa</option>
          <option value="uf">Estado (UF)</option>
          <option value="setor">Setor</option>
        </select>
        <input 
          style={styles.input}
          placeholder="Digite o termo e aperte Enter..." 
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && carregarDados(busca)}
        />
        <button onClick={() => carregarDados(busca)} style={styles.button}>Buscar</button>
        <button onClick={() => {setBusca(''); carregarDados();}} style={styles.buttonClear}>Limpar</button>
      </div>

      {/* Cards de Indicadores */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Projetos</h3>
          <p>{financiamentos.length}</p>
        </div>
        <div style={{...styles.card, borderLeft: '5px solid #2ecc71'}}>
          <h3>Total Aprovado</h3>
          <p>{totalFinanciado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
        <div style={{...styles.card, borderLeft: '5px solid #3498db'}}>
          <h3>Total Desembolsado</h3>
          <p>{totalGasto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th>Cliente</th>
              <th>UF</th>
              <th>Setor BNDES</th>
              <th>Valor Operação</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {financiamentos.map(f => (
              <tr key={f.id} style={styles.tr}>
                <td><strong>{f.cliente}</strong><br/><small>{f.municipio}</small></td>
                <td>{f.uf}</td>
                <td>{f.setorBndes}</td>
                <td style={{color: '#27ae60', fontWeight: 'bold'}}>
                  {f.valorOperacao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td><span style={styles.badge}>{f.situacaoOperacao}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const styles = {
  container: { padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'sans-serif' },
  header: { marginBottom: '30px' },
  title: { color: '#003366', margin: 0 },
  subtitle: { color: '#666' },
  searchBar: { display: 'flex', gap: '10px', marginBottom: '30px' },
  select: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  input: { flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { padding: '10px 20px', backgroundColor: '#003366', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  buttonClear: { padding: '10px 20px', backgroundColor: '#ddd', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderLeft: '5px solid #f1c40f' },
  tableCard: { backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thRow: { backgroundColor: '#003366', color: 'white', textAlign: 'left' },
  tr: { borderBottom: '1px solid #eee' },
  badge: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }
}

export default App