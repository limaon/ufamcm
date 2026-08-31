# RELATORIO FINAL

## EDICAO: PIBIC/PAIC 2023/2024

### RECURSOS HUMANOS

| Campo                        | Informacao                                  |
| ---------------------------- | ------------------------------------------- |
| **Nome do(a) orientador(a)** | Andre Luiz Alencar de Mendonca              |
| **Nome do(a) aluno(a)**      | Matheus Felipe Nascimento da Silva          |
| **Bolsa**                    | (X) CNPQ ( ) UFAM ( ) FAPEAM ( ) VOLUNTARIO |

### IDENTIFICACAO DO PROJETO

| Campo                    | Informacao                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Titulo**               | Proposta de Interface integrada do Campus Map UFAM                                                                                                                          |
| **Codigo do Projeto**    | PIB-A/0252/2023                                                                                                                                                             |
| **Area de Conhecimento** | (X) Exatas e da Terra ( ) Agrarias ( ) Biologicas ( ) Sociais Aplicadas ( ) Engenharias ( ) Saude ( ) Ciencias Humanas ( ) Linguistica, Letras e Artes ( ) Multidisciplinar |

### COMITE DE ETICA EM PESQUISA COM HUMANOS (CEP) OU ANIMAIS (CEUA)

- ( ) Aprovado - Numero do protocolo: _______
- (X) Nao se aplica

**Caso o projeto ainda nao esteja aprovado, justifique:**

---

## RESUMO

O Campus Map pretende ser a centralizacao de dados georreferenciados da Universidade Federal da Amazonas e seus campi, contemplando qualquer tipo de dado que tenha caracteristicas espaciais. Sabe-se que o campus da UFAM tem direta conexao com fragmentos florestais urbanos, especialmente no caso do Campus Sen. Arthur Virgilio Filho, em Manaus - AM, alem da area da fazenda experimental, na area peri-urbana. Dado o volume de dados e a grande quantidade de possibilidades de usos, usuarios e contextos de uso, a interface para este projeto constitui um grande desafio de implementacao, uma vez que ha um grande quantitativo de dados de base cartografica, banco de dados georreferenciado, conjunto de imagens georreferenciadas, dados bi e tridimensionais de areas construidas e de recursos ambientais, ate visualizacoes ao nivel da rua para investigacao multiuso, variando desde especimes florestais ate dados de infraestrutura predial, ao longo de todos os campi. Assim, o presente trabalho investigou um conjunto de informacoes modeladas em um banco de dados do campus Senador Arthur Virgilio Filho e para a FAEXP - Fazenda Experimental da UFAM, para fins de cadastro e visualizacao de informacoes comuns e relevantes para os mais diversos usos. Com a utilizacao de ferramentas de desenvolvimento, graficos, sistemas gerenciadores de Banco de dados e principios de projeto cartografico e design de interfaces aplicados ao projeto _mobile_, este trabalho buscou propor e discutir solucoes para a implementacao de interface para o projeto, contemplando os estudos previos do Campus Map Ufam, e estudos de caso atuais, alem da usabilidade. Neste contexto, foram integrados dados de experimentos passados e dados sobre atividades de pesquisa e extensao historicamente importantes, alem de mapeamentos colaborativos, infraestrutura do campus e sua aplicacao em uma interface que inclua elementos de realidade aumentada para funcionamento em dispositivos _mobile_, aos moldes do campus map original da UFPR.

### PALAVRAS-CHAVE

Campus UFAM, Campus Map, Banco de Dados, Projeto _mobile_, Usabilidade

---

## INTRODUCAO

