#  Sistema de Inventário Full-Stack 
# (Em Desenvolvimento)

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
- **Java 21**
- **Spring Boot 3.x**
- **Spring Security:** Para autenticação e autorização.
- **Spring Data JPA (Hibernate):** Para acesso a dados.
- **PostgreSQL:** Banco de dados relacional.
- **Maven: 4.0** Gerenciador de dependências.
- **JWT (Java JWT):** Para geração e validação de tokens.

### Frontend
- **React 18**
- **Vite:** Ferramenta de build e servidor de desenvolvimento.
- **React Router DOM:** Para roteamento.
- **Material-UI (MUI):** Biblioteca de componentes de UI.
- **React Toastify:** Para notificações.

---

## ⚙️ Como Executar o Projeto com Docker (Recomendado)

A maneira mais fácil e recomendada de executar este projeto é usando Docker e Docker Compose. Isso garante que todo o ambiente (banco de dados, backend e frontend) seja configurado de forma consistente e automática.

### Pré-requisitos
- **Docker** e **Docker Compose** instalados na sua máquina.

### Executando a Aplicação
1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/paulogx77/inv_sys.git
    cd inv_sys
    ```

2.  **Suba toda a stack com um único comando:**
    Na pasta raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute:
    ```bash
    docker compose up --build
    ```
    *   O comando `--build` é importante na primeira vez para construir as imagens customizadas para o backend e o frontend.
    *   Este comando irá:
        1.  Baixar a imagem do PostgreSQL.
        2.  Construir a imagem da API Spring Boot.
        3.  Construir a imagem da aplicação React.
        4.  Iniciar os três contêineres e conectá-los em uma rede.

3.  **Acesse as aplicações:**
    *   **Frontend (UI):** [http://localhost:5173](http://localhost:5173)
    *   **Backend (API):** [http://localhost:8080](http://localhost:8080)

Para parar toda a aplicação, pressione `Ctrl+C` no terminal onde o compose está rodando e depois execute:
```bash
docker compose down
```

## 🔧 Como Executar o Projeto Manualmente (Desenvolvimento Local)

Se preferir rodar cada parte do projeto isoladamente sem o Docker Compose, siga os passos abaixo.

### Pré-requisitos
- **Java JDK 21** e **Maven 4.0.0** (ou superior) instalados.
- **Node.js 20.x** (ou superior) instalado.
- Uma instância de **PostgreSQL** rodando e acessível.

### 1. Backend (API)

Primeiro, inicie o servidor da API.

1.  **Navegue para a pasta do backend:**
    ```bash
    cd inventario-api
    ```

2.  **Configure a conexão com o banco de dados:**
    Abra o arquivo `src/main/resources/application.properties` e atualize as seguintes propriedades com as credenciais do seu banco de dados:
    ```properties
    spring.datasource.url=jdbc:postgresql://SEU_HOST:5432/SEU_BANCO
    spring.datasource.username=SEU_USUARIO
    spring.datasource.password=SUA_SENHA
    ```

3.  **Execute a aplicação:**
    ```bash
    ./mvnw spring-boot:run
    ```
    A API estará disponível em `http://localhost:8080`.

### 2. Frontend (UI)

Com o backend rodando, inicie a interface do usuário.

1.  **Em um novo terminal, navegue para a pasta do frontend:**
    ```bash
    cd inv-frontend
    ```
2.  **Instale as dependências do projeto:**
    ```bash
    npm install
    ```
3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação estará acessível no seu navegador em `http://localhost:5173` (ou na porta indicada pelo Vite).
