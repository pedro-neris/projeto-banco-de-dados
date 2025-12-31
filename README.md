Este projeto implementa um sistema completo de avaliação de pratos de um Restaurante Universitário desenvolvido com **NestJS** no backend e **Next.js** no frontend, utilizando **PostgreSQL** como banco de dados e **TypeScript** como linguagem de programação tanto no frontend quanto no backend.

## 📋 Visão Geral

Este projeto é um sistema de feedback para pratos servidos em diferentes campus universitários, permitindo que usuários avaliem, comentem e forneçam feedback sobre as refeições. O sistema inclui funcionalidades de autenticação, gestão de usuários, avaliações, comentários e relatórios.

## 🏗️ Arquitetura do Projeto

```
├── backend/          # API REST com NestJS
├── frontend/         # Interface web com Next.js
└── sql/             # Scripts de banco de dados
```

## 🚀 Backend - NestJS

### Arquitetura Module/Controller/Service

O backend segue o padrão arquitetural do NestJS, organizando o código em módulos que encapsulam funcionalidades relacionadas:

#### **Estrutura dos Módulos**

Cada domínio do sistema possui sua própria pasta com:
- **Module**: Configuração do módulo (imports, providers, controllers)
- **Controller**: Definição das rotas e tratamento de requisições HTTP
- **Service**: Lógica de negócios e regras de validação
- **Entity**: Interface que define a estrutura dos dados
- **DTOs**: Data Transfer Objects para validação de entrada

#### **Módulos Principais**

- **AuthModule** - Autenticação e autorização JWT
- **UserModule** - Gestão de usuários
- **PratoModule** - Gerenciamento de pratos
- **AvaliacaoModule** - Sistema de avaliações
- **ComentarioModule** - Sistema de comentários
- **FeedbackModule** - Coleta de feedback
- **CampusModule** - Gestão de campus
- **SetorModule** - Gestão de setores
- **DatabaseModule** - Configuração e conexão com o banco

### 🔗 Conexão com Banco de Dados

O banco de dados foi conectado diretamente com a aplicação, utilizando variáveis locais e utilizando a biblioteca .... Demais informações podem ser encontradas na pasta '\backend\src\database'. Variáveis de ambiente também foram utilizadas para executar esta conexão de forma segura, e é possível observar os logs com os status de resposta das *queries* SQL e seus tempos de conexão.

### 🛡️ Validação de Requisições HTTP

O sistema utiliza **class-validator** e **class-transformer** para validação de requisições, sendo criados DTOs para os tipos create/update que recebem argumentos da requisição, garantindo com que esses argumentos sejam consistentes com as especificações do banco, cumprindo, assim, o contrato da API.

### 🔐 Autenticação e Segurança

- **JWT (JSON Web Tokens)** para autenticação stateless
- **bcryptjs** para hash de senhas
- **Passport.js** com estratégia JWT
- Middleware de autenticação para rotas protegidas

### 🌐 Principais Endpoints da API do backend

#### **Autenticação (`/auth`)**
- `POST /auth/login` - Login de usuário

#### **Usuários (`/user`)**
- `GET /user` - Listar todos os usuários
- `POST /user` - Criar novo usuário
- `GET /user/:id` - Buscar usuário por ID
- `GET /user/email/:email` - Buscar usuário por email
- `GET /user/username/:username` - Buscar usuário por username
- `PATCH /user/:id` - Atualizar usuário

#### **Pratos (`/prato`)**
- Operações CRUD para gerenciamento de pratos
- Upload e gerenciamento de ícones dos pratos

#### **Avaliações (`/avaliacao`)**
- Sistema completo de avaliações com notas e comentários
- Filtros por usuário, prato e data

#### **Feedback (`/feedback`)**
- Coleta de feedback dos usuários
- Análises e relatórios

#### **Campus e Setores**
- Gestão de campus universitários
- Organização por setores

### 🛠️ Regras de Negócio (Services)

Os **Services** concentram toda a lógica de negócios:

- **Validações de dados** antes da persistência
- **Regras de autorização** (usuário só pode editar próprios dados)
- **Tratamento de erros** específicos do domínio
- **Cálculos e agregações** (média de avaliações, estatísticas)
- **Integração entre módulos** (relacionamentos entre entidades)

## 🎨 Frontend - Next.js

### Tecnologias Utilizadas

- **Next.js 15**
- **TypeScript** 
- **Tailwind CSS** 
- **Axios**
- **JWT Decode** 
- **Toastify** 


## 🗄️ Banco de Dados

### Estrutura Principal

O banco PostgreSQL possui as seguintes entidades principais:

- **Prato** - Informações dos pratos (nome, categoria, ícone)
- **User** - Dados dos usuários
- **Avaliacao** - Avaliações dos pratos pelos usuários
- **Comentario** - Comentários nas avaliações
- **Feedback** - Feedback geral do sistema
- **Campus** - Campus universitários
- **Setor** - Setores dos campus

### Scripts SQL

