# Frontend Challenge - Todo Board

## Descrição do Projeto

Esta aplicação é um gerenciador de tarefas baseada em quadros, desenvolvida como parte de um desafio técnico para a vaga de Front-end Developer. O objetivo foi criar uma interface funcional e responsiva utilizando Vue 3, sem dependência de bibliotecas externas para as funcionalidades principais.

O projeto foca em arquitetura limpa, separação de responsabilidades e persistência de dados.

## Funcionalidades

- **Gerenciamento de Tarefas:** Criação de novas tarefas na coluna "To Do" e possibilidade de marcá-las como "Done".
- **Drag and Drop Nativo:** Implementação da API HTML5 Drag and Drop para mover tarefas entre colunas.
- **Persistência de Dados:** Salvamento automático do estado da aplicação utilizando o localStorage do navegador.
- **Ordenação Automática:** As tarefas são sempre exibidas ordenadas pela data de criação (mais recentes no topo), independentemente da movimentação entre colunas.
- **Exclusão de Tarefas:** Funcionalidade para remover tarefas permanentemente.
- **Acessibilidade:** Interface desenvolvida com foco em alto contraste e atributos ARIA para suporte a leitores de tela.

## Tecnologias Utilizadas

- **Vue 3:** Utilizando Composition API e script setup.
- **Vite:** Ferramenta de build e servidor de desenvolvimento.
- **CSS3:** Estilização Scoped e responsiva.
- **JavaScript:** Lógica de negócios e manipulação de estado.

## Arquitetura do Projeto

O código foi estruturado visando a escalabilidade e a testabilidade, separando a lógica de negócio da camada de visualização através de Composables.

- **src/components/**: Contém os componentes visuais (UI) responsáveis apenas pela renderização.
- **src/composables/**: Contém os Hooks personalizados que encapsulam a lógica de estado e regras de negócio.
  - `useTaskBoard.js`: Gerencia o estado das listas, ordenação e regras de movimentação.
  - `useTaskStorage.js`: Gerencia a camada de infraestrutura e persistência no LocalStorage.
- **src/constants/**: Centraliza strings e chaves de configuração para evitar valores hardcoded.

## Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:

- Node.js (Versão 16 ou superior recomendada)
- npm (Gerenciador de pacotes)

## Como Rodar o Projeto

Siga os passos abaixo para executar a aplicação em ambiente de desenvolvimento:

1. **Instale as dependências:**
   Abra o terminal na pasta raiz do projeto e execute:
   ```bash
   npm install
2. **Execute o servidor de desenvolvimento:**
   Inicie o projeto localmente:
   ```bash
   npm run dev
3. **Acesse a aplicação:**
   O terminal exibirá o endereço local, geralmente:
   ```bash
   http://localhost:5173