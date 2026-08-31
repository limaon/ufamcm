# Documento de Requisitos e Arquitetura - Campus Map V4

## 1. Introducao

Este documento descreve a arquitetura tecnica e os requisitos funcionais e nao funcionais do Campus Map UFAM v4. Destina-se a equipe do CTIC para subsidiar as decisoes de infraestrutura, operacao e manutencao do sistema.

O Campus Map e uma aplicacao web GIS (Sistema de Informacao Geografica) para gestao colaborativa do campus da Universidade Federal do Amazonas. A versao 4 representa uma migracao da v3 (SPA com dados estaticos) para uma arquitetura full-stack containerizada com banco de dados geoespacial.

### 1.1. Escopo do Documento

- Visao Geral do Sistema e seus modulos
- Arquitetura Tecnica: camadas, containers e tecnologias
- Requisitos Funcionais por Modulo
- Requisitos Nao Funcionais: desempenho, seguranca, disponibilidade e manutenibilidade
- Integracoes com Servicos Externos

## 2. Visao Geral do Sistema

O Campus Map UFAM e uma plataforma web acessivel via navegador, sem instalacao de software pelo usuario final. O sistema permite tres perfis de uso distintos com permissoes progressivas.

### 2.1. Perfis de Usuario

| Perfil        | Acesso                                   | Capacidades                                                            |
| ------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| Publico       | Sem autenticacao - acesso livre          | Visualizar mapa, trilhas, arvores e indicadores ambientais             |
| Editor        | Login com credenciais - perfil de edicao | Tudo do Publico + criar/editar features no mapa (aguardam aprovacao)   |
| Administrador | Login com credenciais - perfil de adm    | Tudo do Editor + aprovar/rejeitar features, gerenciar usuarios e dados |

### 2.2. Modulos do Sistema

| Modulos                | Paginas        | Descricao                                                                                                                                 |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Mapa Principal         | MapPage        | Visualizacao interativa com OpenLayers. Camadas WMS do GeoServer UFAM, Basemaps: OSM, Satelite, 3D urbano. Popup de detalhes por feature. |
| Edicao de Features     | EditPage       | Ferramentas de desenho do OpenLayers (ponto, linha, poligono). 22 tipos de feature configuráveis. Fluxo de aprovacao via tickets.         |
| Trilhas e Street View  | TrailsPage     | 7 trilhas mapeadas na Reserva Florestal com pontos interativos. Integracao Mapillary para navegacao em imagens 360 graus.                 |
| Arvores e 3D           | TreesPage      | Catalogo de 8 especies arboreas georeferenciadas. Visualizacao de modelos 3D via X3DOM. Localizacao no mapa via Mapbox.                   |
| Indicadores Ambientais | IndicatorsPage | Dados de consumo energetico, residuos e equipamentos por bloco. 9 blocos catalogados. Visualizacao com graficos.                          |
| Administracao          | AdminPage      | Painel de aprovacao de features pendentes. Gerenciamento de usuarios e permissoes. Restrito ao perfil Administrador.                      |
| Autenticacao           | LoginPage      | Login com usuario e senha. JWT com refresh token. RBAC baseado em roles no banco de dados.                                                |

## 3. Arquitetura

A v4 adota uma arquitetura de quatro camadas containerizadas e orquestradas por Docker Compose. Cada camada tem responsabilidade unica e se comunica apenas com as camadas adjacentes.

### 3.1. Visao em Camadas

| #   | Camada   | Tecnologia                  | Porta  | Responsabilidade                                                                                |
| --- | -------- | --------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| 1   | Frontend | Next.js 16 (App Router)     | 3000   | Interface do usuario - SPA puro, sem logica de negocio. Consume a API REST do backend.          |
| 2   | Backend  | Node.js 20 + Express        | 3001   | API MVC - controllers, services, models. Autenticacao JWT. Regras de negocio e acesso ao banco. |
| 3   | Banco    | PostgreSQL 16 + PostGIS 3.4 | 5432   | Persistencia de dados geoespaciais com indices GIST. Consultas espaciais via ST_* functions.    |
| 4   | Proxy    | Nginx Alpine                | 80/443 | Roteamento de trafego: / -> frontend, /api/ -> backend. Terminacao SSL em producao.             |

