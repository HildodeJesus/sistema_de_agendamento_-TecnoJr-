## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentação da API

#### Pegar um usuário no BD através da número do usuário

```http
  GET /user
```

| Parâmetro | Tipo     | Descrição                                                    |
| :-------- | :------- | :----------------------------------------------------------- |
| `code`    | `string` | **Obrigatório**. Código que o cliente recebeu por SMS        |
| `phone`   | `string` | **Obrigatório**. Celular do cliente cadastrado anteriormente |

#### Logar em alguma conta com um número de celular

```http
  POST /user
```

| Parâmetro  | Tipo     | Descrição                                                            |
| :--------- | :------- | :------------------------------------------------------------------- |
| `name`     | `string` | **Obrigatório**. Nome do cliente                                     |
| `email`    | `string` | **Obrigatório**. Email do cliente                                    |
| `password` | `string` | **Obrigatório**. Senha para segurança da conta definida pelo cliente |

## Stay in touch

- Linkedin of Author - [Hildo Jesus](https://www.linkedin.com/in/hildo-jesus/)
- Instagram of Author - [hildoneto.dev](https://www.instagram.com/hildoneto.dev/)
- GitHub of Author - [@HildodeJesus](https://github.com/HildodeJesus/)
