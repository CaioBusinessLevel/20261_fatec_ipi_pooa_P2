package com.example.bndes.controller;

import com.example.bndes.dto.ResultadoFiltroDTO;
import com.example.bndes.entity.Financiamento;
import com.example.bndes.repository.FinanciamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/financiamentos")
public class FinanciamentoController {

    @Autowired
    private FinanciamentoRepository repository;

    // LISTAR TODOS
    @GetMapping
    public List<Financiamento> listarTodos() {
        return repository.findAll();
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Financiamento buscarPorId(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    // INSERIR
    @PostMapping
    public Financiamento inserir(
            @RequestBody Financiamento financiamento) {

        return repository.save(financiamento);
    }

    // ALTERAR
@PutMapping("/{id}")
public Financiamento atualizar(
        @PathVariable Long id,
        @RequestBody Financiamento novo) {

    return repository.findById(id)
            .map(financiamento -> {

                financiamento.setCliente(novo.getCliente());
                financiamento.setMunicipio(novo.getMunicipio());
                financiamento.setUf(novo.getUf());

                financiamento.setValorOperacao(
                        novo.getValorOperacao()
                );

                financiamento.setValorDesembolsado(
                        novo.getValorDesembolsado()
                );

                financiamento.setSetorBndes(
                        novo.getSetorBndes()
                );

                financiamento.setSituacaoOperacao(
                        novo.getSituacaoOperacao()
                );

                return repository.save(financiamento);

            })
            .orElse(null);
}
@GetMapping("/situacao/{situacao}")
public Map<String, Object> buscarPorSituacao(
        @PathVariable String situacao
) {

    List<Financiamento> lista =
            repository.findBySituacaoOperacao(
                    situacao
            );

    Long total =
            repository.countBySituacaoOperacao(
                    situacao
            );

    Map<String, Object> resposta =
            new HashMap<>();

    resposta.put("total", total);

    resposta.put("dados", lista);

    return resposta;
}
  //////////////////////////////////////END POINT para filtrar por estado////////////////////////////////////////
  @GetMapping("/uf/{uf}")
public Map<String, Object> buscarPorUf(
        @PathVariable String uf
) {

    List<Financiamento> lista =
            repository.findByUfIgnoreCase(uf.trim());

    Map<String, Object> resposta =
            new HashMap<>();

    resposta.put("total", lista.size());

    resposta.put("dados", lista);

    return resposta;
}
////////////////////////////////END POINT para filtrar por Setor BNDES////////////////////////////////////////

@GetMapping("/setor/{setor}")
public Map<String, Object> buscarPorSetor(
        @PathVariable String setor
) {

    List<Financiamento> lista =
            repository.findBySetorBndes(setor);

    Map<String, Object> resposta =
            new HashMap<>();

    resposta.put("total", lista.size());

    resposta.put("dados", lista);

    return resposta;
}
///////////////////////////////////END-Point filtrar por Nome da empresa///////////////////////////////////////

@GetMapping("/cliente/{cliente}")
public Map<String, Object> buscarPorCliente(
        @PathVariable String cliente
) {

    List<Financiamento> lista =
            repository.findByCliente(cliente);

    Map<String, Object> resposta =
            new HashMap<>();

    resposta.put("total", lista.size());

    resposta.put("dados", lista);

    return resposta;
}
//Deletar
@DeleteMapping("/{id}")
public String deletar(
        @PathVariable Long id
) {

    repository.deleteById(id);

    return "Registro deletado com sucesso!";
}

}