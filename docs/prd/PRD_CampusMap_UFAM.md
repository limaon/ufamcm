# PRD - Campus Map UFAM

> Documento de Requisitos de Produto (Product Requirements Document)
> Fase 4 do fluxo de desenvolvimento (`docs/fases_desenvolvimento.md`).
> **Status:** Rascunho para revisao . **Versao:** 0.2 . **Ultima atualizacao:** 2026-09-01
> **Nota:** Este PRD e **agnostico de stack**. Decisoes de tecnologia, camadas e infraestrutura pertencem ao SPEC/Documento de Arquitetura, nao a este documento.

---

## 1. Visao Geral

O Campus Map UFAM e uma plataforma web GIS (Sistema de Informacao Geografica) colaborativa para a Universidade Federal do Amazonas, campus Sen. Arthur Virgilio Filho. Ele centraliza e mantem atualizados os dados georreferenciados do campus - edificacoes, vias, arvores de interesse, trilhas e areas florestadas - permitindo que a comunidade academica visualize, explore e contribua com essas informacoes, sob curadoria de administradores. O campus tem ~670 hectares (62% cobertos por floresta) e ~15.000 membros na comunidade academica, o que o torna, ao mesmo tempo, um campus universitario de grande porte e um fragmento florestal urbano da APA Manaus com valor ambiental, cientifico e educacional.

### 1.1. Problema

Nao existe hoje uma fonte unica, atualizada e navegavel de dados georreferenciados do campus da UFAM. Isso gera duas dores complementares:

1. **Orientacao/wayfinding** - Calouros, visitantes e comunidade em geral se perdem e tem dificuldade para localizar predios, salas, laboratorios e trilhas.
2. **Gestao do conhecimento espacial** - Dados de infraestrutura, patrimonio arboreo e areas florestais estao dispersos em relatorios, mapas estaticos e bases isoladas, sem forma sistematica de atualizacao colaborativa e curadoria.

Evidencias:

- Questionario aplicado na pesquisa (PIBIC 2020/2021, 34 respondentes): a maioria relatou pouca ou moderada informacao sobre localizacao de predios (30 de 34), atividades dos predios (19) e localizacao/atividade de laboratorios (22). ~84% dos respondentes declararam que instalariam/usariam uma aplicacao deste tipo, demonstrando demanda real da comunidade.
- O problema e recorrente na literatura de campi: em Gombe State University (Nigeria), 70% dos estudantes relataram dificuldade para localizar predios apos renomeacoes; universidades como UFPR, UBC, ACC, Murdoch e ETH Zurich investiram em solucoes GIS de wayfinding justamente para reduzir a frustracao no inicio do semestre.
- O historico do projeto (5 edicoes PIBIC, 2020-2025) produziu dados e prototipos validados, mas dispersos e sem uma plataforma unica de producao.

### 1.2. Solucao Proposta

Uma plataforma web GIS colaborativa que reune, em um unico portal, a visualizacao interativa do campus (mapa 2D com camadas), a exploracao imersiva de trilhas (Street View / SVI) e do patrimonio arboreo (modelos 3D), e um fluxo de contribuicao colaborativa de features com aprovacao por curadores - transformando a pesquisa acumulada em uma ferramenta de uso continuo pela comunidade academica.

### 1.3. Objetivos e Nao-Objetivos

| Tipo         | Item                                                                       |
| ------------ | -------------------------------------------------------------------------- |
| Objetivo     | Prover fonte unica e navegavel de dados georreferenciados do campus        |
| Objetivo     | Reduzir a dificuldade de orientacao/localizacao no campus                  |
| Objetivo     | Permitir contribuicao colaborativa de dados com curadoria (qualidade)      |
| Objetivo     | Preservar e divulgar o patrimonio arboreo (AHPICE) e as trilhas florestais |
| Objetivo     | Consolidar a pesquisa PIBIC 2020-2025 em um produto de producao mantivel   |
| Nao-Objetivo | Navegacao/roteamento indoor em tempo real (posicionamento por Wi-Fi/IPS)   |
| Nao-Objetivo | Calculo de rotas turn-by-turn (fica para fase posterior)                   |
| Nao-Objetivo | App mobile nativo (o alvo do MVP e web responsivo)                         |
| Nao-Objetivo | Registro de ocorrencias de seguranca (crime reporting) no MVP              |
| Nao-Objetivo | Substituir sistemas oficiais de gestao/ensalamento da UFAM                 |

