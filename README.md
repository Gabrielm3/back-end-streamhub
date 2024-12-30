# Streamhub

## Visão Geral do Projeto

Streamhub é uma aplicação web full-stack que permite aos usuários navegar, pesquisar e assistir filmes online. Ele possui uma interface amigável construída com Next.js e uma API robusta no back-end construída com NestJS. Os usuários podem criar contas, gerenciar seus perfis, adicionar filmes aos favoritos, escrever resenhas e comprar assinaturas premium para uma experiência sem anúncios e acesso a conteúdo exclusivo.

## Estrutura do Projeto

O projeto é dividido em duas partes principais: o front-end e o back-end.

### Back-end (`back-end-cinema-hub`)

O back-end é construído com NestJS e utiliza o Prisma ORM para interações com o banco de dados. Ele expõe uma API RESTful que é consumida pelo front-end.

#### Tecnologias Utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Passport para estratégias de autenticação
- Stripe e Yookassa para processamento de pagamentos
- TypeScript

#### Endpoints da API

A API do back-end fornece endpoints para as seguintes funcionalidades:

- **Autenticação:**
  - `/api/auth/login` (POST): Autenticar um usuário e retornar os tokens JWT.
  - `/api/auth/register` (POST): Registrar um novo usuário.
  - `/api/auth/refresh`: Atualizar os tokens JWT.
- **Usuários:**
  - `/api/users` (GET): Obter todos os usuários (somente para admin).
  - `/api/users/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um usuário específico (somente para admin).
  - `/api/users/profile` (GET): Obter o perfil do usuário atual.
  - `/api/users/profile/favorites` (GET): Obter os filmes favoritos do usuário atual.
- **Filmes:**
  - `/api/movies` (GET, POST): Obter todos os filmes ou criar um novo filme (somente para admin).
  - `/api/movies/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um filme específico (somente para admin).
  - `/api/movies/by-slug/:slug` (GET): Obter um filme pelo seu slug.
  - `/api/movies/by-actor/:actorId` (GET): Obter filmes pelo ID do ator.
  - `/api/movies/by-genres` (POST): Obter filmes pelos IDs de gêneros.
  - `/api/movies/most-popular` (GET): Obter os filmes mais populares.
- **Gêneros:**
  - `/api/genres` (GET, POST): Obter todos os gêneros ou criar um novo gênero (somente para admin).
  - `/api/genres/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um gênero específico (somente para admin).
  - `/api/genres/by-slug/:slug` (GET): Obter um gênero pelo seu slug.
- **Atores:**
  - `/api/actors` (GET, POST): Obter todos os atores ou criar um novo ator (somente para admin).
  - `/api/actors/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir um ator específico (somente para admin).
  - `/api/actors/by-slug/:slug` (GET): Obter um ator pelo seu slug.
- **Resenhas:**
  - `/api/reviews` (GET): Obter todas as resenhas (somente para admin).
  - `/api/reviews/:id` (GET, PUT, DELETE): Obter, atualizar ou excluir uma resenha específica (somente para admin).
  - `/api/reviews/movie/:movieId` (GET): Obter resenhas de um filme específico.
  - `/api/reviews` (POST): Criar uma nova resenha.
- **Pagamentos:**
  - `/api/payments` (GET): Obter todos os pagamentos (somente para admin).
  - `/api/payments/checkout` (POST): Criar uma nova intenção de pagamento.
  - `/api/payments/status` (POST): Atualizar o status de pagamento.
- **Estatísticas:**
  - `/api/statistics/main` (GET): Obter as principais estatísticas (somente para admin).

#### Esquema do Banco de Dados

O esquema do banco de dados é definido em `prisma/schema.prisma`. Ele usa o PostgreSQL como provedor de banco de dados. Os principais modelos são:

- **User (Usuário):** Representa um usuário com atributos como `id`, `createdAt`, `updatedAt`, `email`, `password`, `name`, `avatarPath`, `role`, e `isHasPremium`. Ele possui relacionamentos com `Movie` (favoritos), `Review`, e `Payment`.
- **Movie (Filme):** Representa um filme com atributos como `id`, `createdAt`, `updatedAt`, `title`, `slug`, `poster`, `bigPoster`, `year`, `duration`, `country`, `views`, e `videoUrl`. Ele possui relacionamentos com `User`, `Genre`, `Actor`, e `Review`.
- **Genre (Gênero):** Representa um gênero de filme com atributos como `id`, `createdAt`, `updatedAt`, `name`, `slug`, `description`, e `icon`. Ele possui um relacionamento muitos-para-muitos com `Movie`.
- **Actor (Ator):** Representa um ator com atributos como `id`, `createdAt`, `updatedAt`, `name`, `slug`, e `photoUrl`. Ele possui um relacionamento muitos-para-muitos com `Movie`.
- **Review (Resenha):** Representa uma resenha de filme com atributos como `id`, `createdAt`, `updatedAt`, `rating`, e `text`. Ele possui relacionamentos com `User` e `Movie`.
- **Payment (Pagamento):** Representa um pagamento com atributos como `id`, `createdAt`, `updatedAt`, `status`, e `amount`. Ele possui um relacionamento com `User`.

