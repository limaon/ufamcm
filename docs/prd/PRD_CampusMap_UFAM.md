# PRD - Campus Map UFAM

> Documento de Requisitos de Produto (Product Requirements Document)
> Fase 4 do fluxo de desenvolvimento (`docs/fases_desenvolvimento.md`).
>
> **Status:** Rascunho (esqueleto) . **Versao:** 0.1 . **Ultima atualizacao:** _(preencher)_
> **Nota:** Este PRD e **agnostico de stack**. Decisoes de tecnologia, camadas e
> infraestrutura pertencem ao SPEC/Documento de Arquitetura, nao a este documento.

---

## 1. Visao Geral

_Resumo executivo de uma pagina: o que e o produto, para quem, e por que agora._

### 1.1. Problema

_A dor central. Ex.: calouros, visitantes e comunidade academica se perdem no
campus; nao ha fonte centralizada e atualizada de dados georreferenciados da UFAM._

- _Evidencia (relatorio 2020/2021): questionario com 34 respondentes apontou falta
  de informacao sobre localizacao de predios, atividades e laboratorios._
- _Evidencia: 84% dos respondentes declararam que usariam uma aplicacao do tipo._

### 1.2. Solucao Proposta

_Uma frase. Ex.: plataforma web GIS colaborativa para visualizar e contribuir com
dados georreferenciados do campus, com curadoria por administradores._

### 1.3. Objetivos e Nao-Objetivos

| Tipo         | Item  |
| ------------ | ----- |
| Objetivo     | _..._ |
| Nao-Objetivo | _..._ |

---

## 2. Contexto e Motivacao

_Historico do projeto (iniciativa Campus Map, origem UFPR 2014/2017, adaptacao UFAM
desde 2020). Consolida a pesquisa PIBIC de 2020 a 2025 num produto real._

| Ano       | Foco PIBIC                     | Entrega validada                                            |
| --------- | ------------------------------ | ----------------------------------------------------------- |
| 2020/2021 | Modelagem e Requisitos         | Documento de requisitos + modelagem UML + aerofotogrametria |
| 2021/2022 | Projeto e Modelagem de Dados   | Modelo indoor/outdoor + protótipo + base Mapillary          |
| 2022/2023 | Realidade Aumentada (SVI)      | Interface 2D+SVI + teste com 12 usuarios                    |
| 2023/2024 | Interface integrada Campus Map | Site publicado (mapa + camadas WMS)                         |
| 2023/2024 | Modelagem de Arvores           | Modelos 3D de arvores AHPICE                                |
| 2024/2025 | Trilhas e Areas Florestadas    | Plataforma de trilhas 2D + SVI                              |

---

## 3. Personas e Perfis de Usuario

_Detalhar necessidades, contexto de uso e criterio de sucesso por persona._

| Persona              | Perfil de acesso      | Necessidade principal               |
| -------------------- | --------------------- | ----------------------------------- |
| Visitante / Calouro  | Publico (sem login)   | Localizar predios, trilhas, arvores |
| Pesquisador / Editor | Editor (login)        | Contribuir com features no mapa     |
| Gestor / Curador     | Administrador (login) | Aprovar dados e gerenciar usuarios  |

### 3.1. Detalhamento por persona

_(preencher: objetivos, frustracoes, jornada, dispositivo de uso)_

---

## 4. Escopo do MVP

Principio: o MVP entrega a **cadeia de valor completa** - visualizar dados
georreferenciados + contribuir de forma colaborativa com curadoria - reaproveitando
os modulos ja validados com usuarios na pesquisa PIBIC.

### 4.1. Dentro do MVP

