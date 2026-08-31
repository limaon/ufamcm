# RELATORIO FINAL

## EDICAO: PIBIC/PAIC 2020/2021

### RECURSOS HUMANOS

| Campo                        | Informacao                                  |
| ---------------------------- | ------------------------------------------- |
| **Nome do(a) orientador(a)** | Andre Luiz Alencar de Mendonca              |
| **Nome do(a) aluno(a)**      | Francoa de Jesus Gurgel Leitao              |
| **Bolsa**                    | ( ) CNPQ ( ) UFAM ( ) FAPEAM (X) VOLUNTARIO |

---

## IDENTIFICACAO DO PROJETO

| Campo                 | Informacao                                                                           |
| --------------------- | ------------------------------------------------------------------------------------ |
| **Titulo**            | Campus Map Ufam: Modelagem, mapeamento e monitoramento do campus da UFAM Manaus - AM |
| **Codigo do Projeto** | PIB-A/0252/2020                                                                      |

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
- ( ) Nao se aplica

**Caso o projeto ainda nao esteja aprovado, justifique:**

---

## 1 INTRODUCAO

Os fragmentos florestais urbanos sao parte importante na paisagem de cidades por diversos motivos. Dentre eles destacam-se a necessidade de conservacao de biodiversidade da fauna e flora. Alem disso, tem importancia biologica para o equilibrio do ecossistema, seja em termos de ciclos naturais, seja em termos da qualidade de vida humana. Avila et al. (2014) apontam que os estudos da literatura cientifica demonstram que a vegetacao tem um papel preponderante para os recursos hidricos, especialmente atuando na conservacao de corpos d'agua - atuando na redistribuicao da agua da chuva - na formacao de novas massas atmosfericas de umidade; na atenuacao de fluxos e nos efeitos da eutrofizacao de rios, alem da reducao de processos erosivos. De acordo com Gartland (2012), a vegetacao urbana contribui decisivamente para a reducao da temperatura nas cidades. Woodley (1997) afirma que a designacao de areas protegidas em ambientes degradados e a resposta mais usual de ser humano frente a sua propria capacidade de degradar ecossistemas. Em teoria, parece ser algo mais dificil de se realizar em ambientes urbanos, onde a degradacao de ecossistemas naturais e a regra. Em uma cidade como Manaus, onde ha toda uma relacao intrinseca com areas verdes entrecortadas por igarapes e pela paisagem e comunidade associada a Floresta Amazonica, o mapeamento de areas torna-se imperioso, considerando fins de conservacao de recursos naturais. O conceito de "parques de papel" (TERBORGH e Van SCHAIK, 2004) se da para algumas areas protegidas que existem somente em mapas, nao constituindo na realidade areas protegidas, tanto por capacidade administrativa e financeira das instituicoes ligadas ao seu gerenciamento, quanto pela pouca atencao de gestores - como no caso da UFAM e sua comunidade - que nao usufruem da area objeto de protecao. Alguns trabalhos apontam que o mapeamento e ferramenta essencial nesse processo, uma vez que ela evidencia aquilo que e de interesse na conservacao, e torna publicas situacoes e elementos primordiais para o gerenciamento e engajamento de atores relacionados a area e ao seu entorno. Conforme o entendimento de Redford et. al. (2003), e possivel afirmar que projetos que mapeiam areas de interesse ecologico com fins de conservacao necessita de metricas para avaliacao de acoes de conservacao, em especial na relacao com eventos com potencial tanto de degradacao quanto de protecao de recursos naturais. Nesse contexto, acoes como o Plano de Desenvolvimento Institucional da Universidade e sua respectiva politica Ambiental, o Zoneamento Ambiental - marco para acoes regulatorias - e demais instrumentos normativos da prefeitura do Campus, devem ser consultados e levados em consideracao na atividade de levantamento de requisitos.