O Campus Map e um projeto desenvolvido inicialmente pela Universidade Federal do Parana (UFPR) (LIMA, 2017) e tem o objetivo de realizar o mapeamento _indoor_ e _outdoor_ de areas de campus universitarios. Sua implementacao, para mapeamento do campus universitario UFAM, vem sendo trabalhada nos ultimos anos, inicialmente com atividades basicas de levantamento de requisitos e de feicoes por meio de aerofotogrametria (LEITAO, 2021) e atualmente busca pensar em representacoes e projeto cartografico aplicado, formas de mapeamento colaborativo, e no desenvolvimento de ferramentas que possam auxiliar a comunidade academica, com atencao especial no caso do Campus Map UFAM a questoes da area florestal.

Diante da base de dados cientificos obtem-se um foco a modelagem aplicada, especialmente no desenvolvimento de bases georreferenciadas para o suporte de aplicacoes. No setor florestal temos aplicacoes voltadas para a area de inventarios florestais (FERREIRA, 2009), manejo e monitoramento (REIS, 2017), assim como estudos para o desenvolvimento de atividades de SMART CITIES (YIN _et al._, 2015; CUNHA _et al._, 2006), que sao de especial interesse no desenvolvimento deste trabalho. Porem sao poucos os estudos que englobam os aspectos especificos do gerenciamento de informacoes do ambiente universitario, em especial a integracao dos usos de uma area ambientalmente importante com a sua aplicacao no ambiente academico, desde o levantamento de requisitos ate o projeto cartografico e as possibilidades de representacao e desenvolvimento de interface.

A medida que os computadores aumentam de potencia e diminuem sua estrutura, novos aplicativos de computacao movel, vestiveis e pervasivos estao se tornando rapidamente viaveis. A realidade aumentada e definida como uma tecnologia que sobrepoe uma imagem gerada por computador a visao de um usuario do mundo real, fornecendo assim uma visao composta (MCMILLAN, 2017). Os sistemas de realidade aumentada integram informacoes no ambiente fisico de uma pessoa para que ela perceba essa informacao como existente em seu entorno. Esses sistemas moveis fornecem o servico sem restringir o paradeiro do individuo a uma area especialmente equipada. Idealmente, eles funcionam virtualmente em qualquer lugar, adicionando uma camada palpavel de informacoes a qualquer ambiente sempre que desejado.

O material apresentado por computador e integrado diretamente ao mundo real ao redor da pessoa em roaming livre, que pode interagir com ele para exibir informacoes relacionadas, resolver consultas e colaborar com o sistema (HOLLERER, 2004). Fundamentando-se na diminuicao dos _hardwares_ e o aumento no processamento dos dados, o uso da realidade aumentada tem sido abordado em diversos setores. Dentre os exemplos de aplicacoes, encontra-se: a apresentacao de objetos virtuais para tratamento de fobias (BOTELLA _et al._, 2016); a navegacao maritima utilizando sistemas imersivos (GRABOWSKI, 2015); a educacao ambiental (KRAUSE, 2019); e a utilizacao visando a conservacao de areas com a apresentacao de camadas de informacoes sobrepostas e imagens de cameras, muitas vezes utilizada em patrimonios historicos-arquitetonicos funcionando ao conhecimento das edificacoes (PIEDRICCA _et al._, 2016).

A conservacao da biodiversidade representa um dos maiores desafios deste seculo, em funcao do elevado nivel de perturbacoes antropicas dos ecossistemas naturais (VIANA e PINHEIRO, 1998). Este contexto torna obvia a importancia de aplicar estudos relacionados a conservacao de areas florestadas, a preservacao de memorias para concretizar e clarificar sua relevancia, e da mesma forma, avaliar o historico de experimentos cientificos e atividades de extensao relacionadas a universidade e sua area de ocupacao. O mapeamento geografico de um campus universitario constitui-se um desafio, pois envolve uma variedade de informacoes que precisam ser integradas em um sistema de banco de dados e de visualizacao de dados georreferenciados, incluindo imagens, vetores e analises relacionadas aos pretensoes usuarios da area e do sistema proposto.

