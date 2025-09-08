#  Sistema de Inventário Full-Stack

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-darkblue?logo=postgresql)
![MUI](https://img.shields.io/badge/MUI-5-blue?logo=mui)

Este é um projeto de um Sistema de Inventário completo, construído com uma arquitetura moderna utilizando Java e Spring Boot no backend, e React com Material-UI no frontend. A aplicação permite o gerenciamento completo de produtos, incluindo criação, leitura, atualização e deleção (CRUD), com funcionalidades avançadas como paginação, busca e segurança baseada em tokens JWT.

---

## 🚀 Funcionalidades Principais

### Backend (API REST)
- **CRUD Completo:** Gerenciamento total de produtos.
- **Segurança:** Autenticação e autorização via Spring Security com Tokens JWT.
- **Paginação e Ordenação:** A API serve dados de forma eficiente, ideal para grandes volumes de registros.
- **Busca:** Endpoint para filtrar produtos por nome.
- **Validação de Dados:** Garante a integridade dos dados que entram no sistema.
- **Banco de Dados:** Persistência de dados com PostgreSQL.

### Frontend (React SPA)
- **Interface Reativa:** Construída com React e Vite para uma experiência de desenvolvimento rápida.
- **Componentização:** UI organizada em componentes reutilizáveis.
- **Estilização Profissional:** Utiliza a biblioteca de componentes Material-UI (MUI) para um design moderno e responsivo.
- **Roteamento:** Navegação entre diferentes "telas" (lista e formulários) sem recarregar a página, usando `react-router-dom`.
- **Experiência do Usuário (UX):**
    - Feedback em tempo real com notificações (toasts) de sucesso e erro.
    - Indicadores de carregamento (loading spinners) durante as operações de API.
    - Paginação e busca interativas na lista de produtos.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Security:** Para autenticação e autorização.
- **Spring Data JPA (Hibernate):** Para acesso a dados.
- **PostgreSQL:** Banco de dados relacional.
- **Maven:** Gerenciador de dependências.
- **JWT (Java JWT):** Para geração e validação de tokens.

### Frontend
- **React 18**
- **Vite:** Ferramenta de build e servidor de desenvolvimento.
- **React Router DOM:** Para roteamento.
- **Material-UI (MUI):** Biblioteca de componentes de UI.
- **React Toastify:** Para notificações.

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Java JDK 17** ou superior.
- **Node.js 20.x** ou superior (com npm).
- **Maven**
- Uma instância de **PostgreSQL** rodando (localmente ou na nuvem como o NeonDB).
- Uma IDE para Java (ex: IntelliJ IDEA, VS Code) e um editor de código para o frontend (ex: VS Code).

### 1. Backend
```bash
# Navegue para a pasta do backend (ex: inventario-api)
cd inventario-api

# Configure o banco de dados
# Abra o arquivo `src/main/resources/application.properties` e
# atualize as propriedades `spring.datasource.url`, `username` e `password`
# com as credenciais do seu banco de dados PostgreSQL.

# Instale as dependências e execute a aplicação
./mvnw spring-boot:run