Segundo Lima (2017) o projeto UFPR CampusMap(UCM) teve inicio em 2014 com o objetivo de realizar o mapeamento de todas as feioes que compoem o campus da Universidade Federal do Parana, tendo inicio em um unico campus, o chamado Centro Politecnico. O mapeamento surgiu primeiramente da necessidade basica da prefeitura do campus e evoluiu a partir de pesquisas sobre tipos de representacao cartografica em ambientes internos, chamada de "indoor mapping". A ideia de um mapeamento para esse tipo de feicao e realizar tanto a adaptacao de um projeto cartografico para as representacoes do que existe no interior e exterior das areas de uso da comunidade academica, porem incluindo levantamentos cadastrais e topograficos. Os produtos a serem gerados a partir desse "mapeamento de base XX1" devem ter mente o potencial de ferramentas com o mapeamento colaborativo, o uso de dispositivos moveis, as realidades aumentada e virtual e tudo o arcabouco de necessidades dos usuarios desse mapeamento em funcao dos interesses da comunidade. Considera-se aqui o interesse em aplicar a metodologia desenvolvida por Sluter, Van-Eizakker e Ivanova (2016) na elucidacao de requisitos para aplicacoes geoespaciais, um conceito "emprestado" da engenharia de requisitos, campo da informatica que trabalha com projetos de software, onde os requisitos definem as bases para o planejamento do projeto, gerenciamento de riscos, testes de aceitacao e controle de modificacoes.

O presente trabalho constituiu uma iniciativa para levantamento de requisitos para uma aplicacao desta natureza, considerando os aspectos ecologicos, ambientais, urbanos que permeiain as atividades atuais e potencial desempenho do Campus da UFAM e sua area de entorno e influencia. A presente pesquisa buscou desenvolver um documento de requisitos, modelagem de banco de dados e levantamento georeferenciado de base cartografica atualizada do Campus, como forma de iniciar o desenvolvimento do Campus Map UFAM. Este pretende se implementar como solucao cartografica - que inclui base de dados, documentacao e produtos - destinada a ser utilizada como aplicativo para mobilidade, turismo, localizacao indoor e outdoor, entretenimento e educacao ambiental - inclusive como ferramenta de apoio para aulas da propria universidade. Alem disso, entende-se que o Campus Map UFAM pode vir a ser arotado como ferramenta de planejamento e fiscalizacao e principalmente de conservacao e monitoramento ambiental de area de relevante interesse ecologico, alem de base atualizada de feioes geograficas e cadastrais da Universidade.

---

## 2 OBJETIVOS

### 2.1 Geral

Desenvolver requisitos para mapeamento basico e projeto de banco de dados aplicado ao Campus Sen. Arthur Virgilio Filho - UFAM em Manaus - AM, sob a otica da conservacao do fragmento florestal urbano.

### 2.2 Especifico

- Desenvolver documento de requisitos para aplicacao geoespacial de mapeamento, o Campus Map UFAM;
- Apresentar modelagem de dados aplicada ao banco de dados geografico multifinalitario da area do Campus;
- Realizar levantamento aerofotogrametrico preliminar e exemplo da modelagem aplicada as feioes

---

## 3 METODOLOGIA

### 3.1 Area de Estudo

O Campus Senador Arthur Virgilio Filho e o principal campus da Universidade Federal do Amazonas, e esta localizado proximo a chamada Bola do Coroado, inicio da zona Leste da area urbana da cidade de Manaus - AM. O Campus em si faz fronteira com seis bairros da cidade. O campus da UFAM e dividido entre Setor Norte e Setor Sul e possui aproximadamente 670 hectares de area total. Segundo a UFAM (2019) existem aproximadamente 15000 membros da comunidade da UFAM utilizando de atividades academicas ou administrativas desenvolvidas exclusivamente no Campus. Em 2000, estimava-se que 15% do total da area do campus era antropizada - edificacoes e areas construidas ou modificadas em geral (AMANCIO et al. 2000). Segundo o site institucional da Pro-reitoria de Ensino e Graduacao, no interior do Campus funcionam 78 cursos de graduacao, totalizando 3818 vagas de ingresso anual e divididos em 15 unidades academicas (UFAM, 2019). Segundo CALDAS (2016) - citando dados informais da prefeitura do Campus, existem cerca de 20 nascentes e 12 igarapes no interior do Campus da UFAM. E uma area de grande importancia ecologica, porem que sofre internamente - como na expansao de areas destinadas a unidades academicas e ocupacao - e externamente, como na regiao sul do fragmento, devido a especulacao imobiliaria, e a extracao de recursos naturais como o corte seletivo a partir de trilhas clandestinas (CAMARA, 2014).