---

## 2. Contexto e Motivacao

O Campus Map nasceu na Universidade Federal do Parana (UFPR), iniciado em 2014 a partir de uma necessidade da prefeitura do campus e evoluindo para pesquisa em mapeamento indoor/outdoor. A adaptacao para a UFAM comecou em 2020 e, ao longo de 5 edicoes PIBIC (2020-2025), acumulou modelagem de dados, prototipos e modulos validados com usuarios. Este PRD consolida essa pesquisa em um produto real e mantivel. As entregas validadas por edicao:

| Ano       | Foco PIBIC                     | Entrega validada                                            |
| --------- | ------------------------------ | ----------------------------------------------------------- |
| 2020/2021 | Modelagem e Requisitos         | Documento de requisitos + modelagem UML + aerofotogrametria |
| 2021/2022 | Projeto e Modelagem de Dados   | Modelo indoor/outdoor + prototipo + base Mapillary          |
| 2022/2023 | Realidade Aumentada (SVI)      | Interface 2D+SVI + teste com 12 usuarios                    |
| 2023/2024 | Interface integrada Campus Map | Site publicado (mapa + camadas WMS)                         |
| 2023/2024 | Modelagem de Arvores           | Modelos 3D de arvores AHPICE                                |
| 2024/2025 | Trilhas e Areas Florestadas    | Plataforma de trilhas 2D + SVI                              |

---

## 3. Personas e Perfis de Usuario

O sistema atende tres perfis de acesso, alinhados ao RBAC do produto (publico, editor, administrador). Visao resumida e, na sequencia, o detalhamento de cada persona.

| Persona              | Perfil de acesso      | Necessidade principal               |
| -------------------- | --------------------- | ----------------------------------- |
| Visitante / Calouro  | Publico (sem login)   | Localizar predios, trilhas, arvores |
| Pesquisador / Editor | Editor (login)        | Contribuir com features no mapa     |
| Gestor / Curador     | Administrador (login) | Aprovar dados e gerenciar usuarios  |

### 3.1. Detalhamento por persona

#### Persona A - Calouro / Visitante (perfil Publico)

- **Quem e:** estudante ingressante ou visitante externo, primeira vez no campus. Ex.: calouro de Engenharia Florestal no primeiro dia de aula.
- **Objetivos:** achar seu predio/sala rapidamente; entender a dimensao do campus; conhecer trilhas e pontos de interesse.
- **Frustracoes:** campus grande (670 ha) e arborizado, sinalizacao fisica limitada, nomes de predios pouco intuitivos, chegar atrasado/estressado na primeira semana.
- **Jornada tipica:** abre o mapa -> busca/navega ate o predio -> clica na feature -> ve nome, tipo e descricao no popup.
- **Dispositivo:** predominantemente celular no local; desktop no planejamento previo.
- **Sucesso para a persona:** localizar o destino sem pedir ajuda presencial.

#### Persona B - Pesquisador / Editor (perfil Editor)

- **Quem e:** bolsista PIBIC, professor ou tecnico do LabGeo/DCF que coleta e mantem dados espaciais (arvores, parcelas, trilhas, edificacoes).
- **Objetivos:** cadastrar e atualizar features georreferenciadas com atributos; contribuir de forma continua para a base do campus.
- **Frustracoes:** hoje os dados vivem em relatorios e bases isoladas; retrabalho e perda de dados entre edicoes PIBIC; falta de um fluxo unico de contribuicao.
- **Jornada tipica:** login -> desenha ponto/linha/poligono -> classifica e preenche atributos -> submete (fica pendente de aprovacao).
- **Dispositivo:** desktop (edicao); celular em campo para coleta (SVI via Mapillary).
- **Sucesso para a persona:** contribuicao submetida e, apos curadoria, publicada.

