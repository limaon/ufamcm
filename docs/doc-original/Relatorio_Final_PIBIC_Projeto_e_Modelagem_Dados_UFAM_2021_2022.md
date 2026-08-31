# RELATORIO FINAL

## EDICAO: PIBIC/PAIC 2021/2022

---

## RECURSOS HUMANOS

### Orientador(a)

**Nome**: Andre Luiz Alencar de Mendonca

### Aluno(a)

**Nome**: Francoa de Jesus Gurgel Leitao

**Bolsa**:

- ( ) CNPQ
- ( ) UFAM
- ( ) FAPEAM
- (X) VOLUNTARIO

---

## IDENTIFICACAO DO PROJETO

### Titulo

**Campus Map Ufam**: Modelagem, mapeamento e monitoramento do campus da UFAM Manaus - AM

### Codigo do Projeto

PIB-A/0201/2021

### Area de Conhecimento

- ( ) Exatas e da Terra
- (X) Agrarias
- ( ) Biologicas
- ( ) Sociais Aplicadas
- ( ) Engenharias
- ( ) Saude
- ( ) Ciencias Humanas
- ( ) Linguistica, Letras e Artes
- ( ) Multidisciplinar

---

## COMITE DE ETICA EM PESQUISA COM HUMANOS (CEP) OU ANIMAIS (CEUA)

- ( ) Aprovado - Numero do protocolo: _______
- (X) Nao se aplica

**Caso o projeto ainda nao esteja aprovado, justifique:**

---

## RESUMO

A iniciativa campus map e uma padronizacao de atividades que englobam a producao de base cartografica em campi de universidades ao redor do mundo. A partir do conceito de requisitos, busca-se desenvolver um banco de dados geografico que subsidie a criacao de diversos produtos de mapeamento indoor e outdoor, dentro de um campus universitario, incluindo mapas tradicionais e produtos cartograficos modernos como interfaces em realidade virtual e aumentada, mapas tridimensionais e animacoes. Para o Campus Sen. Arthur Virgilio Filho, em Manaus, AM, tem-se que a universidade esta encravada em uma area com diversas fitofisionomias vegetais, ocorrencia de fauna caracteristica, alem das construcoes caracteristicas de um campus de grande porte. O presente trabalho trata da fase de projeto e modelagem de dados, fase inicial do desenvolvimento do mapa, ocorrendo de forma a investigar, por meio de pesquisa participativa, as necessidades atuais e potenciais dos atores da comunidade academica, alem da projecao de quais e futuros usos de produtos derivados da base cartografica. Considera-se desde o uso para rotas indoor (como a localizacao de salas e usos agendados) e outdoor (direcoes para alcancar determinado setor da universidade) ate a exploracao do potencial de turismo e atividades comunitarias como trilhas florestais e identificacao de especies de interesse, como frutiferas ou arvores de interesse. Concomitantemente foram realizadas as atividades de mapeamento basico, como o desenholvimento de voz e identificacao de feicoes basicas dentro do fragmento, como forma de pesquisar a aplicabilidade do mapeamento moderno para a realidade de um ambiente que mescia uma area protegida ambientalmente e, o transito da comunidade academica e agregados para atividades intrinsecas de uma universidade do porte da UFAM. Com esses resultados, tem-se documento de requisitos da aplicacao, a modelagem de dados a serem levantados dentro do campus, levantamento aereo georreferenciado e modelo de interface para smartphones.

---

## 1 INTRODUCAO

Os fragmentos florestais urbanos sao parte importante na paisagem de cidades por diversos motivos. Dentro eles destacam-se a necessidade de conservacao de biodiversidade de fauna e flora. Alem disso, tem importancia biologica para o equilibrio do ecossistema, seja em termos de ciclos naturais, seja em termos da qualidade de vida humana. Avia (et al. 2014) apontam que os estudos da literatura cientifica demonstram que a vegetacao tem um papel preponderante para os recursos hidricos, especialmente atuando na conservacao de corpos d'agua - atuando na redistribuicao da agua da chuva - na formacao de novas massas atmosfericas de umidade; na atenuacao de fluxos e nos efeitos da eutrofizacao de rios, alem da reducao de processos erosivos. De acordo com Gartland (2012), a vegetacao urbana contribui decisivamente para a reducao da temperatura nas cidades. Woodley (1997) afirma que a designacao de areas protegidas em ambientes degradados e a resposta mais usual do ser humano frente a sua propria incapacidade de degradar ecossistemas. Em teoria, parece ser algo mais dificil de se realizar em ambientes urbanos, onde a degradacao de ecossistemas naturais e a regra. Em uma cidade como Manaus, onde ha toda uma relacao intrinseca com areas verdes entrecortadas por igarapes e cuja paisagem e comumente associada a Floresta Amazonica, o mapeamento de areas torna-se imperioso, considerando fins de conservacao de recursos naturais.

