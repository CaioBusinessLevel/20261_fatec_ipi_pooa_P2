package com.example.bndes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "financiamentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Financiamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cliente;

    private String municipio;

    private String uf;

    @Column(name = "valor_operacao")
    private Double valorOperacao;

    @Column(name = "valor_desembolsado")
    private Double valorDesembolsado;

    @Column(name = "setor_bndes")
    private String setorBndes;

    @Column(name = "situacao_operacao")
    private String situacaoOperacao;
}