#### Persona C - Gestor / Curador (perfil Administrador)

- **Quem e:** coordenador do projeto / administrador designado (ex.: LabGeo, prefeitura do campus) responsavel pela qualidade e governanca dos dados.
- **Objetivos:** garantir qualidade e consistencia dos dados publicados; gerenciar quem pode contribuir; manter a base confiavel.
- **Frustracoes:** risco de dados incorretos/duplicados sem processo de revisao; falta de controle sobre contribuidores.
- **Jornada tipica:** login -> painel de pendentes -> revisa feature -> aprova ou rejeita (com justificativa); gerencia contas de editores.
- **Dispositivo:** desktop.
- **Sucesso para a persona:** fila de pendentes sob controle; base publicada confiavel.

---

## 4. Escopo do MVP

Principio: o MVP entrega a **cadeia de valor completa** - visualizar dados georreferenciados + contribuir de forma colaborativa com curadoria - reaproveitando os modulos ja validados com usuarios na pesquisa PIBIC.

### 4.1. Dentro do MVP

| #   | Modulo                         | Descricao                                                                        | Origem/validacao |
| --- | ------------------------------ | -------------------------------------------------------------------------------- | ---------------- |
| 1   | Mapa Principal                 | Mapa interativo, basemaps (OSM/Satelite), camadas WMS, popup e toggle de camadas | 2023/2024        |
| 2   | Autenticacao e RBAC            | Login, 3 perfis (Publico/Editor/Admin)                                           | Doc V4           |
| 3   | Edicao de Features + Aprovacao | Desenhar ponto/linha/poligono, classificar (ate 22 tipos), status pending        | Doc V4           |
| 4   | Administracao                  | Painel de aprovacao/rejeicao, gestao de usuarios                                 | Doc V4           |
| 5   | Trilhas + Street View          | 7 trilhas da Reserva Florestal no mapa + visualizador SVI (360) sequencial       | 2024/2025        |
| 6   | Arvores e 3D                   | 8 especies AHPICE, localizacao no mapa + modelo 3D                               | 2023/2024        |

### 4.2. Fora do MVP (fases posteriores)

| Item                                                         | Motivo do adiamento                        |
| ------------------------------------------------------------ | ------------------------------------------ |
| Indicadores Ambientais                                       | Dados menos maduros na pesquisa            |
| Registro de ocorrencias (crime reporting)                    | Nunca implementado; caso de estudo teorico |
| Busca de rota / navegacao indoor                             | Alta complexidade; era caso de estudo      |
| Realidade Aumentada avancada (dados fisiologicos de arvores) | Trabalho futuro explicito                  |
| Comparacao de blocos                                         | Depende de Indicadores Ambientais          |

---

## 5. Requisitos Funcionais (MVP)

Requisitos priorizados por MoSCoW (Must / Should / Could). A coluna "Rastreio V4" liga cada item ao requisito correspondente do Documento de Requisitos e Arquitetura V4 (mapeamento por conteudo/semantica).

