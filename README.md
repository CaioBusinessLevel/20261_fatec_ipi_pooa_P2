# SAFT-BNDES | Sistema de Análise de Financiamentos Tecnológicos
**Projeto Integrador - Disciplina:** Programação Orientada a Objetos Avançada  
**Instituição:** Fatec Ipiranga  
**Desenvolvedores:** 
* Beatriz Stefani da Silva;
* Caio Alves da Silva;
* Euripides Venancio Junior;
* Vanessa Cristina Alcantara da Silva;

---

## 1. Visão Geral do Projeto
O sistema foi desenvolvido para processar e visualizar dados públicos de financiamentos do BNDES voltados à inovação. A aplicação realiza a ingestão de um arquivo CSV, persiste os dados em um banco de dados H2 (em memória) e disponibiliza uma interface interativa para análise de indicadores financeiros (KPIs).

## 2. Dicionário de Dados (Campos Principais)

| Atributo | Tipo (Java) | Descrição |
| :--- | :--- | :--- |
| `cliente` | `String` | Nome da empresa ou beneficiário do financiamento |
| `uf` | `String` | Unidade Federativa onde o recurso foi aplicado |
| `valorAprovado` | `Double` | Montante total aprovado para o projeto |
| `valorDesembolsado` | `Double` | Valor que já foi efetivamente pago pelo BNDES |
| `setorBndes` | `String` | Segmento econômico classificado pelo banco |
| `dataContratacao`| `LocalDate`| Data em que o contrato foi assinado |

## 3. Estrutura Técnica (Full-Stack)

| Camada | Tecnologia | Responsabilidade |
| :--- | :--- | :--- |
| **Backend** | Java 17 + Spring Boot | API REST e Ingestão de dados (CSV) |
| **Banco de Dados** | H2 Database | Armazenamento volátil de alta performance |
| **Frontend** | React.js + Vite | Dashboard interativo e consumo de API |
| **Comunicação** | Axios | Requisições HTTP entre Front e Back |

## 4. Documentação de Endpoints (API)

| Método | Endpoint | Parâmetro | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/financiamentos` | N/A | Lista todos os registros carregados |
| `GET` | `/financiamentos/uf/{sigla}` | `SP, RJ, etc` | Filtra financiamentos por estado |
| `GET` | `/financiamentos/cliente/{nome}` | `Nome Empresa` | Busca por nome do cliente |

## 5. Configuração do Ambiente

* **Arquivos de Dados:** O arquivo `bndes_filtrado.csv` deve estar localizado na pasta `api-bndes/src/main/resources/`.
* **Gerenciamento de Dependências:**
  * O Backend utiliza **Maven** (`pom.xml`).
  * O Frontend utiliza **NPM** (`package.json`).

## 6. Instruções de Execução

### Passo A: Inicializar o Backend
No terminal, entre na pasta do Java e execute o Maven Wrapper:
```powershell
cd api-bndes
cmd /c mvnw spring-boot:run

### Passo B: Inicializar o Frontend 
Em um novo terminal, entre na pasta do React:
cd frontend-bndes
npm install
npm run dev

## 7. Conceitos de POO e Boas Práticas Aplicadas

| Conceito | Recurso Técnico | Aplicação no Projeto |  
| **Injeção de Dependência** | Spring Framework | Desacoplamento entre controladores, serviços e repositórios. |
| **Persistência** | Spring Data JPA | Mapeamento objeto-relacional para gestão dos dados no H2. |
| **Carga Automática** | @PostConstruct | Popular o banco de dados imediatamente após o startup da API. |
| **Tipagem de Dados** | Wrappers (Double/Long) | Conversão segura de dados brutos do CSV para objetos Java. | 
