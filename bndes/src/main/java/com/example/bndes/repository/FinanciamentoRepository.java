package com.example.bndes.repository;

import com.example.bndes.entity.Financiamento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FinanciamentoRepository
        extends JpaRepository<Financiamento, Long> {

    List<Financiamento> findByCliente(String cliente);

    List<Financiamento> findBySituacaoOperacao(String situacao);

    List<Financiamento> findByUfIgnoreCase(String uf);

    List<Financiamento> findBySetorBndes(String setor);

    Long countBySituacaoOperacao(String situacao);

    
}