| ID    | Prioridade | Modulo  | Requisito                                             | Rastreio V4 |
| ----- | ---------- | ------- | ----------------------------------------------------- | ----------- |
| RF-01 | Must       | Mapa    | Exibir mapa base interativo (zoom/pan, OSM/Satelite)  | RF001       |
| RF-02 | Must       | Mapa    | Carregar camadas WMS (Arvores, Edificacoes, Vias)     | RF002       |
| RF-03 | Must       | Mapa    | Popup de feature (nome, tipo, descricao, responsavel) | RF003       |
| RF-04 | Should     | Mapa    | Ativar/desativar camadas                              | RF004       |
| RF-05 | Must       | Auth    | Login por credenciais + protecao por perfil           | RF020/RF024 |
| RF-06 | Must       | Edicao  | Desenhar ponto/linha/poligono                         | RF006       |
| RF-07 | Must       | Edicao  | Classificar feature + atributos                       | RF007       |
| RF-08 | Must       | Edicao  | Fluxo de aprovacao (status pending)                   | RF008       |
| RF-09 | Must       | Admin   | Aprovar/rejeitar features pendentes                   | RF021       |
| RF-10 | Should     | Admin   | Gerenciar contas de editores                          | RF022       |
| RF-11 | Should     | Trilhas | Listar trilhas no mapa                                | RF011       |
| RF-12 | Should     | Trilhas | Visualizador SVI com navegacao sequencial             | RF012/RF013 |
| RF-13 | Should     | Arvores | Listar especies AHPICE                                | RF014       |
| RF-14 | Could      | Arvores | Modelo 3D da arvore                                   | RF016       |

---

## 6. Requisitos Nao Funcionais (MVP)

Metas mensuraveis, agnosticas de implementacao ("o que", nao "como"). O detalhamento tecnico correspondente esta nos RNFxxx do Documento V4.

| Categoria       | Meta                                                                        |
| --------------- | --------------------------------------------------------------------------- |
| Desempenho      | Mapa interativo em < 3s (conexao 10 Mbps); API < 500ms em consultas simples |
| Seguranca       | Autenticacao com token expiravel; senhas com hash; HTTPS em producao        |
| Disponibilidade | Persistencia de dados; politica de backup                                   |
| Usabilidade     | Feedback de carregamento; mensagens de erro em portugues                    |
| Compatibilidade | Ultimos 2 anos de Chrome, Firefox, Edge, Safari                             |
| Responsividade  | Utilizavel a partir de 1024px (desktop/tablet landscape)                    |

---

## 7. Fluxos de Usuario Principais

Os quatro fluxos-chave do MVP (podem ser detalhados como diagramas no SPEC):

1. **Visualizacao publica** - Usuario abre o mapa -> navega -> clica em feature -> ve popup.
2. **Contribuicao (Editor)** - Login -> desenha feature -> classifica -> submete (pending).
3. **Curadoria (Admin)** - Login -> painel de pendentes -> aprova/rejeita.
4. **Exploracao de trilha** - Seleciona trilha -> visualizador SVI + mapa lado a lado.

---

## 8. Metricas de Sucesso

Como saberemos que o MVP deu certo. Metas iniciais - devem ser calibradas apos o lancamento. Benchmarks de referencia extraidos de casos comparaveis (ver Apendice B).

### 8.1. Adocao e uso

| Metrica                                       | Meta MVP inicial                                      | Benchmark de referencia                                       |
| --------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| Usuarios unicos no 1o semestre                | _(definir)_                                           | UBC: 210k+ usuarios unicos / 400k+ sessoes desde 2023         |
| Pico de usuarios diarios (inicio de semestre) | _(definir)_                                           | UBC: ~5.000/dia em set. e jan.; ACC: ~4.000 acessos no 1o dia |
| Adesao declarada da comunidade                | referencia: ~84% de intencao de uso (PIBIC 2020/2021) | -                                                             |

### 8.2. Eficacia (wayfinding)

| Metrica                                                        | Meta MVP inicial                 | Benchmark de referencia                               |
| -------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------- |
| Taxa de sucesso ao localizar um destino (teste de usabilidade) | >= 85%                           | OAUSTECH: 87% satisfacao; GSU: 85-99% de sucesso      |
| Reducao de duvidas de navegacao na 1a semana                   | reducao perceptivel vs. baseline | Murdoch: reducao significativa reportada por servicos |
| Tempo medio para localizar um ponto no mapa                    | _(definir baseline e meta)_      | -                                                     |

### 8.3. Colaboracao e curadoria

