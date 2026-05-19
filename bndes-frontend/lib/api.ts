import type { Financiamento, ResultadoFiltro } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export async function getFinanciamentos(): Promise<Financiamento[]> {
  const response = await fetch(`${API_BASE_URL}/financiamentos`)
  if (!response.ok) throw new Error("Erro ao buscar financiamentos")
  return response.json()
}

export async function getFinanciamentoById(id: number): Promise<Financiamento | null> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/${id}`)
  if (!response.ok) return null
  return response.json()
}

export async function getFinanciamentosByUf(uf: string): Promise<ResultadoFiltro> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/uf/${encodeURIComponent(uf)}`)
  if (!response.ok) throw new Error("Erro ao buscar por UF")
  return response.json()
}

export async function getFinanciamentosBySetor(setor: string): Promise<ResultadoFiltro> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/setor/${encodeURIComponent(setor)}`)
  if (!response.ok) throw new Error("Erro ao buscar por setor")
  return response.json()
}

export async function getFinanciamentosBySituacao(situacao: string): Promise<ResultadoFiltro> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/situacao/${encodeURIComponent(situacao)}`)
  if (!response.ok) throw new Error("Erro ao buscar por situação")
  return response.json()
}

export async function getFinanciamentosByCliente(cliente: string): Promise<ResultadoFiltro> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/cliente/${encodeURIComponent(cliente)}`)
  if (!response.ok) throw new Error("Erro ao buscar por cliente")
  return response.json()
}

export async function createFinanciamento(data: Omit<Financiamento, "id">): Promise<Financiamento> {
  const response = await fetch(`${API_BASE_URL}/financiamentos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Erro ao criar financiamento")
  return response.json()
}

export async function updateFinanciamento(id: number, data: Omit<Financiamento, "id">): Promise<Financiamento> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Erro ao atualizar financiamento")
  return response.json()
}

export async function deleteFinanciamento(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/financiamentos/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Erro ao deletar financiamento")
}
