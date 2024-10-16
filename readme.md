# Satisfaction Survey API

Bem-vindo ao **Satisfaction Survey API**, uma API destinada à gestão de pesquisas, permitindo criar, atualizar, listar e responder pesquisas.

## Descrição:

Esta API faz o gerenciamento de pesquisas de satisfação do cliente para um varejista online que está experimentando um crescimento rápido e diversificação de sua base de clientes. A variedade crescente de clientes exige pesquisas personalizadas para grupos demográficos específicos (Geeks e Nerds, Minimalistas, Atletas, etc.). A API aborda isso permitindo:

- **Criação de pesquisas direcionadas**: Cada pesquisa pode ser projetada com perguntas específicas relevantes para um determinado segmento de clientes. Todas as pesquisas incluem perguntas sobre o público-alvo, avaliação geral com uso de estrelas.
- **Atualizações de pesquisas**: Pesquisas existentes podem ser modificadas, incluindo a atualização das perguntas.
- **Preenchimento de pesquisas**: Os clientes enviam as respostas junto com um e-mail para contato, e a API valida os dados em relação às perguntas da pesquisa antes de salvar as respostas.
- **Análise de dados**: A API permite recuperar pesquisas concluídas ordenadas por avaliação de estrelas (crescente ou decrescente).
- **Exportação de dados**: A API permite exportar as respostas para um arquivo CSV.

### Tecnologias Utilizadas:

- **Backend:** Node.js, Express.js, TypeScript
- **Banco de Dados:** MongoDB
- **Gerenciamento de Containers:** Docker
- **Testes:** mocharc

## Instalação

Para instalar a API localmente, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone git@github.com:carvalhocortes/satisfaction-survey-api.git
```

2. Entre na pasta e monte o servidor:

```bash
cd satisfaction-survey-api
docker-compose up --build
```

O servidor será iniciado em `http:/localhost:5000`.

3. **Acessar a API:**
   Baixe aqui a coleção do postman para testar.

## Melhorias Futuras:

- Implementar rotas de visualização.
- Implementar autenticação das rotas
- Criar um sistema de análise de dados para monitorar o desempenho das pesquisas.

## Contribuições:

Contribuições para o desenvolvimento da plataforma Super Cursos são bem-vindas! Para colaborar, siga os seguintes passos:

1. Faça um fork do repositório.
2. Crie um nova branch para suas mudanças.
3. Faça suas alterações e commit.
4. Envie um pull request para o branch principal do repositório.

## Licença:

A API Satisfaction Survey está licenciada sob a licença MIT.

Para mais detalhes sobre os esquemas e exemplos, consulte a documentação OpenAPI.