Este projeto propoe o desenvolvimento e estudo de uma interface - ou conjunto de interfaces - para o mapeamento de areas dos campi da Universidade Federal do Amazonas. A importancia do mapeamento de um campus universitario e amplamente reconhecida na literatura. Um sistema de informacoes geograficas (SIG) pode ser usado para integrar informacoes de diversas fontes e fornecer uma plataforma para a analise e visualizacao de dados (CAMARA _et al._, 2018). Alem disso, a integracao de um banco de dados multiuso em um servidor de dados geograficos pode aumentar a eficiencia do gerenciamento de informacoes e permitir a tomada de decisoes mais embasadas e de forma mais rapida (ABBAS _et al._, 2020). A implementacao de uma interface _mobile_ e _desktop_ multiuso para o mapeamento do campus universitario pode facilitar o acesso aos dados geograficos e melhorar a eficiencia da coleta de dados em campo (CAMARA _et al._, 2018). Uma interface intuitiva e facil de usar pode aumentar a adesao dos usuarios e melhorar a qualidade dos dados coletados. A avaliacao de estudos de caso de funcionamento e fluxo de uso possiveis da interface e essencial para identificar possiveis limitacoes e oportunidades de melhoria na interface (ABBAS _et al._, 2020). A avaliacao deve ser baseada em metricas objetivas, como a eficiencia na coleta de dados e a facilidade de uso da interface, bem como em feedback qualitativo dos usuarios.

Assim, o presente trabalho buscou implementar e avaliar os usos e contextos de uso da interface Campus Map, trabalhando-se desde o modo de producao do banco de dados, ate a interface usando-se ferramentas web diversas. Dessa forma, buscou contribuir com a implementacao do Campus Map UFAM e disponibilizacao da ferramenta para a comunidade academica da Universidade.

---

## OBJETIVOS

### Geral

Analisar casos para uso de interface _mobile_ e _desktop_ do Campus Map UFAM.

### Especificos

- Conectar banco de dados multiuso em servidor de dados geografico;
- Implementar interface _mobile_ e _desktop_ multiuso;
- Avaliar estudos de caso de funcionamento e fluxo de uso possiveis da interface.

---

## METODOLOGIA

### Area de Estudo

