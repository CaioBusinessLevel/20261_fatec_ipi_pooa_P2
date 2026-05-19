"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import type { Financiamento } from "@/lib/types"
import { getFinanciamentos, createFinanciamento, updateFinanciamento, deleteFinanciamento } from "@/lib/api"
import { StatCards } from "@/components/stat-cards"
import { FilterBar } from "@/components/filter-bar"
import { FinanciamentosTable } from "@/components/financiamentos-table"
import { FinanciamentoModal } from "@/components/financiamento-modal"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Button } from "@/components/ui/button"
import { Plus, Database, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Dados de exemplo para quando a API não estiver disponível
const MOCK_DATA: Financiamento[] = [
  { id: 1, cliente: "Empresa ABC Ltda", municipio: "São Paulo", uf: "SP", valorOperacao: 1500000, valorDesembolsado: 1200000, setorBndes: "Indústria", situacaoOperacao: "Ativo" },
  { id: 2, cliente: "Agropecuária XYZ S.A.", municipio: "Ribeirão Preto", uf: "SP", valorOperacao: 2500000, valorDesembolsado: 2000000, setorBndes: "Agropecuária", situacaoOperacao: "Ativo" },
  { id: 3, cliente: "Construtora Delta", municipio: "Rio de Janeiro", uf: "RJ", valorOperacao: 5000000, valorDesembolsado: 3500000, setorBndes: "Infraestrutura", situacaoOperacao: "Ativo" },
  { id: 4, cliente: "Comércio Beta ME", municipio: "Belo Horizonte", uf: "MG", valorOperacao: 800000, valorDesembolsado: 800000, setorBndes: "Comércio e Serviços", situacaoOperacao: "Encerrado" },
  { id: 5, cliente: "Indústria Gama S.A.", municipio: "Porto Alegre", uf: "RS", valorOperacao: 3200000, valorDesembolsado: 2800000, setorBndes: "Indústria", situacaoOperacao: "Ativo" },
  { id: 6, cliente: "Fazenda Ômega", municipio: "Cuiabá", uf: "MT", valorOperacao: 1800000, valorDesembolsado: 1500000, setorBndes: "Agropecuária", situacaoOperacao: "Ativo" },
  { id: 7, cliente: "Tech Solutions Ltda", municipio: "Florianópolis", uf: "SC", valorOperacao: 950000, valorDesembolsado: 700000, setorBndes: "Comércio e Serviços", situacaoOperacao: "Ativo" },
  { id: 8, cliente: "Energia Verde S.A.", municipio: "Salvador", uf: "BA", valorOperacao: 7500000, valorDesembolsado: 5000000, setorBndes: "Infraestrutura", situacaoOperacao: "Ativo" },
  { id: 9, cliente: "Alimentos Sigma", municipio: "Goiânia", uf: "GO", valorOperacao: 1200000, valorDesembolsado: 1200000, setorBndes: "Indústria", situacaoOperacao: "Liquidado" },
  { id: 10, cliente: "Transportes Eta", municipio: "Recife", uf: "PE", valorOperacao: 650000, valorDesembolsado: 400000, setorBndes: "Comércio e Serviços", situacaoOperacao: "Suspenso" },
]

export function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")
  const [selectedUf, setSelectedUf] = useState("")
  const [selectedSetor, setSelectedSetor] = useState("")
  const [selectedSituacao, setSelectedSituacao] = useState("")
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFinanciamento, setEditingFinanciamento] = useState<Financiamento | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  
  const [localData, setLocalData] = useState<Financiamento[]>(MOCK_DATA)

  const { data: apiData, error, isLoading, mutate } = useSWR<Financiamento[]>(
    "financiamentos",
    getFinanciamentos,
    {
      onSuccess: (data) => setLocalData(data),
      onError: () => {
        // Usar dados mock quando a API não estiver disponível
        setLocalData(MOCK_DATA)
      },
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  )

  const isUsingMockData = error || !apiData

  // Extrair valores únicos para os filtros
  const ufs = useMemo(() => {
    return [...new Set(localData.map((f) => f.uf))].sort()
  }, [localData])

  const setores = useMemo(() => {
    return [...new Set(localData.map((f) => f.setorBndes))].sort()
  }, [localData])

  const situacoes = useMemo(() => {
    return [...new Set(localData.map((f) => f.situacaoOperacao))].sort()
  }, [localData])

  // Filtrar dados
  const filteredData = useMemo(() => {
    let result = localData

    // Filtro por busca
    if (searchTerm) {
      result = result.filter((f) =>
        f.cliente.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por UF
    if (filterType === "uf" && selectedUf) {
      result = result.filter((f) => f.uf === selectedUf)
    }

    // Filtro por setor
    if (filterType === "setor" && selectedSetor) {
      result = result.filter((f) => f.setorBndes === selectedSetor)
    }

    // Filtro por situação
    if (filterType === "situacao" && selectedSituacao) {
      result = result.filter((f) => f.situacaoOperacao === selectedSituacao)
    }

    return result
  }, [localData, searchTerm, filterType, selectedUf, selectedSetor, selectedSituacao])

  // Calcular estatísticas
  const stats = useMemo(() => {
    return {
      totalFinanciamentos: localData.length,
      totalValorOperacao: localData.reduce((sum, f) => sum + f.valorOperacao, 0),
      totalValorDesembolsado: localData.reduce((sum, f) => sum + f.valorDesembolsado, 0),
      uniqueUfs: new Set(localData.map((f) => f.uf)).size,
    }
  }, [localData])

  const handleClearFilters = () => {
    setSearchTerm("")
    setFilterType("todos")
    setSelectedUf("")
    setSelectedSetor("")
    setSelectedSituacao("")
  }

  const handleEdit = (financiamento: Financiamento) => {
    setEditingFinanciamento(financiamento)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setDeletingId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleSave = async (data: Omit<Financiamento, "id">) => {
    setIsSaving(true)
    try {
      if (isUsingMockData) {
        // Operação local quando a API não estiver disponível
        if (editingFinanciamento) {
          setLocalData((prev) =>
            prev.map((f) =>
              f.id === editingFinanciamento.id ? { ...data, id: editingFinanciamento.id } : f
            )
          )
        } else {
          const newId = Math.max(...localData.map((f) => f.id), 0) + 1
          setLocalData((prev) => [...prev, { ...data, id: newId }])
        }
      } else {
        if (editingFinanciamento) {
          await updateFinanciamento(editingFinanciamento.id, data)
        } else {
          await createFinanciamento(data)
        }
        mutate()
      }
      setIsModalOpen(false)
      setEditingFinanciamento(null)
    } catch {
      console.error("Erro ao salvar")
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deletingId) return
    
    setIsSaving(true)
    try {
      if (isUsingMockData) {
        setLocalData((prev) => prev.filter((f) => f.id !== deletingId))
      } else {
        await deleteFinanciamento(deletingId)
        mutate()
      }
      setIsDeleteDialogOpen(false)
      setDeletingId(null)
    } catch {
      console.error("Erro ao deletar")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">BNDES</h1>
                <p className="text-sm text-muted-foreground">Sistema de Financiamentos</p>
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Financiamento
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Alerta de modo de demonstração */}
        {isUsingMockData && (
          <Alert className="border-primary/50 bg-primary/10">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle>Modo Demonstração</AlertTitle>
            <AlertDescription>
              A API do backend não está disponível. Os dados exibidos são de demonstração e as alterações são apenas locais.
              Configure a variável de ambiente <code className="text-primary">NEXT_PUBLIC_API_URL</code> para conectar ao seu backend Spring Boot.
            </AlertDescription>
          </Alert>
        )}

        {/* Stat Cards */}
        <StatCards {...stats} />

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={(value) => {
            setFilterType(value)
            setSelectedUf("")
            setSelectedSetor("")
            setSelectedSituacao("")
          }}
          ufs={ufs}
          setores={setores}
          situacoes={situacoes}
          selectedUf={selectedUf}
          onUfChange={setSelectedUf}
          selectedSetor={selectedSetor}
          onSetorChange={setSelectedSetor}
          selectedSituacao={selectedSituacao}
          onSituacaoChange={setSelectedSituacao}
          onClearFilters={handleClearFilters}
        />

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Mostrando {filteredData.length} de {localData.length} registros
          </span>
        </div>

        {/* Data Table */}
        <FinanciamentosTable
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </main>

      {/* Modals */}
      <FinanciamentoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingFinanciamento(null)
        }}
        onSave={handleSave}
        financiamento={editingFinanciamento}
        isLoading={isSaving}
      />

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setDeletingId(null)
        }}
        onConfirm={handleConfirmDelete}
        isLoading={isSaving}
      />
    </div>
  )
}
