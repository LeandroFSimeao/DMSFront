Front-end da API em ReactJS
Este repositório contém o Front-end em ReactJS para a API Back-end construída em .NET Core. O projeto foi desenvolvido como parte da disciplina de Projetos Integrados do curso de pós-graduação em Desenvolvimento Web Full-Stack da PUC Minas.

Pré-requisitos
Node.js
npm ou Yarn
A API Back-end em .NET Core já configurada e em execução

Configuração
Clone este repositório em sua máquina local:

bash
git clone https://github.com/LeandroFSimeao/DMSFront.git
No diretório raiz do projeto, instale as dependências necessárias:

bash
npm install
ou

bash
yarn install

env
REACT_APP_API_URL=http://dmsback-env.eba-dsmce2qe.us-east-1.elasticbeanstalk.com/

Uso
Inicie o servidor de desenvolvimento executando o seguinte comando:

bash
npm start
ou

bash
yarn start

O Front-end será executado localmente em http://localhost:3000 e estará conectado à API Back-end configurada.