O conceito de "papel" (TERBORGH e Van SCHAIK, 2004) se da para algumas areas protegidas que existem somente em mapas, nao constituindo na realidade areas protegidas, tanto por capacidade administrativa e financeira das instituicoes ligadas ao seu gerenciamento, quanto pela propria adocao de seus atores - como no caso da UFAM e sua comunidade - que sao usuarios da area objeto de protecao. Alguns trabalhos apontam que o mapeamento e ferramenta essencial nesse processo, uma vez que ele evidencia aquilo que e de interesse na conservacao, e torna apolice silencioso e elementos embutidos para o gerenciamento e engajamento de atores relacionados a area e ao seu entorno. Conforme o entendimento de Redford et. al. (2003), e possivel afirmar que projetos que mapeiam areas de interesse ecologico com fins de conservacao necessitam de metricas para avaliacao de acoes de conservacao, em especial na relacao com eventos com potencial tanto de degradacao quanto de protecao de recursos naturais. Nesse contexto, acoes como o Plano de Desenvolvimento Institucional da Universidade e sua respectiva politica Ambiental, o Zoneamento Ambiental - marco para acoes regulatorias - e demais instrumentos normativos da prefeitura do Campus, devem ser consultados e levados em consideracao na atividade de levantamento de requisitos.

Segundo Lima (2017) o projeto UFPR CampusMap(UCM) teve inicio em 2014 com o objetivo de realizar o mapeamento de todas as feicoes que compoem o campus da Universidade Federal do Parana, tendo inicio em um unico campus, o chamado Centro Politecnico. O mapeamento surgiu primeiramente da necessidade basica da prefeitura do campus e evoluiu a partir de pesquisas sobre tipos de representacao cartografica em ambientes internos, chamada de "indoor mapping". A ideia de um mapeamento para esse tipo de feicao e realizar tanto a adaptacao de um projeto cartografico para as representacoes do que existe no interior e exterior das areas de uso da comunidade academica, porem incluindo levantamentos cadastrais e topograficos. Os produtos a serem gerados a partir deste "mapeamento do sec. XXI" devem ter em mente o potencial de ferramentas como o mapeamento colaborativo, o uso de dispositivos moveis, as realidades aumentada e virtual e todo o arcabouco de necessidades dos usuarios desse mapeamento em funcao dos interesses da comunidade. Considera-se aqui o interesse em aplicar a metodologia desenvolvida por Sluter, Van-Elzakker e Ivanova (2016) na educacao de requisitos para aplicacoes geoespaciais, um conceito "empresitado" da engenharia de requisitos, campo da informatica que trabalha com projetos de software, onde os requisitos definem as bases para o planejamento do projeto, gerenciamento de riscos, testes de aceitacao e controle de modificacoes.

O presente continua a iniciativa de requisitos para uma aplicacao desta natureza e magnitude, continuando o projeto Campus map UFAM, que considera aspectos ecologicos, ambientais, urbanos que permitem as atividades atuais e potenciais dentro do Campus da UFAM e sua area de entorno e influencia. A presente pesquisa busca desenvolver documento de requisitos, modelagem de banco de dados e levantamento georreferenciado de base cartografica atualizada do Campus, como forma de continuar o desenvolvimento do Campus Map UFAM. Este pretende se implementar como solucao cartografica - que inclui base de dados, documentacao e produtos - destinada a ser utilizada como aplicativo para mobilidade, turismo, localizacao indoor e outdoor, entretenimento e educacao ambiental - inclusive como ferramenta de apoio para aulas da propria universidade. Alem disso, entende-se que o Campus Map UFAM pode vir a ser arotulado como ferramenta de planejamento e fiscalizacao e principalmente de conservacao e monitoramento ambiental de area de relevante interesse ecologico, alem de base atualizada de feicoes geograficas e cadastrais da Universidade.

---

## 2 OBJETIVOS

### 2.1 Geral

Desenvolver requisitos para mapeamento basico e projeto de banco de dados aplicado ao Campus Sen. Arthur Virgilio Filho - UFAM em Manaus - AM, sob a otica da conservacao do fragmento florestal urbano e das atividades que ocorrem na propria universidade.

