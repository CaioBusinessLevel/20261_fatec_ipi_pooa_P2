package com.example.bndes.dto;

import com.example.bndes.entity.Financiamento;

import java.util.List;

public class ResultadoFiltroDTO {

    private Long quantidade;

    private List<Financiamento> dados;

    public ResultadoFiltroDTO(Long quantidade,
                               List<Financiamento> dados) {
        this.quantidade = quantidade;
        this.dados = dados;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public List<Financiamento> getDados() {
        return dados;
    }

    public void setDados(List<Financiamento> dados) {
        this.dados = dados;
    }
}