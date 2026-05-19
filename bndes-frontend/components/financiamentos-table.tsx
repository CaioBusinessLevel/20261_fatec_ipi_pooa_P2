"use client"

import type { Financiamento } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit2, Trash2 } from "lucide-react"

interface FinanciamentosTableProps {
  data: Financiamento[]
  onEdit: (financiamento: Financiamento) => void
  onDelete: (id: number) => void
  isLoading?: boolean
}

export function FinanciamentosTable({
  data,
  onEdit,
  onDelete,
  isLoading,
}: FinanciamentosTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getSituacaoBadgeVariant = (situacao: string) => {
    const lower = situacao.toLowerCase()
    if (lower.includes("ativo") || lower.includes("vigente")) return "default"
    if (lower.includes("encerrad") || lower.includes("liquidado")) return "secondary"
    if (lower.includes("suspen") || lower.includes("inadimplente")) return "destructive"
    return "outline"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <p className="text-lg">Nenhum financiamento encontrado</p>
        <p className="text-sm">Tente ajustar os filtros ou adicionar novos registros</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Município</TableHead>
            <TableHead className="w-[60px]">UF</TableHead>
            <TableHead className="text-right">Valor Operação</TableHead>
            <TableHead className="text-right">Valor Desembolsado</TableHead>
            <TableHead>Setor BNDES</TableHead>
            <TableHead>Situação</TableHead>
            <TableHead className="w-[100px] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((financiamento) => (
            <TableRow key={financiamento.id} className="hover:bg-muted/20">
              <TableCell className="font-mono text-muted-foreground">
                {financiamento.id}
              </TableCell>
              <TableCell className="font-medium max-w-[200px] truncate" title={financiamento.cliente}>
                {financiamento.cliente}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {financiamento.municipio}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  {financiamento.uf}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCurrency(financiamento.valorOperacao)}
              </TableCell>
              <TableCell className="text-right font-mono text-primary">
                {formatCurrency(financiamento.valorDesembolsado)}
              </TableCell>
              <TableCell className="text-muted-foreground max-w-[150px] truncate" title={financiamento.setorBndes}>
                {financiamento.setorBndes}
              </TableCell>
              <TableCell>
                <Badge variant={getSituacaoBadgeVariant(financiamento.situacaoOperacao)}>
                  {financiamento.situacaoOperacao}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(financiamento)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(financiamento.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