### 2.2 Especifico

- Modelar dados relacionados a infraestrutura, fauna e flora do campus;
- Efetuar coleta de dados dos itens supracitados;
- Elaborar um modelo de interface que contemple o uso da base de dados.

---

## 3 METODOLOGIA

### 3.1 Area de Estudo

O Campus Senador Arthur Virgilio Filho e o principal campus da Universidade Federal do Amazonas, e esta localizado proximo a chamada Bola do Coroado, inicio da zona Leste da area urbana da cidade de Manaus - AM. O Campus em si faz fronteira com seis bairros da cidade. O campus da UFAM e dividido entre Setor Norte e Setor Sul e possui aproximadamente 670 hectares de area total. Segundo a UFAM (2008) existiam aproximadamente 15000 membros da comunidade da UFAM participando de atividades academicas ou administrativas desenvolvidas exclusivamente no Campus.

Em 2000, estimava-se que 15% do total da area do campus era antropizada - edificacoes e areas construidas ou modificadas em geral (AMANCIO et al. 2000). Segundo o site institucional da Pro-reitoria de Ensino e Graduacao, no interior do Campus funcionam 78 cursos de graduacao, totalizando 3818 vagas de ingresso anuais e dividido em 15 unidades academicas (UFAM, 2019). Segundo CALDAS (2016) - citando dados informais da prefeitura do Campus, existem cerca de 20 nascentes e 12 fluxos de igarapes no interior do Campus da UFAM. E uma area de grande importancia ecologica, porem que sofre internamente - como na expansao de areas destinadas a unidades academicas e ocupacao - e externamente, como na regiao sul do fragmento, devido a especulacao imobiliaria, e a extracao de recursos naturais como o corte seletivo a partir de trilhas clandestinas (CAMARA, 2014).

Por fim, se consideramos a APA da UFAM como um todo, e um tipo de Unidade de Conservacao que desempenha um papel fundamental na melhoria da qualidade ambiental do seu entorno, uma vez que os bairros adjacentes, originarios de ocupacoes desordenadas, nao previram areas para desempenhar esta funcao. Sobretudo, estas areas servem de abrigo para diversas especies da fauna e da flora locais (CALDAS, 2016).

### 3.2 Modelagem indoor e outdoor

Seguindo o modelo adaptado de Sluter, van Elzakker e Ivanova (2016) para elaboracao do documento final de Engenharia de Requisitos, o levantamento base de requisitos foi gerado (LEITAO, 2021 - PIBIC edicao 2020/2021), como subsidio para modelagem dos dados baseado nas necessidades dos possiveis usuarios da aplicacao. Com isso, a modelagem foi feita utilizando a linguagem UML (Unified Modeling Language) devido a sua finalidade de elaboracao de projetos de softwares, como o do Campus MAP UFAM. Nela, foi possivel ser feita a visualizacao do modelo de entidade e o relacionamento de dados geograficos e de atributos iniciais das bases cartograficas do campus. Para tal atividade, utilizou-se a ferramenta Draw, do software LibreOffice, no qual as entidades foram divididas para feicoes indoor e outdoor.

### 3.3 Levantamento de dados

Os dados geoespaciais para este trabalho sao categorizados como outdoor (externos) e indoor (internos). Os dados outdoors incluem acessos, edificacoes, arvores, jardins, areas comuns e zoneamentos em geral. Os dados indoor sao aqueles internos, como salas de aula, banheiros, laboratorios e atributos relacionados. Neste trabalho apontam-se que existem 3 grandes tipos de dados para coleta: os dados geometricos 2D, que consistem nas feicoes desenhadas numa visao ortogonal, proprias dos SIG e mapas em geral; os dados geometricos 3D, que podem ser simbolicos de uma dimensao mais realista ou mesmo a propria imagem da area em perspectiva - as chamadas imagens street level (XIAO e colaboradores, 2009); e os dados de atributos, que sao a principal razao de se realizar a modelagem de dados e beneficiam-se - inclusive, atualmente na resolucao de problemas do mundo moderno - de modelos conceituais para varias aplicacoes (COHEN e GIL, 2021; BERNASCONI e GRANDI, 2021). A modelagem conceitual integra o que sera mapeado para essas tres grandes dimensoes de dados, tornando a visualizacao integrada a base de dados e adaptando o conceito de ambientes inteligentes para o campus (SCHALLER e colaboradores, 2015; ZZHENG, AN e ZHANG, 2020)