O Mini Campus da Universidade Federal do Amazonas - UFAM (3 graus 05' 59"S, 59 graus 58' 30"W) (FIGURA 1) fica localizado na Avenida Rodrigo Otavio, bairro Coroado, zona sul da cidade de Manaus. A area abrange uma grande mancha verde dentro do perimetro urbano de Manaus, sendo responsavel por conter variadas fauna e flora amazonicas. (BORGES e GUILHERME, 2000). O Campus Senador Arthur Virgilio Filho e o principal campus da Universidade Federal do Amazonas, e esta localizado proximo a chamada Bola do Coroado, inicio da zona Leste da area urbana da cidade de Manaus - AM. O Campus em si faz fronteira com seis bairros da cidade. O campus da UFAM e dividido entre Setor Norte e Setor Sul e possui aproximadamente 670 hectares de area total. Segundo a UFAM (2008) existiam aproximadamente 15.000 membros da comunidade da UFAM participando de atividades academicas ou administrativas desenvolvidas exclusivamente no Campus. Em 2000, estimava-se que 15% do total da area do campus era antropizada - edificacoes e areas construidas ou modificadas em geral (AMANCIO _et al._, 2000).

Segundo o site institucional da Pro-reitoria de Ensino e Graduacao, no interior do Campus funcionam 78 cursos de graduacao, totalizando 3.818 vagas de ingresso anuais e divididos em 15 unidades academicas (UFAM, 2019). Segundo CALDAS (2016) - citando dados informais da prefeitura do Campus, existem cerca de 20 nascentes e 12 fluxos de igarapes no interior do Campus da UFAM. E uma area de grande importancia ecologica, porem que sofre internamente - como na expansao de areas destinadas a unidades academicas e ocupacao - o externamente, como na regiao sul do fragmento, devido a especulacao imobiliaria, e a extracao de recursos naturais como o corte seletivo a partir trilhas clandestinas (CAMARA, 2014). Se considerarmos a APA da UFAM como um todo, e um tipo de Unidade de Conservacao que desempenha um papel fundamental na melhoria da qualidade ambiental do seu entorno, uma vez que os bairros adjacentes, originarios de ocupacoes desordenadas, nao previram areas para desempenhar esta funcao.

Sobretudo, estas areas servem de abrigo para diversas especies da fauna e da flora locais (CALDAS, 2016). Atualmente a area do campus esta inserida em uma Area protegida, conhecida como APA MANAUS, sob gestao da Prefeitura Municipal de Manaus. A Fazenda Experimental da Universidade Federal do Amazonas - FAEXP (02 graus 39' 41,4"S, 60 graus 03' 29,1" e 60 graus 07' 57,5"W) esta localizada no km 38 da rodovia BR-174 e faz limite ao sul com o Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renovaveis - IBAMA e ao norte com duas estacoes experimentais pertencentes ao Instituto Nacional de Pesquisas da Amazonia - INPA. (CRUZ,2001). A fazenda Experimental da UFAM - FAEXP (02 graus 37' 17,1" e 02 graus 39' 41,4"S, 60 graus 03' 29,1" e 60 graus 07' 57,5"W) esta localizada no km 38 da rodovia BR-174 e faz limite ao sul com o Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renovaveis - IBAMA e ao norte com duas estacoes experimentais pertencentes ao Instituto Nacional de Pesquisas da Amazonia - INPA. (CRUZ, 2001).

Nesta area existem diversos experimentos dos cursos da Faculdade de Ciencias Agrarias da UFAM e ha areas de floresta primaria e secundaria, com diferentes fitofisionomias. Tanto o Mini Campus, quanto a FAEXP, foram as sedes destinadas para o experimento deste trabalho, onde foi implementada a conexao com banco de dados geografico em servidor e a criacao de interface com aplicacao de elementos de realidade aumentada e sua respectiva simbologia, englobando toda a base cartografica ja levantada, dentro dos estudos do Campus Map. Modelagem e implementacao.

O banco de dados tem sido alimentado pela revisao bibliografica de publicacoes que tenham realizado estudos de aspectos de fauna e flora dentro do campus, apoiados por artigos e textos fisicos obtidos junto a Biblioteca Central da UFAM. Foram tambem consultados professores dos departamentos supracitados e administracao da FAEXP, como forma de reconstituicao de atividades e obtencao de dados. O banco de dados esta implementado em servidor disponibilizado pela UFPR, para dados vetoriais. O mesmo foi conectado a Servidor de mapas do tipo Geoserver, com disponibilizacao de geoservicos (WMS).

A interface foi desenvolvida a partir do trabalho de Leilao (2022 - no prelo) que preve o design inicial de interface _mobile_. A interface deve necessariamente contemplar o mapa base - incluindo estruturas e nomes associados, camadas tematicas de estudos do Departamento de Ciencias Florestais (notadamente parcelas de monitoramento), camadas em Realidade Aumentada para _mobile_ e imagens no formato SVI, utilizando a base iniciada com o apoio do app Mapillary. Para a criacao da interface cartografica interativa, a escolha da tecnologia e linguagem de programacao para desenvolvimento de sites responsivos e crucial para garantir que a interface seja acessivel em diferentes dispositivos, tamanhos de tela e sistemas operacionais.

Foram usadas as tecnologias mais utilizadas para desenvolvimento, linguagens HTML5, CSS3 e JavaScript. Juntos, esses tres componentes formam a base do que e conhecido como "front-end" de um site ou aplicativo web. Alem disso, foi estudado o uso de frameworks e bibliotecas, como Bootstrap, Foundation e Materialize, de forma a facilitar o processo de desenvolvimento. Adicionalmente, considerando o mapa interativo, foi utilizado o openlayers e leaflet, como bibliotecas de apoio a funcionalidades interativas tipicas de mapas. Casos de Estudo Alem dos casos de consulta basica e visualizacao de dados do mapa base e dos temas relativos aos estudos do DCF/FCA/UFAM, foi tambem estudado o caso do mapeamento de casos de violencia no campus da UFAM em Manaus e arredores, com previsao de disponibilizacao pelo site oficial da UFAM.

---

## RESULTADOS/DISCUSSAO

A implementacao deste projeto diz respeito ao servidor de banco de dados, servidor de mapas e interface. Todas dependem da existencia de servidor - maquina virtual com espaco e acesso remoto, para guarda e acesso dos dados do projeto, incluindo dados geograficos e base de dados geral. Assim, devido ao nao atendimento, por parte do OTIC-UFAM, da demanda apresentada de disponibilizacao de servidor por parte do projeto, o cronograma original deste projeto foi prejudicado.

Apos muitas promessas de resolucao, os autores decidiram recorrer a contratacao de servico AWS (Amazon Web Services) da Amazon, tendo em vista que a plataforma oferece uma serie de recursos computacionais necessarios para o processamento e armazenamento de dados na nuvem, alem de disponibilizacao de servidor online. Um fator determinante para a escolha desse servico, foi a disponibilidade de um plano gratuito por um ano, o que permitiu a implementacao da interface, desenvolvendo os recursos do projeto. Porem, faz-se salutar informar que o uso de ips estaticos para acesso a web e localizado na UFAM, tornando os testes para implementacao impossiveis de serem realizados dentro do laboratorio de geotecnologias da FCA/UFAM ou em qualquer dependencia da Universidade que se utilizasse da conexao da rede UFAM como impossivel.

Durante a execucao deste projeto, foi utilizado o banco de dados PostgreSQL, configurado no servico Amazon RDS (Relational Database Service). Essa configuracao foi determinada para facilitar a administracao do banco de dados e garantir seu crescimento e disponibilidade. Alem disso, os IPs publicos foram habilitados, sendo bastante acessiveis onde os dados podem ser visualizados pelos estudantes e publico externo, o que pode ser essencial para a colaboracao entre os usuarios e a equipe de pesquisa para a integracao de diferentes sistemas utilizados no projeto. Ressalta-se que com essa versao de testes em funcionamento possa se sensibilizar a administracao da UFAM para a disponibilizacao de espaco em servidor da propria instituicao.

Os dados espaciais focaram, para esta etapa do estudo, na analise de elementos externos (_mapeamento outdoor_) e utilizaram como padrao de atributos a modelagem desenvolvida para o Campus Map UFPR. Foi utilizada a mesma estrutura do banco original, porem este estudo abrangeu somente o desenho e mapeamento de edificacoes (com andares), areas de estacionamento, salas de aula, areas verdes, hidrografia, alem de feicoes de registro pontual de ocorrencias de crimes. Alem disso, os dados externos de mapas ao nivel de rua encontram-se armazenados no servidor da aplicacao Mapillary. Assim, o desenho da plataforma inicial considera nao apenas a estrutura fisica de cada um desses elementos, mas tambem sua funcao e localizacao no contexto espacial da Universidade e as possibilidades de uso avancadas nos estudos previos dessa aplicacao.

A cuidadosa integracao das aplicacoes e tecnologias propostas permite a navegacao e interacao com elementos do ambiente, alem de aumentar as possibilidades de visualizacao dos dados do Campus e de interesse de usuarios. Para esta etapa do projeto, a area de estudo foi concentrada no setor sul da Universidade Federal do Amazonas, sendo publicados os dados na plataforma de visualizacao de dados aberta e foi construida uma proposta de interface para o projeto utilizando linguagem de programacao JavaScript, com as bibliotecas tailwind e framework react, alem de interface de mapas openlayers, com acesso a um geoserver (servidor de mapas java) configurado sob um banco de dados espacial (postgresql 16/postgis). Todos rodando em servidor ubuntu EC2 Aws.

O site oficial do projeto foi implementado e esta disponivel para acesso publico (FIGURA 2). A plataforma foi desenvolvida com o objetivo de disponibilizar informacoes detalhadas sobre o campus, incluindo dados, informacoes e outros materiais relevantes, promovendo a transparencia e o compartilhamento de conhecimento com a comunidade academica e o publico em geral.

A proposicao de funcionalidades ainda possui espaco para crescimento, pensando na integracao de aplicacoes de gerenciamento predial, avaliacoes e estudos ambientais e florestais, alem da conducao de experimentos cientificos. Devido aos atrasos no cronograma explicitados acima, o presente projeto foi renovado, para que sejam conduzidas novas investigacoes das possibilidades para estas aplicacoes, do mapeamento adequado de novas camadas de interesse e das tecnologias envolvidas, bem como de testes com potenciais usuarios e aplicacoes futuras como de apoio e organizacao de atividades esportivas e turisticas no campus e do fragmento florestal em si.

### Analise de Casos de uso da Aplicacao

As aplicacoes facilitam a implementacao da interface, pois criam o mecanismo basico da interacao com os potenciais usuarios, evidenciando usos e contextos associados. Este trabalho discute as possibilidades abaixo descritas:

**Estudo de caso 1: Localizacao espacial de edificios no campus.**

1. Localizacao de predios ou salas para calouros ou usuarios externos;
   1.1 Um calouro do curso de Engenharia Florestal querem obter informacoes da sua sala de aula em seu primeiro dia e busca por ela onde tera atividades (FIGURA 3);
   1.1.1 Dados necessarios:
   - a) base cartografica: ruas, edificios, salas de aula, laboratorios;
   - b) rotas do tipo ponto inicial e ponto final;
   - c) rotas manuais com realidade aumentada;
   - d) Acesso ao site via _mobile_ no local de uso.