Por fim, se consideramos a APA da UFAM como um todo, e um tipo de Unidade de Conservacao que desempenha um papel fundamental na melhoria da qualidade ambiental do seu entorno, uma vez que os bairros adjacentes, originarios de ocupacoes desordenadas, nao previram areas para desempenhar esta funcao. Sobretudo, estas areas servem de abrigo para diversas especies da fauna e da flora locais (CALDAS, 2016).

### 3.2 Levantamentos Aerofotogrametricos e Bases Cartograficas

Os dados geoespaciais para este trabalho sao categorizados como outdoor (externos) e indoor (internos). Os dados outdoors incluem acessos, edificacoes, arvores, jardins, areas comuns e zoneamentos em geral. Os dados indoor sao aqueles internos, como salas de aula, laboratorios e atributos relacionados. Os levantamentos de bases cartograficas inicialmente trabalhariao apenas com dados geometricos, passiveis de levantamento aerofotogrametrico - o que implica que feioes em sub-bosque, ou cobertas por feioes mais altas, nao serao mapeadas inicialmente - constituindo analise posterior, para alimentacao de base de dados para visualizacao tridimensional. Serao programados voos continuos para levantamentos aerofotogrametrico para geracao de base cartografica associada ao banco de dados outdoor da area do Campus Sen. Arthur Virgilio Filho, UFAM, em Manaus - AM.

O equipamento a ser utilizado e do tipo ARP quadcoptero, modelo Phantom 4 pro+. Os voos serao realizados conforme especificacao tecnica apropriada para geracao de produtos em escala minima de 1:500, com pontos de controle em solo, planejando-se um total de 15 hectares por missao de voo, totalizando aproximadamente 20 missoes de voo realizadas para recobrir toda a area do campus. A partir das imagens obtidas pelo levantamento aereo sera gerado um ortofotomosaico do campus e o modelo de elevacao associado, divididos por areas. A partir destes sera possivel realizar a restituicao das feioes externas visiveis, com posterior visitas a campo para confirmacao de dados e atributos. Nesta etapa do trabalho sera restituida apenas a regiao em torno do bloco FCA 01. Estas feioes, adaptadas as necessidades do documento de requisitos, serao categorizadas e realizado o levantamento semantico de suas feioes, construindo assim a base cartografica outdoor do campus. Constituir parte da base cartografica o banco de dados de fotos georreferenciadas dos acessos aos predios e vias internas do campus.

### 3.3 Pontos de controle

Em conformidade ao levantamento aerofotogrametrico de cada area, foram estabelecidos de 3 (tres) a 4 (quatro) pontos em cada uma. Esses referenciais, primeiramente foram estabelecidos utilizando o programa Google Earth, e foram distribuidos nas regioes a serem mapeadas nas bordas do campus. Em loco, em cada area tomando como base os pontos estabelecidos virtualmente, foram feitas cruzes utilizando cal .Com isso, em cada cruz, era posicionado um GPS Geodesico modelo Hiper II, da TOPCON, no centro da mesma (FIGURA 3). Em seguida, era registrado em uma planilha, a area de voo, o numero de identificacao correspondente a cada ponto, a data que foi coletado e o inicio e fim da coleta, que foi estabelecido 10 minutos para cada referencial. Os arquivos foram gerados e armazenados em um drive do tipo SD do proprio equipamento.

### 3.3 Requisitos e modelagem

O processo de obtencao de requisitos e realizado usando quatro tarefas diferentes: estabelecer objetivos, entender o background (os dados que irao compor a aplicacao), organizar o conhecimento e coletar requisitos. O mesmo comeca com o estabelecimento dos objetivos e a definicao do problema a ser resolvido pela solucao de informacoes perpendiculares - no presente trabalho o mapeamento do Campus da UFAM.