Para a realizacao do levantamento indoor, os dados geometricos consistem nas areas dentro de edificacoes e uma das camadas sao as imagens baseadas em cameras 180°. Dessa forma foi utilizado o software MAPILLARY - que e um servico livre para compartilhamento de fotos geolocalizadas que pode ser acessado pelo por celulares atraves do aplicativo do sistema - para construcao de base fotografica 180° livre (Figura 1). A base fotografica que se pode conseguir atraves dessa ferramenta e automatizada pelo processo fotogrametrico da mesma, sendo necessaria somente a aquisicao de fotos georreferenciadas com uso de camera de smartphones. Com isso, elaborou-se os dados de corredores, de sala de aulas e rotas de transicao entre algumas construcoes em torno da Faculdade de Ciencias Agrarias e o Instituto de Ciencias Biologicas. Os trabalhos se deram, com ativacao do aplicativo, depois disso, o smartphone utilizado foi posicionado a altura do peito do autor do presente trabalho (altura a cerca de 1,60 m a partir do chao) e foi acionada a funcao de captura. Apos isso, foi realizada uma caminhada pelos locais alvos de coleta de imagens.

### 3.4 Desenvolvimento preliminar da interface do software

A Construcao da primeira versao da interface do software foi feita por meio do programa Canva, cujo caracteriza-se pelo desenvolvimento de projetos de design. Com isso, foi feito um estudo da modelagem dos bancos de dados. A partir disso, decidiu-se agrupar todas as camadas em duas principais. A primeira e a camada outdoor que ira possuir as camadas imagem georreferenciada do campus, feicoes das edificacoes, ruas e calcadas. A segunda camada e a indoor, e essa sera composta por feicoes das salas e laboratorios e uma camada de dados vinculada ao Mapillary no intuito de revelar os pontos da plataforma em que ha fotos das localidades selecionadas. Caso determinados locais nao possuam imagens, uma pessoa pode facilmente acessar o Mapillary e realizar a coleta das fotos. Outra opcao para inserir os dados e por meio da opcao de contato com os administradores no qual qualquer pessoa pode iniciar uma conversa sobre alguma duvida relacionada ao programa e para que tambem possam sugerir a insercao de dados na plataforma. Por fim, a ultima ferramenta e a de cadastro, no qual qualquer pessoa que desejar fazer isso, informar seu nome, email para contato e telefone, e assim compor um banco de dados de usuarios para se ter um controle e estudo das pessoas que acessam o Campus Map.

---

## 4 RESULTADOS

### 4.1 Modelagem

A partir dos dados documente de requisitos aliado a ferramenta UML, foi-se construido as modelagens para os meios indoor e outdoor, conforme Figura 1 e Figura 2 respectivamente logo abaixo. Este modelo preve os dados que serao mapeados e levantados a partir dos levantamentos e verificacoes atuais em campo. Ha tambem um modelo de dados para estudo do caso de ocorrencias, previsto pra ser implementado em interface especifico e aplicado a dados de seguranca no campus - coleta de eventos como assaltos e roubos - e o outro modelo aplicado a estudos florestais, com levantamento de parcelas e aplicados a inventarios floristicos, especifico para estudos florestais. Estes modelos estao sendo construidos baseados nas necessidades aventadas junto a administracao do campus e junto aos professores do curso de Engenharia Florestal da UFAM.

#### Figura 1 - Modelagem aplicada a feicoes indoor

A Figura 1 apresenta o modelo de dados para as feicoes internas (indoor) do Campus UFAM. Este diagrama de entidade-relacionamento foi desenvolvido utilizando a linguagem UML e estrutura-se em torno de varios poligonos principais que representam diferentes espacos e elementos dentro das edificacoes.

O modelo comeca com a entidade "Poligonos Corredores", que possui identificadores como id_corredor (inteiro) e id_acesso (inteiro). Os corredores contem uma relacao de "1 para muitos" com a entidade "Poligonos Edificacoes", que armazena informacoes sobre as edificacoes como id_edificacoes (inteiro), nome_edificacao (texto), tipos_edificacoes (texto) e id_acesso (inteiro).

Dentro das edificacoes, encontram-se as "Poligonos Sala", que representam as salas de aula e espacos internos. Esta entidade contem atributos como id_sala (inteiro), nome_sala (texto), id_tipo (inteiro), id_departamento (inteiro) e id_acesso (inteiro). As salas estao relacionadas a "Poligonos Bloco", que sao os blocos ou alas das edificacoes, com atributos id_bloco (inteiro) e nome_bloco (texto).