2. Usuario entra no site: 18.116.82.248/UFAMCM:
   2.1. Clica em: LOCALIZAR NO CAMPUS;
   2.2. Por meio de um mapa e uma barra de localizacao, o usuario pode inserir sua localizacao atual para a ORIGEM da rota, ou digitar um ponto de interesse;
   2.3. O sistema compara a string digitada com o campo "NOME" das tabelas correspondentes as entidades do esquema CAMPUS e da ao usuario as opcoes possiveis;
   2.4. Caso a entrada seja por coordenada capturada, o sistema posiciona o usuario no mapa por meio de uma seta vermelha;
   2.5. Para o DESTINO da rota, o usuario pode digitar tres informacoes:
   - a) nome do predio;
   - b) andar do predio;
   - c) nome/numero da sala.

   2.6. Nome do predio e equivalente ao campo NOME da tabela EDIFICACOES:
   - (a) andar do predio e equivalente ao campo ANDARES das tabelas CAMPUS_ANDAR_SUBSOLO, CAMPUS_ANDAR_0, CAMPUS_ANDAR_1, CAMPUS_ANDAR_2 e CAMPUS_ANDAR_3;
   - (b) nome/numero da sala e equivalente a SALA as tabelas CAMPUS_ANDAR_SUBSOLO, CAMPUS_ANDAR_0, CAMPUS_ANDAR_1, CAMPUS_ANDAR_2 e CAMPUS_ANDAR_3.

