# PROSEL: Desenvolvimento de Sistema para Maqueiros de Hospital Público

**Disciplina**: PROJETO EXTENSIONISTA INTEGRADOR: PROGRAMAÇÃO ORIENTADA A OBJETOS

**Professor**: Msc. João Alberto Castelo Branco Oliveira

## Apresentação 📄
O Hospital Geral Clériston Andrade reconhece a importância de aprimorar o transporte de pacientes dentro da instituição, visando oferecer um serviço mais eficiente e seguro aos usuários. Para atender a essa necessidade, surge a demanda por um sistema que possa facilitar e otimizar as atividades dos maqueiros, responsáveis pelo transporte dos pacientes.

Assim, propõe-se a criação de um sistema que seja capaz de integrar-se harmoniosamente às operações do hospital, proporcionando uma gestão mais eficaz do transporte de pacientes. Ao final da disciplina, o sistema mais adequado e eficiente será selecionado para integração com o sistema já em desenvolvimento.

Este projeto oferece uma oportunidade valiosa para os alunos aplicarem seus conhecimentos teóricos na prática, desenvolvendo uma solução que terá um impacto significativo na qualidade dos serviços prestados pelo hospital. Além disso, contribuirá para a formação profissional dos alunos, preparando-os para enfrentar desafios reais no campo da programação.

## Objetivo 📄
O objetivo deste projeto é capacitar os alunos a aplicar os conceitos e práticas aprendidas na disciplina de Programação Orientada a Objetos de forma a criar um sistema que facilite e otimize as atividades dos maqueiros em um hospital público. O sistema deve abordar as necessidades específicas dos maqueiros, melhorando a eficiência e a comunicação dentro do ambiente hospitalar.

## Descrição do Problema 📄
Os maqueiros em um hospital público enfrentam desafios diários na organização e no transporte de pacientes dentro da instituição. Muitas vezes, a falta de comunicação, recursos limitados e sistemas desatualizados podem dificultar suas tarefas, resultando em atrasos e possíveis impactos na qualidade do atendimento aos pacientes.

## Relatório de Testes
- Acesse o link abaixo para visualizar os testes das rotas da API
- https://drive.google.com/file/d/1VmQyegxHpT7kXAScLt9h5O1uWZfKT8QM/view

## Tecnologias Utilizadas 🛠️

### Frontend
- **Vue.js**: Framework JavaScript progressivo para construir interfaces de usuário.

### Backend
- **Node.js**: Ambiente de execução JavaScript server-side.
- **Express**: Framework para Node.js, utilizado para construir a API RESTful.

### Banco de Dados
- **MySQL**: Sistema de gerenciamento de banco de dados relacional.

### Containers
- **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em containers.

## Pré-requisitos

Para rodar este projeto, você precisará ter as seguintes ferramentas instaladas em sua máquina:
- **Node.js**: [Instalar Node.js](https://nodejs.org/)
- **MySQL**: [Instalar MySQL](https://www.mysql.com/downloads/)

## Estrutura do Projeto

O projeto está dividido em duas principais pastas:
- **api**: Contém o backend da aplicação.
- **web**: Contém o frontend da aplicação.

## Configuração do Banco de Dados ⚙️

A estrutura do banco de dados está localizada na pasta `struct_db` em um arquivo `.sql`. Para configurar o banco de dados:
1. Crie um banco de dados MySQL utilizando o arquivo SQL fornecido.
2. Atualize as variáveis de ambiente do banco de dados no arquivo `db.js` localizado na pasta `api/models`:

   ```javascript
   const db = mysql.createConnection({
     host: 'host',
     user: 'user',
     password: 'password',
     database: 'database',
     port: 0000,
   });
   ```

## Como Rodar o Projeto ⚙️

1. Clone o repositório:

```
git clone https://github.com/jxhnlcs/fullstack_transport-request.git
```

2. Navegue até a pasta api e instale as dependências:

```
cd api
npm install
```
3. Navegue até a pasta web e instale as dependências:

```
cd web
npm install
```

4. Execute o backend:

```
cd api
npm run dev
```

5. Execute o frontend:

```
cd web
npm run dev
```

## Contribuição 🤝

Sinta-se à vontade para contribuir com melhorias neste projeto. Se você encontrou algum problema ou tem alguma sugestão, abra uma issue ou envie um pull request.