### 3.2. Estrutura de Pastas - Back (MVC)

O backend segue o padrao MVC com separacao estrita de responsabilidades:

| Pasta            | Responsabilidade                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------- |
| src/controllers/ | Recebe a requisicao HTTP, valida o input e chama o service. Nao contem logica de negocio. |
| src/services/    | Contem toda a logica de negocio (validacoes, transformacoes, regras). Chama os models.    |
| src/models/      | Queries SQL/PostGIS via Knex.js. Unica camada que acessa o banco diretamente.             |
| src/middlewares/ | Verificacao de JWT, RBAC por role, rate limiting e tratamento de erros.                   |
| src/lib/db.ts    | Singleton de conexao com o PostgreSQL - pool unico compartilhado.                         |
| src/types/       | Interfaces TypeScript compatibilhadas entre todas as camadas.                             |
| src/migrations/  | Scripts Knex.js para criacao e versionamento do schema do banco.                          |
| src/seeds/       | Dados iniciais: roles, usuarios padrao e dados migrados da v3.                            |

### 3.3. Servicos Externos

| Servico   | Finalidade                                   | Protocolo  | Observacao                            |
| --------- | -------------------------------------------- | ---------- | ------------------------------------- |
| Mapbox    | Basemap para TreesPage e IndicatorsPage      | REST/HTTPS | Token configurado via MAPBOX_TOKEN    |
| Mapillary | Street View nas trilhas da Reserva Florestal | REST/HTTPS | Token configurado via MAPILLARY_TOKEN |

## 4. Requisitos Funcionais

Os requisitos funcionais descrevem os comportamentos e funcionalidades que o sistema deve implementar. Estao organizados por modulo e identificados por codigo unico.

### 4.1. Requisitos Funcionais - Mapa Principal

| ID    | Requisito               | Descricao do Requisito                                                                                             |
| ----- | ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| RF001 | Exibir mapa base        | O sistema deve renderizar o mapa interativo com zoom e pan. Suporte a OpenStreetMap, Satelite e basemap 3D urbano. |
| RF002 | Carregar camadas WMS    | O sistema deve consumir e exibir as camadas Arvores, Edificacoes e Vias do GeoServer da UFAM via protocolo WMS.    |
| RF003 | Exibir popup de feature | Ao clicar em uma feature no mapa, exibir popup com nome, tipo, descricao e responsavel.                            |
| RF004 | Filtrar camadas         | O usuario deve poder ativar/desativar camadas individualmente no mapa.                                             |

### 4.2. Requisitos Funcionais - Edicao de Features

| ID    | Requisito                | Descricao do Requisito                                                                                                |
| ----- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| RF005 | Buscar localizacao       | O sistema deve permitir busca por nome de edificacao ou coordenada.                                                   |
| RF006 | Desenhar features        | Editores devem poder desenhar pontos, linhas e poligonos no mapa usando as ferramentas do OpenLayers.                 |
| RF007 | Classificar feature      | Ao criar uma feature, o editor deve selecionar um dos 22 tipos disponiveis e preencher nome, responsavel e descricao. |
| RF008 | Fluxo de aprovacao       | Features criadas por editores ficam com status 'pending' ate serem aprovadas ou rejeitadas por um administrador.      |
| RF009 | Editar feature existente | Editores podem editar geometria e atributos de features que criaram. Admins podem editar qualquer feature.            |
| RF010 | Excluir feature          | Apenas administradores podem excluir features do mapa permanentemente.                                                |

### 4.3. Requisitos Funcionais - Trilhas e Street View

| ID    | Requisito               | Descricao do Requisito                                                                                      |
| ----- | ----------------------- | ----------------------------------------------------------------------------------------------------------- |
| RF011 | Listar trilhas          | O sistema deve exibir as 7 trilhas mapeadas da Reserva Florestal com nome e tracado no mapa.                |
| RF012 | Navegar em trilha       | Ao selecionar um ponto de trilha, abrir o visualizador Mapillary com a imagem 360 graus correspondente.     |
| RF013 | Navegar sequencialmente | O usuario deve poder avancar e voltar entre os pontos de sequencialmente uma trilha dentro do visualizador. |

### 4.4. Requisitos Funcionais - Arvores e 3D