3. Ao mostrar o caminho no mapa, o usuario tera o mapa dividido em duas telas, uma com o mapa 2D e a rota, e a interface mapillary, com fotos SVI (imagens ao nivel da rua). Essa visualizacao e interativa, porem nao acompanha (FIGURA 4).

**Estudo de caso 2: Ocorrencias de episodios de violencia no campus.**

1. Usuario que sofre um assalto, ou algum outro tipo de violencia acessa o campus map e clica em INFORMAR OCORRENCIA:
   1.1 O site abre um mapa 2D com a base cartografica do campus;
   1.2 O usuario pode informar a ocorrencia de duas maneiras:
   - 1.2.1 Ou pela localizacao atual do seu GPS - esse ponto pode ja ser utilizado como ocorrencia, ou pode apenas centralizar o mapa, para que o usuario aponte a ocorrencia;
   - 1.2.2 Ou clicando no mapa - cria ocorrencia;
   - 1.2.3 Ou digitando um ponto de interesse - esse ponto pode ja ser utilizado como ocorrencia, ou pode apenas centralizar o mapa, para que o usuario aponte a ocorrencia.

1.3 Ao criar a ocorrencia, a tela recebe um _pop-up_ (FIGURA 4) para que sejam inseridos os detalhes da ocorrencia, a saber: tipo de ocorrencia; data e hora; localizacao; descricao; detalhes; testemunhas; bens roubados e a geolocalizacao