#### Executando o Back-end

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

### Front-end (`front-end-cinema-hub`)

O front-end é construído com Next.js e utiliza React, React Query, Axios e Tailwind CSS. Ele consome a API do back-end para exibir e interagir com os dados dos filmes.

#### Tecnologias Utilizadas

- Next.js
- React
- React Query
- Axios
- Tailwind CSS
- Geist UI (para fontes)

#### Componentes

O front-end é organizado em componentes, incluindo:

- **MainLayout:** O componente principal que fornece a estrutura para todas as páginas. Inclui um `Header` e um `Sidebar`.
- **Header:** Contém o logo, barra de pesquisa e menu do usuário.
- **Sidebar:** Contém os menus de navegação, incluindo um menu de gêneros e um botão de inscrição.
- **SearchList:** Exibe uma lista de filmes com base na consulta de pesquisa.
- **UserMenu:** Exibe o avatar do usuário e fornece opções para fazer login ou acessar o painel/favoritos.
- **GenreMenu:** Exibe uma lista de gêneros de filmes.
- **Subscribe:** Um componente que incentiva os usuários a se inscreverem no plano premium.
- **Catalog:** Exibe uma lista de filmes com título e descrição opcional.
- **GalleryItem:** Representa um item de filme em uma visualização de galeria.
- **Heading:** Componente para exibir títulos.
- **Description:** Componente para exibir descrições.
- **Button:** Um componente de botão reutilizável.
- **Icon:** Componente para exibir ícones.
- **SkeletonLoader:** Componente para exibir um esqueleto de carregamento.

#### Páginas

O front-end possui as seguintes páginas:

- **Home (`/`)**: Exibe uma lista de filmes e atores em alta.
- **Auth (`/auth`)**: Fornece um formulário para os usuários fazerem login ou se registrarem.
- **Explorer (`/explorer`)**: Permite aos usuários navegar por todos os filmes.
- **Trending (`/trending`)**: Exibe os filmes mais populares.
- **Movie (`/movie/[slug]`)**: Exibe detalhes de um filme específico.
- **Genre (`/genre/[slug]`)**: Exibe filmes pertencentes a um gênero específico.
- **Actor (`/actor/[slug]`)**: Exibe filmes com um ator específico.
- **Premium (`/premium`)**: Fornece informações sobre a assinatura premium.
- **Dashboard (`/dashboard`)**: Exibe o perfil do usuário e opções para gerenciar sua conta.
- **Favorites (`/dashboard/favorites`)**: Exibe os filmes favoritos do usuário.
- **Not Found (`/[...not-found]`)**: Exibe uma página de erro 404.

#### Executando o Front-end

1. Instale as dependências: `npm install`
2. Inicie o servidor de desenvolvimento: `npm run dev`

## Começando

Para começar com o projeto, siga os seguintes passos:

1. Clone o repositório: `git clone <repository-url>`
2. Navegue até o diretório do projeto: `cd cinema-hub`
3. Instale as dependências para o front-end e back-end:
   ```bash
   cd front-end-cinema-hub
   npm install
   cd ../back-end-cinema-hub
   npm install
   ```
4. Configure o banco de dados (veja a seção "Executando o Back-end").
5. Inicie o servidor de desenvolvimento do back-end: `cd back-end-cinema-hub && npm run start:dev`
6. Inicie o servidor de desenvolvimento do front-end: `cd front-end-cinema-hub && npm run dev`
7. Abra o navegador e acesse `http://localhost:3000` para visualizar a aplicação.

## Implantação

Para implantar a aplicação, você precisará construir tanto o front-end quanto o back-end e implantá-los em uma plataforma de hospedagem que suporte aplicações Node.js. Os passos específicos dependerão da plataforma escolhida.

Para o back-end, você pode usar o comando `npm run build` para criar uma versão de produção.

Para o front-end, você pode usar o comando `npm run build` para criar uma versão de produção.

Certifique-se de configurar as variáveis de ambiente necessárias na plataforma de hospedagem, incluindo `DATABASE_URL` e quaisquer chaves de API ou segredos exigidos pela aplicação.