O levantamento de requisitos obedeceu a metodologia proposta por Sluter, van Eizakker e Ivanova (2016) para elicitacao de requisitos para solucoes geoespaciais. Constituiu na adaptacao de um conjunto de questionamentos a serem respondidos pelas partes envolvidas no projeto, incluindo representantes dos atores que possuem ou utilizarao dos produtos a serem gerados no projeto Campus Map UFAM. Assim, visa-se coletar informacoes necessarias sobre os requisitos, necessidades e dominios da aplicacao, o que facilita os passos seguintes de levantamentos de fato e conhecimento do potencial para o projeto aqui proposto e as diversas necessidades de frequentadores do campus e moradores de adjacencias.

O conjunto de questoes norteadoras encaminhar entrevistas e brainstormings com voluntarios. Em conjunto com analises de documentos e literatura sobre o fragmento florestal, permitir-se-a que se entenda as necessidades e contextos relacionados ao campus. O questionario foi aplicado de forma virtual, para levantamento dos requisitos com a maior quantidade de atores possiveis, dentro de cronograma previamente planejado e adaptado para a situacao pandemica atual. O questionario pode ser acessado no link: https://forms.gle/NH3OcMaaJHur14J47

Em relacao ao modelo de dados, inicialmente utilizada a ferramenta UML (Unified Modeling Language), que e uma linguagem padrao utilizada para elaboracao de projetos de softwares, como o do Campus Map UFAM. A partir da discussao do que os usuarios necessitam ao entrar no campus e em ambientes internos da universidade, foi usado o modelo UML para a visualizacao do modelo de entidade e relacionamento de dados geograficos e de atributos iniciais das bases cartograficas, de forma a subsidiar as especificacoes basicas de um modelo aplicado ao banco de dados e ser disponibilizado como base inicial. Tambem sera modelado banco de dados de utilizacao de predios, para feioes indoor como salas de aula e coordenacao, laboratorios e secretarias, como forma de subsidiar visitas e agendamentos de atividades, inicialmente no minicampus - predios da FCA. Essa discussao resulta na criacao de dados geograficos com atributos, que serao usados em SIG para producao de mapas interativos e servicos (web services) no futuro.

---

## 4 RESULTADOS

### 4.1 Levantamentos Aerofotogrametricos

O total de areas sobrevoadas ate a presente data foi de 15 (quinze) voos na area de borda e 1 voo para a area do minicampus, setor sul. Foram realizados de acordo com a especificacao tecnica apropriada para a geracao de produtos em escala minima de 1:5000. E nas mesmas areas foram realizadas as coletas dos pontos de controle que dao suporte ao ortofotomosaico e modelo tridimensional (MDE) outdoor da area da borda do campus. A FIGURA 3 mostra, para as areas de borda, as areas sobrevoadas e as que ainda necessitam de voos.

#### 4.1.1 Pontos de controle

Em conformidade ao levantamento aerofotogrametrico de cada area, foram coletados os pontos de controle das mesma, de forma a deixar as imagens geradas com coordenadas de qualidade submetrica. Assim, foi possivel georreferenciadas as imagens para gerar os mosaicos de ortofotos. No total foram coletados um total de 51 pontos de controle que servira tambem para compor a base de dados geograficos do campus. Na sequencia, obter-se obter dados das partes centrais do campus da universidade e das areas das bordas na qual nao foi possivel levantar, dada a situacao atual dos equipamentos do laboratorio e de restricoes de entrada/transporte no campus. Esse metodo torna as feioes extraidas mais acuradas do ponto de vista geometrico, porem torna o levantamento mais lento, necessitando-se de mais tempo de campo. Alem disso, o mesmo nao podera ser utilizado nas areas internas do campus, uma vez que nao ha como abrir clareiras para colocacao de pontos.

### 4.2 Modelagem e Requisitos