1.4 O registro e armazenado no banco, no esquema OCORRENCIAS, Tabela REGISTRO_OCORRENCIAS;

1.5 Apos registrar o usuario pode visualizar as ocorrencias, no mapa com a base cartografica (FIGURA 5), filtradas por: TIPO_OCORRENCIA, DATA_HORA, LOCALIZACAO, DESCRICAO, DETALHES, TESTEMUNHAS, BENS_ROUBADOS, GEOM.

### Visualizacao de dados geograficos

A integracao com o banco de dados, para os dados geograficos, e usualmente realizada por meio de um servidor de mapas. Segundo o site oficial, o GeoServer e uma plataforma desenvolvida em Java que possibilita aos usuarios a visualizacao e edicao de dados geoespaciais. Ele oferece uma ampla flexibilidade na criacao de mapas. Na implementacao foram publicados dados de interesse como as edificacoes, ensalamentos e as arvores AHPICE - arvores de interesse ambiental e historico, patrimonios imateriais, e de importancia cultural e estetica, que sao arvores mapeadas para projeto do DCF. Estes elementos compoem a base de dados do campus map UFAM e baseiam-se nos estudos previos do projeto e levantamentos in loco. A interface de mapas com dados geograficos pode ser vista em funcionamento na (FIGURA 6).

Em virtude dos desafios enfrentados ao longo do desenvolvimento do projeto, especialmente devido a indisponibilidade de um servidor por parte do CTIC-UFAM, nao foi possivel realizar testes com usuarios na interface conforme planejado. Entretanto, o projeto acertou sua renovacao. Permitindo ajustes e melhorias na interface, assegurando que ela atenda as necessidades dos usuarios e aos objetivos da pesquisa.

**Estudo de caso 3: Informacoes de arvores AHPICE no campus**

1. Aluno de florestal querendo conhecer a historia da arborizacao do campus para a disciplina de Arborizacao e paisagismo urbano:

1.1. A partir da interface inicial (FIGURA 2) o usuario pode entrar no mapa base do campus map e visualizar feicoes pontuais, pre-selecionadas como arvores de interesse (chamadas de arvores AHPICE - Acronimo para arvores de importancia Ambiental Historica Patrimonios Imateriais, Culturais e Ecologica). A partir desta interface tambem e possivel acessar um modelo tridimensional (disponibilizado na web por meio do modelo WEBGL), com a pagina disponibilizada em interface (FIGURA 8).

1.2. No Modelo e possivel notar que ainda sao necessarios ajustes na modelagem de nuvem de pontos, para tornar possivel a analise de elementos da arvore e uma analise temporal da situacao do individuo arboreo. Porem a navegacao na mesma e fluida e permite que o aluno consiga visualizar o especime de maneira realista. Recomenda-se que o estudo para este tipo de interface integre tambem a possibilidade de insercao de elementos de realidade aumentada para entendimento de dados fisiologicos e historico de intervencoes silviculturais da arvore, como podas e tratamento de pragas.

---

## CONCLUSAO

