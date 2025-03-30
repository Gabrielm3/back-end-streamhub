# Streamhub

## Visão Geral do Projeto

Streamhub é uma aplicação web full-stack que permite aos usuários navegar, pesquisar e assistir filmes online. Ele possui uma interface amigável construída com Next.js e uma API robusta no back-end construída com NestJS. Os usuários podem criar contas, gerenciar seus perfis, adicionar filmes aos favoritos, escrever resenhas e comprar assinaturas premium para uma experiência sem anúncios e acesso a conteúdo exclusivo.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: o front-end e o back-end.

### Back-end (`back-end-cinema-hub`)

O back-end é construído com NestJS e utiliza o Prisma ORM para interações com o banco de dados. Ele expõe uma API RESTful que é consumida pelo front-end.

#### Tecnologias Utilizadas

-   NestJS
-   Prisma ORM
-   PostgreSQL
-   JWT para autenticação
-   Passport para estratégias de autenticação
-   Stripe e Yookassa para processamento de pagamentos
-   TypeScript

#### Endpoints da API

A API do back-end fornece endpoints para as seguintes funcionalidades:

-   **Autenticação:**
    -   `/api/auth/login` (POST): Autenticar um usuário e retornar os tokens JWT.
    -   `/api/auth/register` (POST): Registrar um novo usuário.
    -   `/api/auth/refresh`: Atualizar os tokens JWT.
-   **Usuários:**
    -   `/api/users` (GET): Obter todos os usuários (somente para admin).
    -   `/api/users/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um usuário específico (somente para admin).
    -   `/api/users/profile` (GET): Obter o perfil do usuário atual.
    -   `/api/users/profile/favorites` (GET): Obter os filmes favoritos do usuário atual.
-   **Filmes:**
    -   `/api/movies` (GET, POST): Obter todos os filmes ou criar um novo filme (somente para admin).
    -   `/api/movies/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um filme específico (somente para admin).
    -   `/api/movies/by-slug/:slug` (GET): Obter um filme pelo seu slug.
    -   `/api/movies/by-actor/:actorId` (GET): Obter filmes pelo ID do ator.
    -   `/api/movies/by-genres` (POST): Obter filmes pelos IDs de gêneros.
    -   `/api/movies/most-popular` (GET): Obter os filmes mais populares.
-   **Gêneros:**
    -   `/api/genres` (GET, POST): Obter todos os gêneros ou criar um novo gênero (somente para admin).
    -   `/api/genres/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um gênero específico (somente para admin).
    -   `/api/genres/by-slug/:slug` (GET): Obter um gênero pelo seu slug.
-   **Atores:**
    -   `/api/actors` (GET, POST): Obter todos os atores ou criar um novo ator (somente para admin).
    -   `/api/actors/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um ator específico (somente para admin).
    -   `/api/actors/by-slug/:slug` (GET): Obter um ator pelo seu slug.
-   **Resenhas:**
    -   `/api/reviews` (GET): Obter todas as resenhas (somente para admin).
    -   `/api/reviews/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir uma resenha específica (somente para admin).
    -   `/api/reviews/movie/:movieId` (GET): Obter resenhas de um filme específico.
    -   `/api/reviews` (POST): Criar uma nova resenha.
-   **Pagamentos:**
    -   `/api/payments` (GET): Obter todos os pagamentos (somente para admin).
    -   `/api/payments/checkout` (POST): Criar uma nova intenção de pagamento.
    -   `/api/payments/status` (POST): Atualizar o status de pagamento.
-   **Estatísticas:**
    -   `/api/statistics/main` (GET): Obter as principais estatísticas (somente para admin).

#### Esquema do Banco de Dados

O esquema do banco de dados é definido em `prisma/schema.prisma`. Ele usa o PostgreSQL como provedor de banco de dados. Os principais modelos são:

-   **User (Usuário):** Representa um usuário com atributos como `id`, `createdAt`, `updatedAt`, `email`, `password`, `name`, `avatarPath`, `role`, e `isHasPremium`. Ele possui relacionamentos com `Movie` (favoritos), `Review`, e `Payment`.
-   **Movie (Filme):** Representa um filme com atributos como `id`, `createdAt`, `updatedAt`, `title`, `slug`, `poster`, `bigPoster`, `year`, `duration`, `country`, `views`, e `videoUrl`. Ele possui relacionamentos com `User`, `Genre`, `Actor`, e `Review`.
-   **Genre (Gênero):** Representa um gênero de filme com atributos como `id`, `createdAt`, `updatedAt`, `name`, `slug`, `description`, e `icon`. Ele possui um relacionamento muitos-para-muitos com `Movie`.
-   **Actor (Ator):** Representa um ator com atributos como `id`, `createdAt`, `updatedAt`, `name`, `slug`, e `photoUrl`. Ele possui um relacionamento muitos-para-muitos com `Movie`.
-   **Review (Resenha):** Representa uma resenha de filme com atributos como `id`, `createdAt`, `updatedAt`, `rating`, e `text`. Ele possui relacionamentos com `User` e `Movie`.
-   **Payment (Pagamento):** Representa um pagamento com atributos como `id`, `createdAt`, `updatedAt`, `status`, e `amount`. Ele possui um relacionamento com `User`.

#### Executando o Back-end

### 1. Installation

1. Instale as dependências: `npm install`
2. Configure o banco de dados:
    - Certifique-se de ter o PostgreSQL instalado e em execução.
    - Crie um banco de dados para a aplicação.
    - Defina a variável de ambiente `DATABASE_URL` em um arquivo `.env` na raiz do diretório do back-end. Exemplo:
        ```
        DATABASE_URL="postgresql://user:password@localhost:5432/cinema-hub?schema=public"
        ```
    - Execute `npx prisma migrate dev` para criar as tabelas do banco de dados.
    - Execute `npx prisma db seed` para popular o banco de dados com dados iniciais.
3. Inicie o servidor de desenvolvimento: `npm run start:dev`

## Contribuindo

Agradecemos contribuições para o StreamHub! Veja como você pode ajudar:

### Processo de Pull Request

1. Faça um fork do repositório
2. Crie sua branch de feature: `git checkout -b feature/minha-nova-feature`
3. Faça commit das suas alterações: `git commit -am 'Adiciona alguma feature'`
4. Envie para a branch: `git push origin feature/minha-nova-feature`
5. Envie um pull request