Com a definicao dos usuarios alvo do sistema, e atraves da aplicacao do questionario on-line, atingiu-se um total de 34 respostas. Percebeu-se que a maioria das respostas (grafico 1), foram de alunos (92,2%), o que constitui algo que poda ser melhorado para proximas versoes deste levantamento de requisitos, que, conforme Elizakker e Sluter (2016) e um processo ciclico.

Dos respondentes da pesquisa, aqui chamados de usuarios (da estrutura do campus e do futuro Campus map UFAM), observou-se atraves das respostas da segunda questao, que muitos ja se perderam no campus, do que se se pode admitir que ha falta de informacoes sobre os espacos fisicos dentro da universidade, o qual foi pergunta direta da questao 6, no qual foi solicitado ao usuario que avaliasse a quantidade de informacoes sobre determinadas areas (Grafico 2).

Assim, pensando em cada tipo de feicao:

- Localizacao dos predios: 30 pessoas responderam que ha pouca ou informacao moderada;
- Atividade que ocorrem nos predios: 19 relataram pouca informacao;
- Localizacao e atividade dos laboratorios: 22 pessoas relataram que tambem ha pouca informacao.

Em continuacao, se houvesse um aplicativo ou programa on-line sobre informacoes em gerais do campus, cerca de 84% das pessoas que responderam o questionario, declararam que instalariam em seu celular ou computador, ao passo que mais 12% utilizariam quando tivessem necessidades de uso, o que demonstra que uma aplicacao aos moldes do que se pensa para o campus map e de interesse e pode ser adotada pela comunidade academica.

#### GRAFICO 3 - Grafico de setores correspondente as respostas da nona questao do questionario.

**Questao 9: Se houvesse algum aplicativo/programa on-line que houvesse informacoes sobre rotas, atividades que ocorrem na universidade e que apre..., detalhes sobre a fauna e flora do campus, voce: 33 respostas**

- Instalaria no seu celular: 75,8%
- Usaria no computador: 9,1%
- Nao teria interesse: 12,1%
- Utilizaria somente quando precisasse em atividades na propria UFAM

Com isso, percebeu-se com aplicacao do questionario com possiveis usuarios do Campus Map, as seguintes necessidades:

- Informacao de facil acesso sobre localizacao dos espacos fisicos da UFAM;
- Um ambiente virtual que compile essas informacoes, localizacao e atividades desses espacos.

Tais necessidades citadas acima, sao o ponto de partida para se construir a aplicacao web e para as funcionalidades que este deve ter, considerando que a construcao de uma aplicacao envolve pensar nas necessidades dos usuarios e tambem maquilo que a aplicacao tera como caracteristicas. Alem disso, pensando-se nessas necessidades e nas discussoes realizadas com o grupo de pesquisa do laboratorio de Geotecnologias FCA/UFAM, foi adaptada a modelagem do banco de dados indoor (FIGURA 5), inicialmente pensando-se no ambiente indoor do minicampus, mas com validade para os ambientes de blocos da universidade. A partir dai, foram extraidas manualmente feioes que serao implementadas na aplicacao web e no banco de dados geografico (FIGURA 6). Estas feioes sao relativas aquilo que se pode ver a partir da ortofoto e modelo digital de elevacao. Nota-se que existem varias feioes indoors ainda nao mapeadas, por conta da impossibilidade de se adentar os laboratorios e salas da Universidade para identificacao de atributos. Tambem foi quase impossivel de se imaginar atributos de interesse para quando o campus estiver em uso total por alunos, tecnicos e professores, o que provavelmente tera com que esse modelo de dados se modifique na proxima versao de revisao. No detalhe pode-se demonstrar com isso, recomenda-se que os trabalhos futuros se continue com a modelagem para feioes outdoor e demais aplicacoes.

#### FIGURA 5 - Modelo de banco de dados indoor

Fonte: Adaptado de DELAZARI et al., 2019.