| ID    | Requisito                  | Descricao do Requisito                                                                                       |
| ----- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| RF014 | Listar especies            | O sistema deve exibir as 8 especies arboreas catalogadas com nome popular, cientifico e descricao ecologica. |
| RF015 | Localizar arvore no mapa   | Ao selecionar uma arvore, centralizar o mapa Mapbox na coordenada georeferenciada da especie.                |
| RF016 | Visualizar modelo 3D       | O sistema deve renderizar o modelo 3D da arvore via X3DOM em modal ao clicar no botao de visualizacao.       |
| RF017 | Exibir indicadores no mapa | O sistema deve exibir os 9 blocos do campus como pontos no mapa com popup de dados ambientais.               |

### 4.5. Requisitos Funcionais - Indicadores Ambientais e Administracao

| ID    | Requisito                   | Descricao do Requisito                                                                                                              |
| ----- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| RF018 | Detalhar bloco              | Ao clicar em um bloco, exibir: consumo kWh/mes, numero de lampadas, ACs, tomadas e residuos/mes.                                    |
| RF019 | Comparar blocos             | O sistema deve permitir visualizacao comparativa dos indicadores entre blocos.                                                      |
| RF020 | Login com credenciais       | Rotas e acoes devem ser protegidas por perfil: publico (sem token), editor (token + role editor/admin), admin (token + role admin). |
| RF021 | Controle de acesso por role | Administradores devem visualizar features pendentes e aprovar ou rejeitar com justificativa.                                        |
| RF022 | Painel de aprovacao         | Administradores devem poder criar, editar e desativar contas de editores.                                                           |
| RF023 | Gerenciar usuarios          | O sistema deve invalidar o token JWT ao fazer logout e redirecionar para a pagina publica.                                          |
| RF024 | Logout                      | Rotas e acoes devem ser protegidas por perfil: publico (sem token), editor (token + role editor/admin), admin (token + role admin). |

## 5. Requisitos Nao Funcionais

Os requisitos nao funcionais definem as qualidades e restricoes do sistema. Sao divididos em seis categorias: desempenho, seguranca, disponibilidade, manutenibilidade, usabilidade e portabilidade.

### 5.1. Desempenho

| ID     | Requisito                      | Descricao do Requisito                                                                                                                                   |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF001 | Tempo de resposta da API       | Endpoints da API REST devem responder em menos de 500ms para consultas simples e menos de 2s para consultas espaciais complexas (ST_Within, ST_DWithin). |
| RNF002 | Carregamento inicial do mapa   | O mapa principal deve estar interativo em menos de 3 segundos em conexao de 10 Mbps.                                                                     |
| RNF003 | Suporte a usuarios simultaneos | O sistema deve suportar pelo menos 50 usuarios simultaneos sem degradacao perceptivel de desempenho.                                                     |

### 5.2. Seguranca

| ID     | Requisito                   | Descricao do Requisito                                                                                            |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| RNF004 | Indices espaciais           | Todas as colunas de geometria devem ter indice GIST para garantir desempenho em consultas espaciais.              |
| RNF005 | Autenticacao JWT            | Tokens JWT devem ter expiracao de 8 horas e ser assinados com chave secreta de no minimo 256 bits.                |
| RNF006 | Hash de senhas              | Senhas devem ser armazenadas com bcrypt (salt rounds >= 12). Nunca armazenar senha em texto plano.                |
| RNF007 | HTTPS em producao           | Toda comunicacao em producao deve usar HTTPS. O Nginx deve redirecionar HTTP -> HTTPS.                            |
| RNF008 | Protecao contra injecao SQL | Todas as queries devem usar parametros vinculados via Knex.js. Nenhuma concatenacao de strings SQL.               |
| RNF009 | CORS configurado            | O backend deve aceitar requisicoes apenas do dominio do frontend definido em FRONTEND_URL.                        |
| RNF010 | Secrets fora do codigo      | Nenhum token, senha ou chave secreta deve ser commitido no repositorio. Uso obrigatorio de variaveis de ambiente. |
| RNF011 | Headers de seguranca        | O backend deve usar Helmet.js para configurar headers HTTP de seguranca (CSP, HSTS, X-Frame-Options).             |

### 5.3. Disponibilidade

