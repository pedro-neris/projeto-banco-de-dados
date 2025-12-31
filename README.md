Este projeto implementa um sistema completo de avaliação de pratos de um Restaurante Universitário (RU). O sistema permite com que usuários avaliem, comentem e forneçam feedback sobre as refeições. Inclui funcionalidades de autenticação, gestão de usuários, avaliações, comentários e relatórios. Vale ressaltar que este projeto foi feito para fins educacionais, logo, não é um app real com opiniões sobre o RU da Universidade de Brasília. 

## Ferramentas utilizadas 
- TypeScript (linguagem comum para o backend e frontend)
- NestJs (framework utilizado para o backend)
- JWT Decode (autenticação)
- NextJs (framework utilizado para o frontend)
- Toastify (biblioteca para design de notificações no frontend)
- Axios (biblioteca utilizada para realizar/retornar as requisições HTTP)
- PostgreSQL (banco de dados relacional)

## Pré-requisitos
- Node.js
- PostgreSQL
- npm
 
## Estrutura do projeto

```
├── backend/          # API REST com NestJS
├── frontend/         # Interface web com Next.js
└── sql/             # Scripts de banco de dados
```
## Banco de Dados

### Estrutura Principal
Foi utilizado um banco de dados relacional, modelado pelo grupo de acordo com as restrições e definições da aplicação. As tabelas e relacionamentos podem ser vistas na pasta 'sql/schema.sql'.  O banco  possui as seguintes entidades principais:

- **Prato** - Informações dos pratos (nome, categoria, ícone)
- **User** - Dados dos usuários
- **Avaliacao** - Avaliações dos pratos pelos usuários
- **Comentario** - Comentários nas avaliações
- **Feedback** - Feedback geral do sistema
- **Campus** - Campus universitários
- **Setor** - Setores dos campus

## Backend
### Arquitetura Module/Controller/Service

O backend segue o padrão arquitetural do NestJS, organizando o código em módulos que encapsulam funcionalidades relacionadas. Foram implementadas funções CRUDs comuns para todas as tabelas do banco de dados, com certas especializações em alguma das funcionalidades quando necessário (todas as funcionalidades estão documentadas no Swagger da API). Foi seguido o padrão RESTful para o desenvolvimento da API. Os endpoints estão detalhados na documentação Swagger da API. 


### **Documentação em Swagger da API**: 
- `http://localhost:3000/api/docs`
Cabe ressaltar que a documentação Swagger está disponível apenas quando o servidor está rodando.

#### **Estrutura dos Módulos**

Cada domínio do sistema possui sua própria pasta com:
- **Module**: Configuração do módulo (imports, providers, controllers)
- **Controller**: Definição das rotas e tratamento de requisições HTTP
- **Service**: Lógica de negócios e regras de validação
- **Entity**: Interface que define a estrutura dos dados
- **DTOs**: validação de entrada quando se quer inserir/editar dados no banco de dados

### 🔗 Conexão com Banco de Dados

O banco de dados foi conectado diretamente com a aplicação, utilizando variáveis de ambiente e a biblioteca **pg** (node-postgres). Demais informações podem ser encontradas na pasta '\backend\src\database'. Variáveis de ambiente também foram utilizadas para executar esta conexão de forma segura, e é possível observar os logs com os status de resposta das *queries* SQL e seus tempos de conexão.

### 🛡️ Validação de Requisições HTTP

O sistema utiliza **class-validator** e **class-transformer** para validação de requisições, sendo criados DTOs para os tipos create/update que recebem argumentos da requisição, garantindo com que esses argumentos sejam consistentes com as especificações do banco, cumprindo, assim, o contrato da API.

### Autenticação

- **JWT (JSON Web Tokens)** para autenticação stateless
- **bcryptjs** para hash de senhas
- **Passport.js** com estratégia JWT
- Middleware de autenticação para rotas protegidas

### Tecnologias Utilizadas

- **Next.js 15**
- **TypeScript** 
- **Tailwind CSS** 
- **Axios**
- **Toastify** 

## Execução do projeto

### Pré-requisitos

- **Node.js** - [Download aqui](https://nodejs.org/)
- **PostgreSQL** - [Download aqui](https://www.postgresql.org/download/)

### 🗄️ 1. Configuração do Banco de Dados

#### Passo 1: Criar banco PostgreSQL (utilizando pgAdmin)
```sql
CREATE DATABASE avaliaru;
```

#### Passo 2: Executar scripts SQL
```bash
cd sql
psql -U seu_usuario -d avaliaru -f script.sql
```
#### Passo 3 (opcional): executar o seeding do banco de dados para simular dados pré-existentes
```bash
cd sql
psql -U seu_usuario -d avaliaru -f seeding.sql
```

###  2. Configuração do Backend (API)

```bash
cd backend
npm install
npm install @nestjs/swagger@^8.0.0

# Configuração das variáveis de ambiente 
# Edite o arquivo .env no diretório backend/ com suas credenciais:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=seu_usuario_postgresql
# DB_PASSWORD=sua_senha_postgresql
# DB_NAME=avaliaru

# 5. Inicie o servidor em modo desenvolvimento
npm run start:dev
```

### 🌐 3. Configuração do Frontend (Interface Web)
```bash
cd frontend/my-app
npm install
npm run dev
```
- Obs: o backend deve ser inicializado antes do frontend

## 🔗 Como o Frontend consome a API 

O frontend Next.js se comunica com a API NestJS através de requisições HTTP usando **Axios**. Esta comunicação segue o padrão REST e utiliza autenticação JWT. O frontend utiliza os endpoints da API, e recebe a resposta para mostrar na interface web (métodos GET), ou envia requisições com argumentos coletados na interface para alterar o banco de dados (métodos POST, PUT e DELETE). 

### Fluxo de Autenticação

1. **Login**: `POST /auth/login`
   - Frontend envia credenciais
   - Backend retorna JWT token
   - Token é armazenado no localStorage

2. **Requisições Autenticadas**:
   - Token JWT é incluído no header `Authorization: Bearer <token>`
   - Backend valida o token em cada requisição
   - Usuário tem acesso aos dados protegidos

##  Acesso ao sistema

### **Documentação da API (Swagger)**
- **URL**: `http://localhost:3000/api/docs`

###  **Interface Web (Frontend)**
- **URL**: `http://localhost:3001`
- **Funcionalidades**: Cadastro, login, avaliações, feed de posts

###  **API diretamente (backend)**
- **URL Base**: `http://localhost:3000`