| Metrica                                         | Meta MVP inicial | Observacao                           |
| ----------------------------------------------- | ---------------- | ------------------------------------ |
| No. de features submetidas por editores         | _(definir)_      | Indica engajamento de contribuidores |
| No. de features aprovadas / publicadas          | _(definir)_      | Indica crescimento util da base      |
| Taxa de aprovacao (aprovadas / submetidas)      | acompanhar       | Proxy de qualidade das contribuicoes |
| Tempo medio de curadoria (submissao -> decisao) | _(definir SLA)_  | Saude da fila de pendentes           |

### 8.4. Qualidade tecnica (deriva dos RNFs)

| Metrica                                | Meta MVP inicial              |
| -------------------------------------- | ----------------------------- |
| Tempo ate mapa interativo              | < 3s (conexao 10 Mbps)        |
| Tempo de resposta de consultas simples | < 500ms                       |
| Disponibilidade do servico             | _(definir SLA com CTIC/UFAM)_ |

---

## 9. Riscos e Dependencias

Riscos priorizados por probabilidade x impacto. Varios sao **licoes aprendidas** de edicoes anteriores da pesquisa (ver Apendice B), o que aumenta sua probabilidade e a importancia da mitigacao.

| #   | Risco / Dependencia                                               | Prob. | Impacto             | Evidencia historica                                                                                                                                                 | Mitigacao                                                                                                                                                                      |
| --- | ----------------------------------------------------------------- | ----- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1  | Disponibilizacao de servidor/infra pela UFAM (CTIC)               | Alta  | Alto                | Em 2023/2024, o nao atendimento da demanda pelo CTIC-UFAM prejudicou o cronograma e impediu testes com usuarios; o projeto recorreu a AWS (plano gratuito de 1 ano) | Formalizar demanda de infra com o CTIC cedo (o Doc V4 ja e dirigido a eles); manter opcao de nuvem como contingencia; sistema containerizado para ser portavel entre ambientes |
| R2  | Testes/uso bloqueados dentro da rede UFAM (IP estatico)           | Media | Alto                | Com a solucao AWS, o IP estatico impossibilitou testes dentro do LabGeo/FCA e da rede UFAM                                                                          | Validar acesso pela rede interna cedo; alinhar liberacao de dominio/porta com CTIC antes de agendar testes com usuarios                                                        |
| R3  | Backup e persistencia dependentes de politica do CTIC             | Media | Alto                | RNF015 (Doc V4) condiciona a politica de backup ao CTIC                                                                                                             | Definir e acordar politica de backup/retencao antes do go-live; nao tratar como opcional                                                                                       |
| R4  | Baixa participacao da comunidade / poucos contribuidores          | Media | Medio               | Engajamento da comunidade citado como desafio desde 2020/2021 (agravado pela pandemia)                                                                              | Divulgacao institucional; onboarding simples para editores; comecar com curadoria de um nucleo (LabGeo/DCF)                                                                    |
| R5  | Dependencia de servicos externos (Mapillary, GeoServer, basemaps) | Media | Medio               | Trilhas/SVI dependem do Mapillary; camadas dependem do GeoServer                                                                                                    | Isolar integracoes atras de uma camada propria; ter fallback de basemap; documentar versoes/limites de uso                                                                     |
| R6  | Qualidade das imagens SVI coletadas                               | Media | Medio               | Em 2024/2025, parte das imagens ficou borrada (percurso acelerado, terreno irregular, cameras diversas)                                                             | Padrao de coleta (estabilizador, ritmo, orientacao horizontal); revisao de qualidade antes de publicar                                                                         |
| R7  | Imprecisao de GPS/posicionamento indoor                           | Alta  | Baixo (fora do MVP) | Coordenadas imprecisas em ambientes internos (concreto, poucos satelites) em 2022/2023                                                                              | Fora do escopo do MVP (nao-objetivo); tratar em fase futura com tecnica adequada de posicionamento                                                                             |
| R8  | Divergencia/perda de dados entre edicoes da pesquisa              | Media | Medio               | Dados historicamente dispersos em relatorios e bases isoladas                                                                                                       | O proprio produto (base unica + curadoria) mitiga; migrar/consolidar dados validados na base oficial                                                                           |