O modelo tambem inclui a entidade "Departamento" com id_departamento (inteiro) e nome_departamento (texto), que se relaciona com as salas para indicar a qual departamento cada sala pertence. Alem disso, ha a entidade "Setor" com id_setor (inteiro) e nome_setor (texto), que organiza os departamentos.

Finalmente, o modelo inclui as entidades "Tipo" (com id_tipo e nome_tipo) e "Ocupacao" (com tipo_ocupacao e horario), que fornecem informacoes sobre o tipo de espaco e sua ocupacao temporal. A entidade "Acesso" (com id_acesso e nome_acesso) representa os pontos de acesso as edificacoes e salas.

Todas essas entidades sao interconectadas atraves de relacionamentos que indicam como os dados se conectam, permitindo uma consulta integrada sobre a estrutura interna do campus.

#### Figura 2 - Modelagem aplicada a feicoes outdoor

A Figura 2 apresenta o modelo de dados para as feicoes externas (outdoor) do Campus UFAM. Este diagrama tambem utiliza a linguagem UML e estrutura-se em torno de poligonos que representam diferentes elementos e espacos externos do campus.

O modelo comeca com a entidade "Poligonos Cobertura do Solo", que possui identificadores como id_cobertura (inteiro) e nome_cobertura (texto). Esta entidade contem uma relacao de "1 para muitos" com a entidade "Pontos Arvores", que armazena informacoes sobre as arvores presentes no campus, incluindo atributos como id_arvore (inteiro), nome_arvore (texto), familia_arvore (texto), coordenada_arvore (inteiro), copa_arvore (inteiro), poda_arvore (inteiro), processo_poda_arvore (texto) e tempo_poda_arvore (data).

A entidade "Poligonos Areas do Setor" representa as areas setorizadas do campus, com id_area (inteiro) e nome_area (texto). Esta entidade contem uma relacao com "Poligonos Setor", que possui id_setor (inteiro) e nome_setor (texto). Os setores estao relacionados a "Poligonos Rotas de transicao", que representam as rotas e caminhos entre diferentes areas, com id_rotas (inteiro) e nome_rotas (texto).

O modelo inclui tambem a entidade "Pontos Fauna", que armazena dados sobre os animais observados no campus, com atributos como id_animal (inteiro), nome_animal (texto), nome_cientifico (texto), bando_animal (texto), estado_saude_animal (texto), coordenada_animal (inteiro), setor_animal (inteiro) e foto_animal (PNG).

A entidade "Poligonos Edificacao" representa as edificacoes externas, com id_edificacao (inteiro), nome_edificacao (texto) e tipo_edificacao (texto). Esta entidade esta relacionada a "Poligonos Acesso", que representa os acessos as edificacoes, com id_acesso (inteiro) e nome_acesso (texto).

Finalmente, o modelo inclui a entidade "Dados das Edificacoes", que armazena informacoes detalhadas sobre as edificacoes, como num_sala (inteiro), num_laboratorio (inteiro) e num_andares (inteiro).

Todas essas entidades sao interconectadas atraves de relacionamentos que indicam como os dados se conectam, permitindo uma consulta integrada sobre a estrutura externa do campus, incluindo informacoes sobre cobertura do solo, arvores, fauna, setores, rotas e edificacoes.

**Fonte: O autor (2022).**

Ao longo do desenvolvimento de cada entidade da modelagem indoor e outdoor, foi determinada a descricao de cada entidade (a fim guiar no momento da implementacao do sistema), conforme Quadro 1 e Quadro 2, logo abaixo.

#### Quadro 1 - Descricao das entidades para a modelagem indoor

