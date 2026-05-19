"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface FilterBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterType: string
  onFilterTypeChange: (value: string) => void
  ufs: string[]
  setores: string[]
  situacoes: string[]
  selectedUf: string
  onUfChange: (value: string) => void
  selectedSetor: string
  onSetorChange: (value: string) => void
  selectedSituacao: string
  onSituacaoChange: (value: string) => void
  onClearFilters: () => void
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  ufs,
  setores,
  situacoes,
  selectedUf,
  onUfChange,
  selectedSetor,
  onSetorChange,
  selectedSituacao,
  onSituacaoChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = searchTerm || selectedUf || selectedSetor || selectedSituacao

  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur">
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por cliente..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>

        <Select value={filterType} onValueChange={onFilterTypeChange}>
          <SelectTrigger className="w-[160px] bg-background/50">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="uf">Por UF</SelectItem>
            <SelectItem value="setor">Por Setor</SelectItem>
            <SelectItem value="situacao">Por Situação</SelectItem>
          </SelectContent>
        </Select>

        {filterType === "uf" && (
          <Select value={selectedUf} onValueChange={onUfChange}>
            <SelectTrigger className="w-[140px] bg-background/50">
              <SelectValue placeholder="Selecione UF" />
            </SelectTrigger>
            <SelectContent>
              {ufs.map((uf) => (
                <SelectItem key={uf} value={uf}>
                  {uf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filterType === "setor" && (
          <Select value={selectedSetor} onValueChange={onSetorChange}>
            <SelectTrigger className="w-[200px] bg-background/50">
              <SelectValue placeholder="Selecione Setor" />
            </SelectTrigger>
            <SelectContent>
              {setores.map((setor) => (
                <SelectItem key={setor} value={setor}>
                  {setor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {filterType === "situacao" && (
          <Select value={selectedSituacao} onValueChange={onSituacaoChange}>
            <SelectTrigger className="w-[180px] bg-background/50">
              <SelectValue placeholder="Selecione Situação" />
            </SelectTrigger>
            <SelectContent>
              {situacoes.map((situacao) => (
                <SelectItem key={situacao} value={situacao}>
                  {situacao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  )
}