- `script.sql` - Criação das tabelas
- `seeding.sql` - Dados iniciais
- `view.sql` - Views para consultas otimizadas
- `procedure.sql` - Stored procedures
- `popular_img.sql` - População de imagens
- `algebra_relacional.sql` - Consultas em álgebra relacional

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js** (v18 ou superior) - [Download aqui](https://nodejs.org/)
- **PostgreSQL** - [Download aqui](https://www.postgresql.org/download/)
- **npm** ou **yarn** (vem com Node.js)
### 🗄️ 1. Configuração do Banco de Dados

#### Passo 1: Criar banco PostgreSQL
```sql
CREATE DATABASE avaliarudb;
```

#### Passo 2: Executar scripts SQL

**🚀 Opção 1 - Script Principal (Recomendado):**
```bash
cd sql
psql -U seu_usuario -d avaliaru -f script.sql
```



### 🔧 2. Configuração do Backend (API)

```bash
# 1. Navegue para a pasta do backend
cd backend

# 2. Instale as dependências
npm install

# 3. Instale o Swagger (documentação da API)
npm install @nestjs/swagger@^8.0.0

# 4. Configure variáveis de ambiente 
# Edite o arquivo .env no diretório backend/ com suas credenciais:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=seu_usuario_postgresql
# DB_PASSWORD=sua_senha_postgresql
# DB_NAME=avaliarudb

# 5. Inicie o servidor em modo desenvolvimento
npm run start:dev
```

### 🌐 3. Configuração do Frontend (Interface Web)
```bash
cd frontend/my-app
npm install
npm run dev
```
## 🔗 Como o Frontend Consome a API do Backend

O frontend Next.js se comunica com a API NestJS através de requisições HTTP usando **Axios**. Esta comunicação segue o padrão REST e utiliza autenticação JWT.

### 🌐 Configuração de Portas

- **Backend (API)**: `http://localhost:3000`
- **Frontend (Interface)**: `http://localhost:3001`

### 🔧 Configuração do Axios

O frontend possui uma instância configurada do Axios que:
- **URL Base**: `http://localhost:3000` (API do backend)
- **Headers**: Inclui automaticamente o token JWT quando o usuário está logado
- **Interceptadores**: Gerencia tokens expirados e redirecionamentos

### 🔐 Fluxo de Autenticação

1. **Login**: `POST /auth/login`
   - Frontend envia credenciais
   - Backend retorna JWT token
   - Token é armazenado no localStorage

2. **Requisições Autenticadas**:
   - Token JWT é incluído no header `Authorization: Bearer <token>`
   - Backend valida o token em cada requisição
   - Usuário tem acesso aos dados protegidos

### 🛡️ Tratamento de Erros

O frontend trata diversos cenários:
- **Token expirado**: Redireciona para login
- **Erro 404**: Exibe mensagem "Não encontrado"
- **Erro 500**: Exibe mensagem "Erro interno do servidor"
- **Sem conexão**: Exibe mensagem "Erro de conexão"

### Estados da Aplicação

- **Loading**: Exibido durante requisições
- **Autenticado**: Usuário logado com acesso completo
- **Não autenticado**: Acesso apenas a páginas públicas
- **Erro**: Mensagens de feedback para o usuário

## 🔗 Como Acessar o Sistema

### 📖 **Documentação da API (Swagger)**
- **URL**: `http://localhost:3000/api/docs`

### 🖥️ **Interface Web (Frontend)**
- **URL**: `http://localhost:3001`
- **Funcionalidades**: Cadastro, login, avaliações, feed de posts

### 🔌 **API Diretamente**
- **URL Base**: `http://localhost:3000`
- Os endpoints estão detalhados na documentação Swagger

## ⚡ Comandos Resumidos

### Para executar TUDO de uma vez:

**Terminal 1 (Backend):**
```bash
cd backend
npm install 
npm install @nestjs/swagger@^8.0.0
npm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```
- Obs: o backend deve ser inicializado antes do fronted

### ✅ **URLs para Acessar:**
- **🌐 Sistema Web**: `http://localhost:3001` (Frontend)
- **📖 Documentação API**: `http://localhost:3000/api/docs` (Backend)
- **🔌 API Direta**: `http://localhost:3000` (Backend)

```

### Pré-requisitos

- Node.js
- PostgreSQL
- npm ou yarn

### Backend

```bash
cd backend
npm install
npm install @nestjs/swagger@^8.0.0  
npm run start:dev
```

**📖 Documentação da API:**
- **Documentação em Swagger da API**: `http://localhost:3000/api/docs` (ou `http://localhost:3001/api/docs` se a porta 3000 estiver ocupada)
- **API Base**: `http://localhost:3000` (ou `http://localhost:3001`)

Cabe ressaltar que a documentação Swagger está disponível apenas quando o servidor está rodando.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Banco de Dados

1. Crie um banco PostgreSQL
2. Execute os scripts na ordem:
   - `script.sql`
   - `seeding.sql`
   - `view.sql`
   - `procedure.sql`

## 📊 Funcionalidades

### ✅ Implementadas

- ✅ Sistema de autenticação JWT
- ✅ CRUD completo de usuários
- ✅ Sistema de avaliação de pratos
- ✅ Comentários nas avaliações
- ✅ Feedback dos usuários
- ✅ Interface web responsiva
- ✅ Validação de dados
- ✅ Upload de imagens para pratos

## 👥 Sobre o Projeto

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Banco de Dados, demonstrando:

- Modelagem de banco de dados relacional
- Desenvolvimento full-stack com tecnologias modernas
- Implementação de APIs RESTful
- Validação e segurança de dados
- Interface de usuário intuitiva

---