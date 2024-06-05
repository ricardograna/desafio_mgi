# Desafio - Gerenciardor de Tarefas

Projeto de gerenciador de tarefas usando Angular e Laravel

## Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. Clone o repositório para o seu ambiente local:

    ```bash
    git clone https://github.com/ricardograna/desafio_mgi.git
    cd desafio_mgi
    ```

2. Na pasta api, crie o arquivo `.env` a partir do arquivo `.env.example`:

    ```bash
    cp api/.env.example api/.env
    ```


3. Execute o comando abaixo para construir e iniciar os contêineres Docker em segundo plano:

    ```bash
    docker compose up -d
    ```

4. Verifique se os contêineres estão em execução:

    ```bash
    docker compose ps
    ```

5. Acesse o aplicativo no navegador usando o endereço `http://localhost`).