| ENTIDADE           | DESCRICAO                                                                            |
| ------------------ | ------------------------------------------------------------------------------------ |
| EDIFICACOES        | ARMAZENAMENTO DADOS DAS EDIFICACOES PRESENTES NO CAMPUS                              |
| CORREDORES         | ARMAZENAMENTO DADOS REFERENTES AOS CORREDORES DOS ANDARES DAS EDIFICACOES            |
| CAMPUS             | DISTINCAO ENTRE OS CAMPUS                                                            |
| PONTO DE TRANSICAO | ARMAZENAMENTO DE DADOS REFERENTES A LOCAIS ENTRE AS EDIFICACOES                      |
| BLOCO              | ARMAZENAMENTO DE DADOS REFERENTES AOS BLOCOS DE CADA SETOR DO CAMPUS                 |
| SALA               | ARMAZENAMENTO DE DADOS REFERENTES A LOCALIZACAO, ATIVIDADE E ANDAR DE CADA SALA      |
| ACESSO             | ARMAZENAMENTO DE DADOS REFERENTES AOS ACESSOS ATE CADA SALA                          |
| DEPARTAMENTO       | ARMAZENAMENTO DE DADOS REFERENTES AOS DEPARTAMENTOS PRESENTES EM SALAS DE CADA BLOCO |
| SETOR              | ARMAZENAMENTO DE DADOS REFERENTES AO SETOR RESPONSAVEL POR CADA SALA                 |
| TIPO               | ARMAZENAMENTO DE DADOS REFERENTES A DESTINACAO DA SALA                               |
| OCUPACAO           | ARMAZENAMENTO DE DADOS REFERENTES A DISPONIBILIDADE DE ACESSO DE CADA SALA           |

#### Quadro 2 - Descricao das entidades para a modelagem outdoor

| ENTIDADE            | DESCRICAO                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| SETOR               | DISTINCAO ENTRE OS SETORES DO CAMPUS                                                                                 |
| ROTAS DE TRANSICAO  | ARMAZENAMENTO DE DADOS REFERENTES AS ROTAS DE TRANSICAO ENTRE OS SETORES DO CAMPUS                                   |
| AREAS DO SETOR      | ARMAZENAMENTO DE DADOS REFERENTES AREAS DO SETOR                                                                     |
| COBERTURA DO SOLO   | ARMAZENAMENTO DE DADOS REFERENTES AO TIPO DE COBERTURA DO SOLO (VEGETACAO, HIDROGRAFIA, SOLO EXPOSTO E ENTRE OUTROS) |
| ARVORES             | ARMAZENAMENTO DE DADOS REFERENTES AS POSSIVEIS ARVORES A SEREM MAPEADAS PELO CAMPUS                                  |
| FAUNA               | ARMAZENAMENTO DE DADOS REFERENTES AOS POSSIVEIS ANIMAIS SILVESTRES A SEREM ENCONTRADOS PELO CAMPUS                   |
| EDIFICACAO          | ARMAZENAMENTO DE DADOS REFERENTES AS EDIFICACOES PRESENTES EM CADA SETOR                                             |
| DADOS DA EDIFICACAO | ARMAZENAMENTO DE DADOS REFERENTES AS CARACTERISTICAS DAS EDIFICACOES EM CADA SETOR                                   |
| ACESSO              | ARMAZENAMENTO DE DADOS REFERENTES AOS ACESSOS A CADA EDIFICACAO                                                      |

A modelagem para entidades indoor e outdoor, resultou em 10 entidades do tipo poligono, no qual destacam-se areas de cobertura vegetal, que serao adaptadas para a caracterizacao fitofionomica do campus. Quanto as entidades do tipo ponto, foi decidido utiliza-las para 3 entidades, dentre elas, a ocorrencia de fauna (que serao dados de animais silvestres registrados e observados no campus) e de Arvores, que sera uma entidade, que ira contribuir para a geracao de dados das especies ocorrentes no campus.

### 4.2 Levantamento indoor

Com o levantamento indoor, foi possivel coletar ao todo 654 registros fotograficos. Sendo 262 correspondentes aos corredores de todos os andares dos dois predios da Faculdade de Ciencias Agrarias (Figura 4 e Figura 5), 224 de todos os andares principais do Instituto de Ciencias Biologicas e por fim, 168 registros corresponderam aos corredores entre essas edificacoes. Uma problematica que foi possivel perceber, foi que o programa nao consegue distinguir a diferenca entre andares e que em determinados locais o sinal de GPS oscila com frequencia.

#### Figura 3 - Captura de tela da feicao aplicativo contendo colecao de fotos da FCA 02

[Descricao: A imagem mostra uma captura de tela de um aplicativo mobile com interface verde. Na parte superior, ha um campo "Profile" e a imagem principal exibe um corredor interno de um predio com paredes brancas e portas. Abaixo da imagem do corredor, ha um mapa verde mostrando a localizacao geografica com marcadores. Na parte inferior, ha botoes de navegacao e opcoes de menu. A interface permite visualizar fotos geolocalizadas de diferentes areas do campus.]

**Fonte: O autor (2022).**

### 4.3 Desenho preliminar da interface