Com isso, tem-se que a modelagem e o instrumento para que se construam os atributos de cada feicao vetorial no SIG (FIGURA 7). Alem disso, ela foi pensada de forma a atender os principais usos investigados na modelagem dos requisitos e baseados tambem na pesquisa realizada junto a outras iniciativas campus map, notadamente o campus map da UFPR, em Curitiba (LIMA, 2017). Ressalta-se que as necessidades da aplicacao - requisitos - do campus map Ufam pode resultar em modificacoes nos modelos de dados, que devem ser revistos conforme forem-se atendendo objetivos e expectativas de uso, usuarios e contextos de uso. Assim, o modelo deve ser aplicado e usado, em mapas de testes com usuarios, pois so assim e possivel avaliar questoes como a utilidade, usabilidade e aplicabilidade de simbologias, cores e os proprios atributos esperados para feicao mapeada e oferecida ao usuario do campus map Ufam.

#### FIGURA 6 - Feioes construidas da area do Minicampus a partir da modelagem de dados e aerolevatamento.

Fonte: Autor, 2021

Errata: onde se le "CONSTRUCOES", o correto, pela modelagem sao EDIFICACOES

#### FIGURA 7 - Exemplo de atributo para a feicao EDIFICACOES

Fonte: Autor, 2021

Os voos de borda resultaram na construcao de feioes relacionadas a pressao antropica, mas optou-se por nao extrairem-se feioes fora do campus, como edificacoes na borda ou vegetacao que nao e parte da area oficial do campus. A metodologia de voos com ARP foi suficiente para delimitacao de varias feioes, porem ainda e necessaria visitacao as areas indoor para mapeamento de salas, laboratorios e afins, uma vez que este seria uma diferencial do campus map. A partir das feioes outdoor mapeaveis, uma recomendacao para o trabalho em sequencia e a de se pensar cuidadosamente na modelagem destas feioes, o que inclui pensar nas areas verdes e arvores, com seus respectivos atributos, considerando que existem necessidades relativas aos usos academicos para estas areas - como no caso de identificacoes botanicas, acompanhamento ecologico e fisiologico, turismo, infraestrutura do campus e etc.

---

## 5 CONCLUSAO

A iniciativa do Campus map e de suma importancia para que se entenda e conheca todos os aspectos do campus da UFAM em Manaus - AM, que e uma area de bastante interesse ambiental e, obviamente, com grande fluxo de pessoas que constituem uma comunidade academica atuante. Com os resultados apresentados, e possivel concluir que o trabalho de se modelar uma base de dados necessita de conhecimento especializado e da participacao da comunidade, o que tem sido um desafio em tempos de pandemia mundial.

Os levantamentos para bases cartograficas ainda nao foram realizados ao nivel de arvores - as menores unidades de area previstas na base cartografica futura do campus map, mas ja foram iniciados a partir do mapeamento aerofotogrametrico das bordas da area do campus. O laboratorio de Geotecnologias, onde esta pesquisa se desenvolve, sofreu com a perda de um equipamento ARP causado por falha mecanica, o que fez com que a base dos limites nao pudesse ainda ser totalmente finalizada. Porem os dados adquiridos, que constituem os requisitos dos potenciais usuarios do mapa, e a base de levantamentos do setor sul/FCA e das bordas a oeste do campus ja comecam a delinear como funcionara o campus map, com modelo de dados geografico ja tendo sido desenvolvido para ambientes indoor. Estes dados irao compor as versoes futuras da aplicacao que esta em continuo desenvolvimento, sempre a partir das necessidades coletadas junto a comunidade, onde inclusive pode-se perceber os deficits de informacoes em geral, que ha sobre o campus.

O ganho cientifico deste trabalho concentrou-se no conhecimento advindo do levantamento de requisitos, e na aplicabilidade desta metodologia - em conjunto com os voos com ARP - para geracao das bases. Os procedimentos se mostraram um tanto quanto complexos, considerando o tamanho da area do campus, a situacao de equipamentos do labgeo e a situacao de pandemia, que restringiu o acesso e transporte. Alem disso, considera-se importante a discussao sobre o melhor modelo de dados aplicado as areas indoor, que deve ser posto a prova com testes com usuarios, quando das primeiras versoes da aplicacao campus map. Assim, a partir do estabelecimento da continuidade dos estudos para o campus map espera-se suprir as problematicas citadas pelos usuarios, e proporcionar uma maior conscientizacao quanto as atividades que ocorrem na universidade e a sua biodiversidade, com o uso de uma aplicacao georreferenciada multiuso para o campus Artur Virgilio Filho, da UFAM em Manaus - AM