| ID     | Requisito             | Descricao do Requisito                                                                                                 |
| ------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| RNF012 | Restart automatico    | Todos os containers devem ter politica restart: unless-stopped no Docker Compose.                                      |
| RNF013 | Healthcheck do banco  | O container do PostgreSQL deve ter healthcheck configurado. Backend so inicia apos banco estar healthy.                |
| RNF014 | Persistencia de dados | Os dados do PostgreSQL devem ser armazenados em volume Docker nomeado, garantindo persistencia entre reinicializacoes. |
| RNF015 | Backup do banco       | O banco deve ter politica de backup definida pelo CTIC. O docker-compose deve exporr a porta 5432 apenas internamente. |
| RNF016 | Migrations            | Toda alteracao no schema do banco deve ser feita via migration Knex.js. Nunca alterar o banco manualmente.             |

### 5.4. Manutenibilidade

| ID     | Requisito                      | Descricao do Requisito                                                                                               |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| RNF017 | Separacao MVC estrita          | Nenhuma query SQL deve aparecer fora da camada models/. Nenhuma regra de negocio nos controllers.                    |
| RNF018 | TypeScript no backend          | Todo o codigo do backend deve ser TypeScript com strict mode habilitado.                                             |
| RNF019 | Logs estruturados              | O backend deve emitir logs com timestamp, nivel (info/warn/error) e contexto requisicao.                             |
| RNF020 | README de operacao             | O repositorio deve conter README com instrucoes para: subir, parar, atualizar, rodar migrations e acessar logs.      |
| RNF021 | Responsividade de              | A interface deve ser utilizavel em telas com largura minima de 1024px (desktop e tablets landscape).                 |
| RNF022 | Feedback de carregamento       | Operacoes assincronas (carregamento de mapa, salvamento) devem exibir indicador visual de progresso.                 |
| RNF023 | Mensagens de erro claras       | Erros de API devem retornar mensagens legiveis em portugues. Erros tecnicos nao devem ser expostos ao usuario final. |
| RNF024 | Containerizacao completa       | Todo o sistema deve rodar em containers Docker. Nenhuma dependencia de sistema operacional especifico.               |
| RNF025 | Configuracao por ambiente      | Variaveis de ambiente devem ser suficientes para configurar ambientes (dev, homolog, prod) sem alterar codigo.       |
| RNF026 | Pipeline CI/CD                 | O Jenkinsfile deve implementar os stages: checkout, build, test, docker build, docker push e deploy.                 |
| RNF027 | Compatibilidade de navegadores | O sistema deve funcionar nos ultimos 2 anos de versoes do Chrome, Firefox, Edge e Safari.                            |

## 6. Glossario

| Termo     | Definicao                                                                                     |
| --------- | --------------------------------------------------------------------------------------------- |
| Feature   | Elemento geoespacial desenhado no mapa (ponto, linha ou poligono) com atributos descritivos.  |
| GeoJSON   | Formato JSON para representacao de dados geograficos. Padrao usado na API do sistema.         |
| GeoServer | Servidor de mapas open-source da UFAM que fornece camadas WMS do campus.                      |
| GIST      | Indice do PostgreSQL otimizado para dados espaciais. Usado em todas as colunas de geometria.  |
| JWT       | JSON Web Token - padrao de autenticacao stateless usado pelo sistema.                         |
| Mapillary | Plataforma de imagens em nivel de rua (Street View). Usada nas trilhas da Reserva Florestal.  |
| MVC       | Model-View-Controller - padrao arquitetural do backend (controllers, services, models).       |
| PostGIS   | Extensao do PostgreSQL para armazenamento e consulta de dados geoespaciais.                   |
| RBAC      | Role-Based Access Control - controle de acesso baseado em papeis (admin, editor, publico).    |
| SPA       | Single Page Application - o frontend e carregado uma vez e atualiza dinamicamente sem reload. |
| WMS       | Web Map Service - protocolo OGC para servir imagens de mapas via HTTP.                        |
| X3DOM     | Biblioteca JavaScript para renderizacao de modelos 3D no navegador. Usada nas arvores.        |
| SRID 4326 | Sistema de referencia de coordenadas WGS84 (GPS). Padrao usado em todas as geometrias.        |