A partir dos dados coletados e por meio de reunioes com o orientador e principios basicos de IHC e programacao orientada a usabilidade, foi possivel ser feita a elaboracao preliminar da interface do software inicialmente para aparelhos de telefones moveis (Figura 5, Figura 6 e Figura 7).

#### Figura 5 - Ilustracao da interface em um aparelho de celular do aplicativo mostrando uma imagem de satelite e outra de feicoes da regiao sul do Campus UFAM Manaus.

[Descricao: A imagem mostra dois smartphones lado a lado. O primeiro smartphone exibe uma imagem de satelite do Campus UFAM em tons de cinza e branco, mostrando a vista aerea da area. O segundo smartphone mostra um mapa colorido do mesmo campus com diferentes cores representando diferentes tipos de feicoes: verde para areas de vegetacao, vermelho para edificacoes, amarelo para outras estruturas, e azul para areas de agua ou hidrografia. Ambas as imagens mostram a mesma area geografica do campus.]

**Fonte: O autor (2022).**

As Funcionalidades iniciais sao relacionadas a lista de camadas e dados passiveis de visualizacao. Para a interface de casos de estudo relacionadas a dados colaborativos esta em fase de elaboracao, pensando-se em uma forma rapida de o usuario clicar em tela e poder inserir feicoes pontuais (ocorrencias) e as camadas possiveis para cada aplicacao (florestal e eventos de seguranca)

#### Figura 6 - Ilustracao da interface em um aparelho de celular do aplicativo mostrando o menu de ferramentas

[Descricao: A imagem mostra dois smartphones lado a lado, ambos exibindo a interface do aplicativo Campus Map. Cada smartphone mostra um mapa do campus em tons de azul com areas de vegetacao em verde e edificacoes em vermelho. No lado esquerdo de cada tela, ha um menu de "Camadas" que lista diferentes opcoes de visualizacao como "Indoor", "Salas", "Laboratorios", "Imagem" e "Outdoor". O menu permite que o usuario selecione quais camadas deseja visualizar no mapa. A interface e intuitiva e permite a navegacao facil entre diferentes tipos de dados geograficos.]

**Fonte: O autor (2022).**

#### Figura 7 - Legenda das ferramentas que irao constar na versao inicial da aplicacao.

**Opcao de ativar ou desativar a aba do menu**

**Opcao para realizacao de login na plataforma**

**Opcao para o registro de duvidas e sugestoes**

**Camada ativada** (representada por um circulo verde)

**Camadas disponiveis para ativacao** (representada por um circulo cinza)

**Camada que esta desativada** (representada por um circulo vermelho)

**Fonte: O autor (2022).**

---

## 5 CONCLUSAO

A iniciativa do Campus Map e de suma importancia para que se entenda e conheca todos os aspectos do campus da UFAM em Manaus - AM, que e uma area de bastante interesse ambiental (LEITAO, 2021 - PIBIC edicao 2020/2021), que precisa ser compartilhada com o publico interno e externo da UFAM. Para isso a elaboracao do documento de requisitos se faz necessaria, pois proporciona a modelagem de dados de forma a se fazer um melhor uso da interface para proporcionar aos possiveis usuarios do sistema uma melhor navegacao e conhecimento do campus quanto as suas caracteristicas estruturais quanto a fauna e flora da APA Manaus.

Os levantamentos para as bases cartograficas indoor avancaram a medida que foi feito o aprimoramento da utilizacao do Mapillary, e assim, sera uma ferramenta que ira compor uma das camadas de dados a serem utilizadas nas futuras aplicacoes do software por permitir uma visualizacao fidedigna da composicao do campus. Alem disso, o aprimoramento da modelagem do banco de dados foi imprescindivel para o desenvolvimento da interface inicial da aplicacao que a principio sera destinada a aparelhos de telefones moveis, pois foi possivel fazer um ordenamento dos dados e quais informacoes eles irao transmitir.

A partir dos estudos futuros espera-se que sejam feitos testes de interface com usuarios pre selecionados, de forma a realizar verificacoes de usabilidade. Assim pode-se saber se o projeto foi adequado as suas necessidades. Por conseguinte, o desenvolvimento e melhoramento da aplicacao precisa ser continuamente feito tanto pelo LabGeo quanto pela comunidade da UFAM, que sera a principal fonte geradora de dados e informacoes do campus Arthur Virgilio Filho, da UFAM em Manaus - AM

---

## REFERENCIAS

AVILA, L.F. et al. Particao da precipitacao pluvial em uma microbacia hidrografica ocupada por Mata Atlantica na Serra da Mantiqueira - MG. Ciencia Florestal. 24(3):583-595, 2014.

