export interface Financiamento {
  id: number
  cliente: string
  municipio: string
  uf: string
  valorOperacao: number
  valorDesembolsado: number
  setorBndes: string
  situacaoOperacao: string
}

export interface ResultadoFiltro {
  total: number
  dados: Financiamento[]
}