---

## REFERENCIAS

AVILA, L.F. et al. Particao da precipitacao pluvial em uma microbacia hidrografica ocupada por Mata Atlantica na Serra da Mantiqueira - MG. Ciencia Florestal. 24(3):583-595, 2014.

BRASIL, Decreto

CALDAS, Silvio Rodrigues. Impactos ambientais sobre a floresta da UFAM. Dissertacao de Mestrado em Geografia. UFAM, 2016.

CAMARA, Joao Felipe Omena Raposo. A utilizacao de video e trilha como instrumentos de educomunicacao na APA da UFAM. Dissertacao de Mestrado em Ciencias do Ambiente e Sustentabilidade na Amazonia. UFAM, 2014.

DELAZARI, Luciene Stamato; ERCOLIN FILHO, Leonardo. Especificacoes Tecnicas de Produtos Cartograficos: Projeto UFPR CampusMap. 2019. Disponivel em: . Acesso em: 12 abril 2020.

DELAZARI, Pedro Paulo Santos; DELAZARI, Luciene Stamato. Calculo De Rotas Com O Algoritmo Do Caminho Mais Curto Em Ambientes Indoor. In: Iv Sbg - Simposio Brasileiro De Geomatica E Ii Jornadas Lusfonas Sobre Ciencias E Tecnologias De Informacao Geografica/Ctg, 2017, Presidente Prudente. Anais.... Presidente Prudente: Unesp, 2017. p. 65 - 70.

GARTLAND, Lisa. Ilhas de calor: como mitigar zonas de calor em areas urbanas. Oficina de Textos, 2011.

HARRIS, Leila M.; HAZEN, Helen D. Power of maps:(Counter) mapping for conservation. ACME: An International Journal for Critical Geographies, v. 4, n. 1, p. 99-130, 2005.

LIMA, C. R. Desenvolvimento de Aplicativo para Dispositivos moveis com mapas indoor para o projeto UFPR Campus Map. Trabalho de Conclusao de Curso em Eng. Cartografica e de Agrimensura. Universidade Federal do Parana. 2017.

MANAUS, Decreto n° 1.503 de 27 de marco de 2012. Diario Oficial do Municipio. Disponivel em: <http://migre.me/eo6il>. Acesso em 10 jul. 2020.

MARCON, Jaydione Luis et al. Biodiversidade fragmentada na floresta do Campus da Universidade Federal do Amazonas: conhecimento atual e desafios para a conservacao. In: Biodiversidade amazonica: caracterizacao, ecologia e conservacao, por MARCON, Jaydione Luis et al. (orgs). Manaus: Edua, 2012.

REDFORD, Kent H. et al. Mapping the conservation landscape. Conservation biology, v. 17, n. 1, p. 116-131, 2003.

SOMMERVILLE, Ian. Engenharia de Software, 9 edicao. Pearson, Addison Wesley, 2011.

SLUTER, Claudia Robbi; VAN ELZAKKER, Corne P. J. M.; IVANOVA, Ivana. Requirements Elicitation for Geo-information Solutions. The Cartographic Journal, [s.l.], v. 54, n. 1, p.77-90, 20 jun. 2016.

Maney Publishing. http://dx.doi.org/10.1179/1743277414y.0000000092.

UFAM, Sitio Institucional - Pro-reitoria de Ensino e Graduacao. 2019 . Acesso em 01 jul. 2020.

WOODLEY, Stephen. Science and protected area management: An ecosystem-based perspective. In, James G. Nelson and Rafael Serafin (eds.) National Parks and Protected Areas: Keystones to Conservation and Sustainable Development. Berlin: Springer-Verlag, pp.11-21. 1997.
