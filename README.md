# Práticas de Desenvolvimento Backend

Repositório dedicado à prática e consolidação de fundamentos de **desenvolvimento web e backend**, com foco na construção, teste, versionamento, execução e publicação de uma aplicação real.

O projeto evolui de uma aplicação web simples para uma estrutura backend com **API REST versionada, PostgreSQL, Docker, migrations, testes de integração, variáveis de ambiente, deploy e diferentes ambientes de execução**.

---

## 🚀 Principais conhecimentos desenvolvidos

### Backend e APIs

* Desenvolvimento de APIs utilizando **JavaScript e Node.js**
* Construção de endpoints HTTP
* Organização de APIs utilizando versionamento (`/api/v1`)
* Utilização dos principais métodos HTTP
* Tratamento de métodos não permitidos
* Códigos de status HTTP
* Comunicação entre cliente e servidor
* Serialização e retorno de dados em JSON
* Separação de responsabilidades na aplicação
* Conceitos de arquitetura **MVC**
* Convenções de nomenclatura como `lowerCamelCase`
* Manipulação de datas utilizando **ISO 8601**
* Conceitos relacionados a fusos horários

### HTTP, Web e infraestrutura

* Funcionamento do protocolo **HTTP**
* Relação entre cliente e servidor
* Endpoints e recursos
* Funcionamento básico de **DNS**
* Resolução de nomes de domínio
* Registro e configuração de domínio
* Conceitos de hospedagem
* Deploy de aplicações web
* Diferença entre ambientes local, homologação e produção
* Investigação de problemas em produção através de logs

### Banco de dados

* Utilização do **PostgreSQL**
* Conexão de aplicações Node.js com banco de dados
* Execução de queries SQL
* Consultas parametrizadas
* Prevenção contra **SQL Injection**
* Gerenciamento de conexões
* Controle de conexões abertas
* Limite máximo de conexões do banco
* Identificação e correção de vazamento de conexões
* Consulta de informações internas do PostgreSQL
* Versionamento da estrutura do banco de dados
* Utilização da plataforma Neon para hospedagem do banco de dados PostgreSQL
* Criação e execução de **Database Migrations**
* Migrations via linha de comando
* Migrations executadas através de API
* Execução em modo `dry run`
* Execução efetiva de migrations
* Estratégias para evolução segura do schema
* Conceitos de rollback e riscos associados

### Docker

* Containerização de serviços
* Utilização do **Docker Compose**
* Execução local do PostgreSQL através de container
* Configuração de serviços
* Gerenciamento do ciclo de vida dos containers
* Integração entre aplicação e banco de dados
* Separação entre aplicação e infraestrutura

### Variáveis de ambiente e configuração

* Utilização de variáveis de ambiente
* Gerenciamento de configurações por ambiente
* Separação entre configuração e código
* Uso de arquivos `.env`
* Configuração de ambientes de desenvolvimento e produção
* Proteção de credenciais e informações sensíveis
* Configuração de variáveis de ambiente em ambientes de deploy

### Testes automatizados

* Desenvolvimento orientado por testes (**TDD**)
* Ciclo **Red → Green → Refactor**
* Criação de testes automatizados
* Testes de integração
* Testes de endpoints HTTP
* Validação de códigos de status
* Validação de respostas JSON
* Testes de comportamento da aplicação
* Testes envolvendo banco de dados
* Isolamento e limpeza do estado do banco durante os testes
* Execução de testes de forma determinística
* Uso do **Jest**
* Configuração do Jest para trabalhar com módulos **ESM**
* Execução seletiva de testes
* Refatoração guiada por testes

### Git e controle de versão

* Fundamentos do Git
* Repositórios locais e remotos
* Commits
* Histórico de alterações
* `git log`
* `git diff`
* `git commit --amend`
* `git push`
* Branches
* Merge
* Fast-forward merge
* `git reflog`
* Recuperação de alterações e commits
* Organização do trabalho através de branches
* Desenvolvimento baseado em features
* Trunk-Based Development
* Git Flow
* Estratégias de versionamento e colaboração

### Qualidade e padronização

* **Prettier**
* **EditorConfig**
* Padronização de indentação
* Formatação automática de código
* Configuração compartilhada do ambiente de desenvolvimento
* Scripts automatizados no `package.json`
* Organização de arquivos e diretórios
* Refatoração contínua
* Preocupação com legibilidade e manutenção do código
* Uso de imports absolutos através de `baseUrl`

### Arquitetura e engenharia de software

