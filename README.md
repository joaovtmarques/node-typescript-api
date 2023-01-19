# Users API

## 🌐 Deploy Railway

- [Acesse aqui!](https://node-typescript-api-production.up.railway.app/docs)

<br>

## 👨‍💻 Tecnologias e bibliotecas

#### Este sistema foi desenvolvido com as seguintes tecnologias e bibliotecas:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)

<br>

## ℹ️ Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern

<br>

## ℹ️ Entidades

<pre>
User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}</pre>

<br>

## 🛣️ Rotas

<details open>
<summary></summary>

- GET /users - retorna os usuários salvos
- POST /users - cria um usuário
- PATCH /users/:id - atualiza um usuário
- DELETE /users/:id - deleta um usuário
</details>

<br>

## ℹ️ Arquitetura

![Arquitetura](https://imgur.com/k5mXFoZ.png)

<br>

## ℹ️ Como rodar a aplicação

### Pré-requisitos

Para clonar e rodar a aplicação, é necessário ter instalado em sua máquina as ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) (opcional).
Além disso, é bom que se tenha um bom editor de código, como o [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/joaovtmarques/users-typescript-api>

# Acesse a pasta do projeto no terminal
$ cd users-typescript-api

# Instale as dependências
$ npm install ou yarn install

# Faça o build da aplicação
$ npm run build ou yarn run build

# Execute
$ npm start ou yarn start

# A aplicação deve iniciar no
$ localhost:8000

# Acesse a documentação de rotas em
$ localhost:8000/docs
```
