# 🎬 Cinemovies - Fullstack Movie Platform

O **Cinemovies** é uma aplicação web fullstack desenvolvida para entusiastas do cinema. A plataforma permite que os usuários explorem filmes populares, realizem buscas por títulos e gerenciem uma lista personalizada de favoritos. O projeto conta com um sistema de autenticação robusto e integração com a API do TMDB para dados em tempo real.

---

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- **Login e Registro:** Sistema de autenticação utilizando **JWT (JSON Web Tokens)**.
- **Proteção de Rotas:** Acesso restrito à página de favoritos apenas para usuários autenticados.
- **Persistência de Sessão:** O estado do usuário é mantido de forma segura no navegador.

### 🎥 Exploração de Filmes
- **Página Inicial:** Exibição de filmes populares e tendências utilizando componentes interativos (Swiper).
- **Busca Global:** Barra de pesquisa para encontrar qualquer filme disponível na base de dados do TMDB.
- **Cards Detalhados:** Visualização de pôsteres, notas (rating) e ano de lançamento.

### 💖 Gestão de Favoritos
- **Adicionar/Remover:** Funcionalidade de favoritar filmes diretamente nos cards.
- **Página de Favoritos:** Área dedicada para visualizar todos os filmes salvos pelo usuário.
- **Busca em Favoritos:** Filtro de busca por título dentro da própria lista de favoritos do usuário.
- **Persistência no Backend:** Diferente de versões anteriores que usavam `localStorage`, agora os favoritos são salvos no **MongoDB**, garantindo que o usuário acesse sua lista de qualquer dispositivo.

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js:** Biblioteca principal para construção da interface.
- **Vite:** Ferramenta de build e servidor de desenvolvimento ultra-rápido.
- **Axios:** Cliente HTTP para consumo da API do backend.
- **Context API:** Gerenciamento de estado global (Autenticação e Favoritos).
- **Swiper:** Biblioteca para criação de carrosséis modernos e responsivos.
- **CSS3:** Estilização personalizada com foco em experiência do usuário (UX).

### Backend
- **Node.js & Express:** Ambiente de execução e framework para a API REST.
- **MongoDB:** Banco de dados NoSQL para armazenamento de usuários e favoritos.
- **Mongoose:** ODM para modelagem de dados e interação com o MongoDB.
- **JWT:** Implementação de segurança para rotas protegidas.
- **Docker:** Containerização da aplicação para facilitar o deploy e ambiente de desenvolvimento.

---

## 📦 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/cinemovies.git
cd cinemovies
```

### 2. Configurar o Backend (Docker)
Navegue até a pasta do backend e inicie os serviços:
```bash
cd backend
docker-compose up --build -d
```
O backend estará rodando em `http://localhost:3001`.

### 3. Configurar o Frontend
Navegue até a pasta do frontend, instale as dependências e inicie o servidor:
```bash
cd ../frontend
npm install
npm run dev
```
O frontend estará acessível em `http://localhost:5173`.

---

## 🔧 Configuração de Proxy (CORS)
Para evitar problemas de CORS em diferentes ambientes (como Linux/Ubuntu), o projeto utiliza o proxy do Vite. As requisições feitas para `/api` no frontend são automaticamente redirecionadas para o backend na porta `3001`.

---

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ por [Seu Nome]