| #   | Modulo                         | Descricao                                                                        | Origem/validacao |
| --- | ------------------------------ | -------------------------------------------------------------------------------- | ---------------- |
| 1   | Mapa Principal                 | Mapa interativo, basemaps (OSM/Satelite), camadas WMS, popup e toggle de camadas | 2023/2024        |
| 2   | Autenticacao e RBAC            | Login, 3 perfis (Publico/Editor/Admin)                                           | Doc V4           |
| 3   | Edicao de Features + Aprovacao | Desenhar ponto/linha/poligono, classificar, status pending                       | Doc V4           |
| 4   | Administracao                  | Painel de aprovacao/rejeicao, gestao de usuarios                                 | Doc V4           |
| 5   | Trilhas + Street View          | Trilhas no mapa + visualizador SVI (360) sequencial                              | 2024/2025        |
| 6   | Arvores e 3D                   | Especies AHPICE, localizacao no mapa + modelo 3D                                 | 2023/2024        |

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

_Priorizados (MoSCoW: Must / Should / Could). Rastreabilidade com os RFxxx do
Documento V4 quando aplicavel._

| ID    | Prioridade | Modulo  | Requisito                                             | Rastreio V4 |
| ----- | ---------- | ------- | ----------------------------------------------------- | ----------- |
| RF-01 | Must       | Mapa    | Exibir mapa base interativo (zoom/pan, OSM/Satelite)  | RF001       |
| RF-02 | Must       | Mapa    | Carregar camadas WMS (Arvores, Edificacoes, Vias)     | RF002       |
| RF-03 | Must       | Mapa    | Popup de feature (nome, tipo, descricao, responsavel) | RF003       |
| RF-04 | Should     | Mapa    | Ativar/desativar camadas                              | RF004       |
| RF-05 | Must       | Auth    | Login por credenciais + protecao por perfil           | RF020       |
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

_Metas mensuraveis. Referencia aos RNFxxx do Documento V4. Manter agnostico de
implementacao - "o que", nao "como"._

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

_Descrever os fluxos chave (pode virar diagrama no SPEC)._

1. **Visualizacao publica** - Usuario abre o mapa -> navega -> clica em feature -> ve popup.
2. **Contribuicao (Editor)** - Login -> desenha feature -> classifica -> submete (pending).
3. **Curadoria (Admin)** - Login -> painel de pendentes -> aprova/rejeita.
4. **Exploracao de trilha** - Seleciona trilha -> visualizador SVI + mapa lado a lado.

---

## 8. Metricas de Sucesso

_Como saberemos que o MVP deu certo. Ex.: nº de features aprovadas, usuarios ativos,
tempo medio para localizar um ponto, taxa de adesao da comunidade._

| Metrica | Meta MVP |
| ------- | -------- |
| _..._   | _..._    |

---

## 9. Riscos e Dependencias

| Risco / Dependencia                                                | Impacto | Mitigacao |
| ------------------------------------------------------------------ | ------- | --------- |
| Disponibilizacao de servidor pela UFAM (historico de atraso, CTIC) | Alto    | _..._     |
| Dependencia de servicos externos (Mapillary, Mapbox, GeoServer)    | Medio   | _..._     |
| Qualidade das imagens SVI coletadas                                | Medio   | _..._     |

---

## 10. Questoes em Aberto

- _..._

---

## Apendice A - Glossario

| Termo   | Definicao                                                                                  |
| ------- | ------------------------------------------------------------------------------------------ |
| AHPICE  | Arvores de importancia Ambiental, Historica, Patrimonios Imateriais, Culturais e Ecologica |
| Feature | Elemento geoespacial (ponto, linha, poligono) com atributos                                |
| RBAC    | Controle de acesso baseado em papeis                                                       |
| SVI     | Street View Imagery - imagens ao nivel da rua                                              |
| WMS     | Web Map Service - protocolo OGC para servir mapas                                          |

## Apendice B - Referencias

- `docs/doc-original/` - Relatorios PIBIC 2020-2025
- `docs/doc-original/Documento_de_Requisitos_e_Arquitetura_CampusMap_V4_2026.md`
- `docs/fases_desenvolvimento.md`