BERNASCONI, Anna; GRANDI, Silvia. A conceptual model for geo-online exploratory data visualization: The case of the COVID-19 pandemic. Information, v. 12, n. 2, p. 69, 2021.

CALDAS, Silvio Rodrigues. Impactos ambientais sobre a floresta da UFAM. Dissertacao de Mestrado em Geografia. UFAM, 2016.

CAMARA, Joao Felipe Omena Raposo. A utilizacao de video e trilha como instrumentos de educomunicacao na APA da UFAM. Dissertacao de Mestrado em Ciencias do Ambiente e Sustentabilidade na Amazonia. UFAM, 2014.

COHEN, Jonathan; GIL, Jorge. An entity-relationship model of the flow of waste and resources in city-regions: Improving knowledge management for the circular economy. Resources, Conservation & Recycling Advances, v. 12, p. 200058, 2021.

DELAZARI, Luciene Stamato; ERCOLIN FILHO, Leonardo. Especificacoes Tecnicas de Produtos Cartograficos: Projeto UFPR CampusMap. 2019. Disponivel em: . Acesso em: 12 abril 2020.

FARIAS, Pedro Paulo Santos; DELAZARI, Luciene Stamato. Calculo De Rotas Com O Algoritmo Do Caminho Mais Curto Em Ambientes Indoor. In: Iv Sbg - Simposio Brasileiro De Geomatica E Ii Jornadas Lusofonas Sobre Ciencias E Tecnologias De Informacao Geografica/Ctig, 2017, Presidente Prudente. Anais... . Presidente Prudente: Unesp, 2017. p. 65 - 70.

GARTLAND, Lisa. Ilhas de calor: como mitigar zonas de calor em areas urbanas. Oficina de Textos, 2011.

HARRIS, Leila M.; HAZEN, Helen D. Power of maps:(Counter) mapping for conservation. ACME: An International Journal for Critical Geographies, v. 4, n. 1, p. 99-130, 2005.

LIMA, C. R. Desenvolvimento de Aplicativo para Dispositivos moveis com mapas indoor para o projeto UFPR Campus Map. Trabalho de Conclusao de Curso em Eng. Cartografica e de Agrimensura. Universidade Federal do Parana. 2017.

MANAUS. Decreto n° 1.503 de 27 de marco de 2012. Diario Oficial do Municipio. Disponivel em:<http://migre.me/eo5il>. Acesso em 10 jul. 2020.

MARCON, Jaydione Luis et al. Biodiversidade fragmentada na floresta do Campus da Universidade Federal do Amazonas: conhecimento atual e desafios para a conservacao. In: Biodiversidade amazonica: caracterizacao, ecologia e conservacao, por MARCON, Jaydione Luis et al. (orgs). Manaus: Edua, 2012.

REDFORD, Kent H. et al. Mapping the conservation landscape. Conservation biology, v. 17, n. 1, p. 116-131, 2003.

SCHALLER, J., ERTAC, O., FRELLER, S., MATTOS, C., & RAJCEVIC, Z. Geodesign apps and 3D modelling with CityEngine for the city of tomorrow. Digital Landscape Architecture, p. 59-70, 2015.

SOMMERVILLE, Ian. Engenharia de Software, 9 edicao. Pearson, Addison Wesley, 2011.

SLUTER, Claudia Robbi; VAN ELZAKKER, Corne P. J. M.; IVANOVA, Ivana. Requirements Elicitation for Geo-information Solutions. The Cartographic Journal, [s.l.], v. 54, n. 1, p.77-90, 20 jun. 2016. Maney Publishing. http://dx.doi.org/10.1179/1743277414y.0000000092.

UFAM. Sitio Institucional - Pro-reitoria de Ensino e Graduacao. 2019. . Acesso em 01 jul. 2020.

XIAO, J., FANG, T., ZHAO, P., LHUILLIER, M., e QUAN, L. Image-based street-side city modeling. ACM Transactions on Graphics, 28(5):114, 2009.

WOODLEY, Stephen. Science and protected area management: An ecosystem-based perspective. In, James G. Nelson and Rafael Serafin (eds.) National Parks and Protected Areas: Keystones to Conservation and Sustainable Development. Berlin: Springer-Verlag, pp.11-21. 1997.

ZHENG, Lifang; AN, Hongwei; ZHANG, Yi. Research on 3D data modeling of virtual city environment based on GIS. Microprocessors and Microsystems, p. 103392, 2020.
