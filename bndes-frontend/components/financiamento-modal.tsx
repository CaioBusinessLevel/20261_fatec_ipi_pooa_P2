"use client"

import { useState, useEffect } from "react"
import type { Financiamento } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FinanciamentoModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<Financiamento, "id">) => void
  financiamento?: Financiamento | null
  isLoading?: boolean
}

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO"
]

const SETORES = [
  "Agropecuária",
  "Comércio e Serviços",
  "Indústria",
  "Infraestrutura"
]

const SITUACOES = [
  "Ativo",
  "Encerrado",
  "Suspenso",
  "Liquidado"
]

export function FinanciamentoModal({
  isOpen,
  onClose,
  onSave,
  financiamento,
  isLoading,
}: FinanciamentoModalProps) {
  const [formData, setFormData] = useState({
    cliente: "",
    municipio: "",
    uf: "",
    valorOperacao: 0,
    valorDesembolsado: 0,
    setorBndes: "",
    situacaoOperacao: "",
  })

  useEffect(() => {
    if (financiamento) {
      setFormData({
        cliente: financiamento.cliente,
        municipio: financiamento.municipio,
        uf: financiamento.uf,
        valorOperacao: financiamento.valorOperacao,
        valorDesembolsado: financiamento.valorDesembolsado,
        setorBndes: financiamento.setorBndes,
        situacaoOperacao: financiamento.situacaoOperacao,
      })
    } else {
      setFormData({
        cliente: "",
        municipio: "",
        uf: "",
        valorOperacao: 0,
        valorDesembolsado: 0,
        setorBndes: "",
        situacaoOperacao: "",
      })
    }
  }, [financiamento, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const isEditing = !!financiamento

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Financiamento" : "Novo Financiamento"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os dados do financiamento abaixo."
              : "Preencha os dados para criar um novo financiamento."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente">Cliente</Label>
            <Input
              id="cliente"
              value={formData.cliente}
              onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
              placeholder="Nome do cliente"
              required
              className="bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="municipio">Município</Label>
              <Input
                id="municipio"
                value={formData.municipio}
                onChange={(e) => setFormData({ ...formData, municipio: e.target.value })}
                placeholder="Município"
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uf">UF</Label>
              <Select
                value={formData.uf}
                onValueChange={(value) => setFormData({ ...formData, uf: value })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="UF" />
                </SelectTrigger>
                <SelectContent>
                  {UFS.map((uf) => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valorOperacao">Valor da Operação</Label>
              <Input
                id="valorOperacao"
                type="number"
                step="0.01"
                value={formData.valorOperacao}
                onChange={(e) =>
                  setFormData({ ...formData, valorOperacao: parseFloat(e.target.value) || 0 })
                }
                placeholder="0,00"
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorDesembolsado">Valor Desembolsado</Label>
              <Input
                id="valorDesembolsado"
                type="number"
                step="0.01"
                value={formData.valorDesembolsado}
                onChange={(e) =>
                  setFormData({ ...formData, valorDesembolsado: parseFloat(e.target.value) || 0 })
                }
                placeholder="0,00"
                required
                className="bg-background/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="setorBndes">Setor BNDES</Label>
            <Select
              value={formData.setorBndes}
              onValueChange={(value) => setFormData({ ...formData, setorBndes: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {SETORES.map((setor) => (
                  <SelectItem key={setor} value={setor}>
                    {setor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="situacaoOperacao">Situação da Operação</Label>
            <Select
              value={formData.situacaoOperacao}
              onValueChange={(value) => setFormData({ ...formData, situacaoOperacao: value })}
            >
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Selecione a situação" />
              </SelectTrigger>
              <SelectContent>
                {SITUACOES.map((situacao) => (
                  <SelectItem key={situacao} value={situacao}>
                    {situacao}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