* Separação entre regras de negócio e detalhes técnicos
* Organização arquitetural de projetos
* Evitar **overengineering**
* Evolução incremental da arquitetura
* Pensamento orientado a problemas
* Desenvolvimento de soluções simples antes de abstrações desnecessárias
* Prova de conceito (**PoC**)
* Produto mínimo viável (**MVP**)
* Planejamento incremental de funcionalidades
* Identificação e correção de problemas reais
* Investigação técnica e debugging

### Gerenciamento do desenvolvimento

* Organização de tarefas
* Issues
* Milestones
* Planejamento incremental
* Divisão de funcionalidades em pequenas entregas
* Priorização de tarefas
* Acompanhamento da evolução do projeto
* Ciclos curtos de feedback
* Conceitos de desenvolvimento ágil
* Continuous Integration
* Continuous Delivery
* Continuous Deployment

### Ambientes e entrega

* Ambiente de desenvolvimento
* Ambiente de homologação (**staging/preview**)
* Ambiente de produção
* Deploy de diferentes branches
* Validação de alterações antes da produção
* Reprodução de bugs em homologação
* Correção e validação de problemas antes do merge
* Execução de migrations em produção
* Investigação de erros através de logs

---

## 🛠️ Tecnologias utilizadas

| Tecnologia               | Utilização                      |
| ------------------------ | ------------------------------- |
| **JavaScript**           | Linguagem principal             |
| **Node.js**              | Runtime do backend              |
| **Next.js**              | Aplicação web e API             |
| **React**                | Interface da aplicação          |
| **PostgreSQL**           | Banco de dados relacional       |
| **Docker**               | Ambiente e infraestrutura local |
| **Docker Compose**       | Orquestração do banco local     |
| **node-postgres (`pg`)** | Comunicação com PostgreSQL      |
| **Neon**                 | Hospedagem do banco de dados    |
| **node-pg-migrate**      | Database migrations             |
| **Jest**                 | Testes automatizados            |
| **Prettier**             | Formatação e padronização       |
| **Git/GitHub**           | Versionamento e colaboração     |
| **Vercel**               | Deploy e ambientes de execução  |

---

## 📁 Estrutura do projeto

```text
.
├── infra/
│   ├── migrations/
│   │   └── ...                 # Migrations do banco
│   ├── compose.yaml            # Serviço PostgreSQL
│   └── database.js             # Camada de acesso ao banco
│
├── pages/
│   ├── api/
│   │   └── v1/
│   │       ├── migrations/     # API para consultar/executar migrations
│   │       └── status/         # Endpoint de status da aplicação
│   │
│   └── index.js                # Página inicial
│
├── tests/
│   └── integration/
│       └── api/
│           └── v1/
│               ├── migrations/
│               └── status/
│
├── .editorconfig               # Padronização do editor
├── .env.development            # Configurações locais
├── .gitignore
├── .nvmrc
├── .prettierignore
├── jest.config.js
├── jsconfig.json
└── package.json
```

---

## 🔌 API

### Status da aplicação

```http
GET /api/v1/status
```

Retorna informações sobre a aplicação e suas dependências, incluindo:

```json
{
  "updated_at": "2026-08-15T00:00:00.000Z",
  "dependencies": {
    "database": {
      "version": "16.14",
      "max_connections": 100,
      "opened_connections": 1
    }
  }
}
```

Esse endpoint permite verificar informações importantes sobre a disponibilidade e o estado do banco de dados.

---

### Migrations

```http
GET /api/v1/migrations
```

Consulta as migrations pendentes utilizando **Dry Run**, sem modificar o banco.

```http
POST /api/v1/migrations
```

Executa as migrations pendentes no banco de dados.

O endpoint também possui tratamento para métodos HTTP não suportados, retornando:

```http
405 Method Not Allowed
```

---

## 🧪 Testes

Os testes cobrem principalmente os comportamentos dos endpoints e sua integração com o banco de dados.

Exemplos de cenários testados:

* Endpoint `/status` retornando `200`
* Validação do formato da data em ISO 8601
* Retorno da versão do PostgreSQL
* Retorno do limite de conexões
* Retorno das conexões abertas
* Consulta de migrations pendentes
* Execução de migrations
* Segunda execução sem migrations pendentes
* Rejeição de métodos HTTP não suportados
* Validação do estado do banco durante os testes

Executar os testes:

```bash
npm test
```

Modo de observação:

```bash
npm run test:watch
```

---

## 🗄️ Database Migrations

As alterações estruturais do banco são versionadas através do **node-pg-migrate**.

