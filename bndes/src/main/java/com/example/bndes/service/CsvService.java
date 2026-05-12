package com.example.bndes.service;

import com.example.bndes.entity.Financiamento;
import com.example.bndes.repository.FinanciamentoRepository;
import com.opencsv.CSVReader;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.util.List;

@Service
public class CsvService {

    @Autowired
    private FinanciamentoRepository repository;

    @PostConstruct
    public void carregarCsv() {

        try {

            String arquivo =
                    "src/main/resources/bndes_filtrado.csv";

            CSVReader reader =
                    new CSVReader(new FileReader(arquivo));

            List<String[]> linhas = reader.readAll();

            boolean primeiraLinha = true;

            for (String[] linha : linhas) {

                if (primeiraLinha) {
                    primeiraLinha = false;
                    continue;
                }

                Financiamento financiamento =
        Financiamento.builder()

                .cliente(
                   linha[1].trim())


                .municipio(linha[4].trim())

                .uf(linha[3].trim())

                .valorOperacao(
                        converterDouble(linha[7])
                )

                .valorDesembolsado(
                        converterDouble(linha[8])
                )

                .setorBndes(linha[24].trim())

                .situacaoOperacao(linha[30].trim())

                .build();
                System.out.println(financiamento);
                repository.save(financiamento);
            }
            System.out.println("TOTAL LINHAS: " + linhas.size());
            reader.close();

            System.out.println(
                    "CSV importado com sucesso!"
            );

        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    private Double converterDouble(String valor) {

        try {

            valor = valor.replace(".", "")
                         .replace(",", ".");

            return Double.parseDouble(valor);

        } catch (Exception e) {

            return 0.0;
        }
    }
}