A implementacao deste projeto focou na criacao de um ambiente digital para o armazenamento, processamento e visualizacao de dados geograficos e gerais relacionados ao campus universitario.

Com os resultados obtidos, conclui-se que a interface desenvolvida neste trabalho representa um ponto de partida promissor para futuros aprimoramentos, o banco produzido podera ser enriquecido com adicao de novos atributos pertinentes aos usuarios, sendo continuamente atualizado. O potencial da plataforma reside em sua capacidade de auxiliar calouros e visitantes externos na localizacao de seus destinos alem de fornecer informacoes para tomadas de decisoes como dados de ocorrencias no campus da Universidade Federal do Amazonas, proporcionando informacoes uteis e curiosidades sobre o ambiente universitario.

Portanto, recomenda-se que a Universidade invista na disponibilizacao de seu proprio servidor, o que possibilitaria a realizacao de testes mais aprofundados e a criacao de mapas interativos, garantindo maior autonomia ao projeto.

---

## REFERENCIAS

[1] ABBAS, A. M., Ali, M., Yousaf, M. H., & Al-Maliki, M. A. (2020). Spatial database technology for geographic information systems. _Journal of King Saud University-Computer and Information Sciences_, 32(3), 239-246.

[2] BORGES, S. H. & GUILHERME, E. (2000). Comunidade de aves em um fragmento Florestal urbano em Manaus, Amazonas, Brasil. _Ararajuba: Revista Brasileira de Ornitologia_, 8(1), Belo Horizonte.

[3] BOTELLA, C. et al. (2016). In Vivo versus Augmented Reality Exposure in the Treatment of Small Animal Phobia: A Randomized Controlled Trial. _Plos One_, 11(2), 1-22.

[4] CAMARA, G., Davis Jr, C. A., & Monteiro, A. M. V. (2018). _Introducao a ciencia da geoinformacao_. INPE.

[5] CRUZ, J. (2001). Caracterizacao morfologica, fenologica e produtividade de Oenocarpus bacaba Martius (Palmae) em floresta de terra firme e pastagens na Amazonia Central. Tese de Doutorado, Instituto Nacional de Pesquisas da Amazonia/Universidade Federal do Amazonas, Manaus, Amazonas.

[6] GRABOWSKI, M. (2015). Research on Wearable, Immersive Augmented Reality (WIAR) Adoption in Maritime Navigation. _Journal of Navigation_, 68(3), 453-464.

[7] Geoserver. (2024). Disponivel em: <https://geoserver.org/about/>. Acesso em: 19 de fev. de 2024.

[8] KRAUSE, F. C. (2019). _Educacao ambiental baseada no lugar com realidade aumentada: metodos e diretrizes para a transposicao didatica no desenvolvimento e uso de aplicativos_.

[9] LEITAO, F. (2021). _Campus Map Ufam: Modelagem, mapeamento e monitoramento do campus da UFAM_. Relatorio final - Iniciacao cientifica. UFAM, Manaus, AM.

[10] LIMA, C. R. (2017). _Desenvolvimento de aplicativo para dispositivos moveis com mapas indoor para o projeto UFPR Campus Map_. Trabalho de graduacao (Engenharia Cartografica e de Agrimensura)-Setor Ciencias da Terra. Universidade Federal do Parana, Curitiba.

[11] MCMILLAN, K., FLOOD, K., & GLAESER, R. (2017). Virtual reality, augmented reality, mixed reality, and the marine conservation movement. _Aquatic Conservation: Marine and Freshwater Ecosystems_, 27, 162-168.

[12] PIERDICCA, R. et al. (2016). Smart maintenance of riverbanks using a standard data layer and Augmented Reality. _Computers & Geosciences_, 95, 67-74.

[13] VIANA, V. & PINHEIRO, L. (1998). Conservacao da biodiversidade em fragmentos florestais. _Serie tecnica IPEF_, 12(32), 25-42.