---

## 10. Questoes em Aberto

Decisoes pendentes que precisam de resposta antes ou durante o SPEC. Nao bloqueiam o esqueleto do PRD, mas devem ser resolvidas com os stakeholders (CTIC, LabGeo/DCF, coordenacao).

| #   | Questao                                                                            | Depende de  | Impacto se nao resolvida             |
| --- | ---------------------------------------------------------------------------------- | ----------- | ------------------------------------ |
| Q1  | O CTIC-UFAM disponibilizara servidor/infra propria ou o MVP ira para nuvem?        | CTIC        | Define hospedagem, custo e R1/R2     |
| Q2  | Qual a politica de backup/retencao acordada (RNF015)?                              | CTIC        | Define R3 e o SLA de disponibilidade |
| Q3  | Quais sao as metas numericas de adocao/uso (secao 8)?                              | Coordenacao | Metricas de sucesso ficam sem alvo   |
| Q4  | Quem sao os curadores iniciais e como sera o onboarding de editores?               | LabGeo/DCF  | Governanca dos dados (R4)            |
| Q5  | Quais dados historicos validados serao migrados para a base oficial no lancamento? | Equipe/DCF  | Volume inicial de conteudo (R8)      |
| Q6  | Sera necessario suporte a telas < 1024px (mobile) ja no MVP?                       | Coordenacao | Escopo de responsividade (RNF021)    |
| Q7  | Ha requisito de acessibilidade formal (ex.: WCAG) para o MVP?                      | Coordenacao | Escopo de usabilidade/inclusao       |

---

## Apendice A - Glossario

| Termo   | Definicao                                                                                  |
| ------- | ------------------------------------------------------------------------------------------ |
| AHPICE  | Arvores de importancia Ambiental, Historica, Patrimonios Imateriais, Culturais e Ecologica |
| APA     | Area de Protecao Ambiental                                                                 |
| CTIC    | Centro de Tecnologia da Informacao e Comunicacao da UFAM                                   |
| Feature | Elemento geoespacial (ponto, linha, poligono) com atributos                                |
| MoSCoW  | Metodo de priorizacao: Must, Should, Could, Won't have                                     |
| MVP     | Minimum Viable Product - produto minimo viavel                                             |
| RBAC    | Controle de acesso baseado em papeis (Role-Based Access Control)                           |
| SVI     | Street View Imagery - imagens ao nivel da rua                                              |
| WMS     | Web Map Service - protocolo OGC para servir mapas                                          |

## Apendice B - Referencias

### Documentos internos

- `docs/doc-original/` - Relatorios PIBIC 2020-2025
- `docs/doc-original/Documento_de_Requisitos_e_Arquitetura_CampusMap_V4_2026.md`
- `docs/fases_desenvolvimento.md`

### Referencias externas (benchmarks e contexto)

- UFPR CampusMap (projeto de origem, 2014/2017): https://campusmap.ufpr.br/ - base cartografica indoor/outdoor, rotas, PostgreSQL/PostGIS, evolucao para Smart Campus.
- UFPR CampusMap 2.0 - Desafios para implantacao de um Smart Campus (Delazari et al., 2025).
- UBC Campus Navigation (ESRI, 2026): wayfinding acessivel; ~5.000 usuarios/dia em pico, 210k+ usuarios unicos, 90k+ rotas geradas.
- Austin Community College - Indoor GIS wayfinding (ArcUser, 2025): ~4.000 acessos no 1o dia.
- Murdoch University Wayfinder (NGIS, 2024): reducao de duvidas de navegacao na 1a semana.
- OAUSTECH GIS campus navigation (Nigeria): 87% de satisfacao, rotas < 2s.
- GSU Connect - Gombe State University (2025): >70% relataram dificuldade de localizacao; taxa de sucesso 85-99% no piloto.
- ETH Zurich Smart Campus (Indoor GIS, 2024): wayfinding barrier-free / digital twin.