Criar uma nova migration:

```bash
npm run migration:create
```

Executar migrations:

```bash
npm run migration:up
```

A aplicação também disponibiliza uma interface HTTP para consultar e executar migrations.

Essa abordagem permite manter o schema do banco sincronizado com a evolução do código e reproduzir sua estrutura em diferentes ambientes.

---

## 🐳 Executando localmente

### Pré-requisitos

* Node.js
* npm
* Docker
* Docker Compose

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Crie o arquivo:

```text
.env.development
```

com as configurações necessárias para o PostgreSQL.

Exemplo:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
DATABASE_URL=postgres://local_user:local_password@localhost:5432/local_db
```

### 3. Iniciar a aplicação

```bash
npm run dev
```

Esse comando inicia o PostgreSQL através do Docker Compose e executa a aplicação em modo de desenvolvimento.

---

## 📋 Scripts disponíveis

| Comando                    | Descrição                    |
| -------------------------- | ---------------------------- |
| `npm run dev`              | Inicia banco e aplicação     |
| `npm run services:up`      | Inicia os serviços Docker    |
| `npm run services:stop`    | Para os serviços             |
| `npm run services:down`    | Remove os containers         |
| `npm test`                 | Executa os testes            |
| `npm run test:watch`       | Executa testes em modo watch |
| `npm run lint:check`       | Verifica a formatação        |
| `npm run lint:fix`         | Corrige a formatação         |
| `npm run migration:create` | Cria uma migration           |
| `npm run migration:up`     | Executa migrations           |

---

## 🔐 Boas práticas aplicadas

O projeto também foi utilizado para praticar aspectos importantes de engenharia de software, como:

* Não versionar credenciais e informações sensíveis
* Utilizar variáveis de ambiente
* Utilizar queries parametrizadas
* Evitar SQL Injection
* Encerrar conexões com o banco corretamente
* Monitorar conexões abertas
* Automatizar testes
* Manter o código formatado
* Versionar alterações do banco
* Trabalhar com branches
* Validar alterações em homologação
* Investigar problemas através de logs
* Evitar complexidade desnecessária
* Fazer pequenas entregas incrementais
* Manter histórico de alterações através do Git

---

## 🌐 Fluxo de desenvolvimento

A experiência prática representada neste repositório envolve um fluxo próximo ao utilizado em aplicações reais:

```text
Planejamento
     ↓
Issue / Milestone
     ↓
Implementação
     ↓
Testes automatizados
     ↓
Branch
     ↓
Homologação / Preview
     ↓
Correção de problemas
     ↓
Merge
     ↓
Deploy
     ↓
Produção
     ↓
Logs / Monitoramento
```

Esse fluxo permite compreender não apenas **como escrever código**, mas também como uma aplicação é desenvolvida, testada, versionada, publicada e mantida ao longo do tempo.

---

## 🎯 Objetivo do repositório

O objetivo deste repositório é consolidar conhecimentos de **desenvolvimento backend, engenharia de software, bancos de dados, testes, versionamento e infraestrutura**, transformando conceitos individuais em uma experiência prática de desenvolvimento de uma aplicação completa.

O foco está na evolução contínua do projeto e na aplicação de práticas que favoreçam:

* **Código legível**
* **Testabilidade**
* **Segurança**
* **Manutenibilidade**
* **Versionamento**
* **Automação**
* **Entrega contínua**
* **Confiabilidade**

---

## 📚 Competências demonstradas

**Backend:**
JavaScript • Node.js • Next.js • APIs REST • HTTP • JSON • MVC

**Banco de Dados:**
PostgreSQL • SQL • Neon • Queries parametrizadas • Database Migrations • Connection Management

**Testes:**
Jest • Testes de integração • TDD • Red/Green/Refactor • Testes de API

**Infraestrutura:**
Docker • Docker Compose • Variáveis de ambiente • Deploy • Staging • Produção

**Versionamento:**
Git • Branches • Merge • Reflog • Feature Branch • Trunk-Based Development • Git Flow

**Qualidade:**
Prettier • EditorConfig • Refatoração • Código limpo • Debugging

**Engenharia de Software:**
PoC • MVP • Issues • Milestones • Desenvolvimento incremental • CI • CD • Continuous Deployment

---

## 📌 Status

🚧 **Em desenvolvimento contínuo**

O repositório representa uma base prática para aprofundamento em desenvolvimento backend e engenharia de software, podendo evoluir com novos endpoints, regras de negócio, testes, integrações e melhorias arquiteturais.
