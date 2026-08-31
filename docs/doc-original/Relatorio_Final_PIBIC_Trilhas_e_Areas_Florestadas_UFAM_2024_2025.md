# RELATORIO FINAL

## EDICAO: PIBIC/PAIC 2024/2025

### RECURSOS HUMANOS

| Campo                    | Informacao                                    |
| ------------------------ | --------------------------------------------- |
| Nome do(a) orientador(a) | Andre Luiz Alencar de Mendonca                |
| Nome do(a) aluno(a)      | Matheus Felipe Nascimento da Silva            |
| Bolsa                    | ( X ) CNPQ ( ) UFAM ( ) FAPEAM ( ) VOLUNTARIO |

### IDENTIFICACAO DO PROJETO

| Campo             | Informacao                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Titulo            | Trilhas e Areas Florestadas do Campus Map UFAM - Estudo de dados tridimensionais e realidade aumentada |
| Codigo do Projeto | PIB-A/0209/2024                                                                                        |

### AREA DE CONHECIMENTO

- ( ) Exatas e da Terra
- ( X ) Agrarias
- ( ) Biologicas
- ( ) Sociais Aplicadas
- ( ) Engenharias
- ( ) Saude
- ( ) Ciencias Humanas
- ( ) Linguistica, Letras e Artes
- ( ) Multidisciplinar

### COMITE DE ETICA EM PESQUISA COM HUMANOS (CEP) OU ANIMAIS (CEUA)

- ( ) Aprovado - Numero do protocolo: _______
- ( X ) Nao se aplica

Caso o projeto ainda nao esteja aprovado, justifique:

---

## RESUMO

As areas verdes desempenham um papel fundamental na promocao do lazer e da saude das pessoas, com destaque para as trilhas onde executam caminhadas como atividades praticas e acessiveis. Essas areas sao relevantes para apresentar novos ambientes as pessoas e proporcionar possibilidades aqueles que nao podem frequentar um dos maiores fragmentos verdes nativos da floresta tropical amazonica. Este estudo tem como objetivo desenvolver e discutir metodologia para uma interface web interativa com mapas e imagens SVI (Street View Imagery) para orientacao e navegacao dos usuarios. A area de estudo esta localizada na Universidade Federal do Amazonas. O projeto utiliza plataformas como Amazon, Mapbox e Mapillary, sendo esta ultima responsavel pela coleta de imagens SVI atraves do smartphone Android. A integracao da interface e realizada por meio de programacao responsiva. Como resultado conseguimos criar uma imersao em um ambiente web, permitindo a visualizacao tanto da trilha por meio de imagens quanto de sua geolocalizacao em um mapa interativo. Embora a interface seja responsiva, ainda sao necessarias melhorias para aprimorar a experiencia do usuario, com a interface final sendo futuramente objeto de testes com usuarios.

**Palavras Chave:** CampusMap, Imagens SVI, Navegacao, Interface interativa.

---

## INTRODUCAO

Estudos de Interfaces Cartograficas vem sendo realizados nos ultimos anos na area da Cartografia aplicada, com especial interesse na area de meio ambiente. Em areas florestais, existe um interesse especial para o mapeamento de diversos aspectos da floresta, como estrategia educacional, de gerenciamento, monitoramento e de pesquisa aplicada.

Situado em uma das maiores florestas tropicais, a Universidade Federal do Amazonas (UFAM) encontra-se inteiramente cercada pela Floresta Amazonica, proporcionando um ambiente onde a educacao e a natureza coexistem de forma integrada. Seu campus funciona como um laboratorio vivo, oferecendo a estudantes e pesquisadores a oportunidade de contemplar a biodiversidade, os ecossistemas, e os ciclos hidrologicos. Essa imersao possibilita a producao de conhecimento cientifico aplicado a conservacao.

No setor florestal tem-se aplicacoes voltadas para a area de inventarios florestais (FERREIRA, 2009), manejo e monitoramento florestal (Correa, 2021), Biodiversidade (SANTOS, 2017), assim como estudos para o desenvolvimento de atividades de SMART CITIES (YIN et al., 2015; CUNHA et al., 2006), que sao de especial interesse no desenvolvimento deste trabalho, que se enquadra no ambito dos estudos do Campus Map UFAM.

O CampusMap e um projeto desenvolvido inicialmente pela Universidade Federal do Parana (UFPR) (LIMA, 2017) e tem o objetivo de realizar o mapeamento indoor e outdoor de areas de campi universitarios. Atualmente busca pensar em representacoes e projeto cartografico aplicado, formas de mapeamento colaborativo, e no desenvolvimento de ferramentas que possam auxiliar a comunidade academica na navegacao e diversos interesses relacionados a Universidade e ao fragmento florestal da qual ocupado.

Poucos os estudos que englobam os aspectos especificos do gerenciamento de informacoes do ambiente universitario, em especial as trilhas que integram os usos de uma area ambientalmente importante com a sua aplicacao no ambiente academico, as possibilidades de representacao e desenvolvimento de interface, visando melhorar a experiencia do usuario e a acessibilidade das informacoes. Assim, o Campus map vem buscando preencher tais lacunas, implementando uma base de dados geografica e estudando diversas aplicacoes das interfaces e possiveis usos e implicacoes de uso destes dados.

Para este trabalho, a relevancia diz respeito ao uso de tecnologias imersivas de realidade aumentada e interfaces cartograficas realistas a imagens a nivel de rua SVI (Street View Imagery) aplicadas a estudos florestais e ambientais. Um exemplo sao trilhas interpretativas no campus. Estas trilhas sao espacos de interacao e percepcao de um ambiente (LIMA, 1998) representando um valioso instrumento pedagogico e como ferramenta de conservacao. No ambito do ensino, especialmente nos cursos de agrarias e ciencias do ambiente, as visitas in loco a trilhas interpretativas, podem ser consideradas estrategias pedagogicas frequentemente utilizadas, uma vez que, segundo Pires Junior (2018) possibilitam aos docentes e discentes estarem imersos em um ambiente real, contendo elementos diversos, que permitem a utilizacao aguçada dos sentidos na percepcao e captacao de informacoes, gerando conhecimentos complexos relacionados a area e a ecologia da paisagem. Para este trabalho inclui-se o desenvolvimento de uma interface de elementos de realidade aumentada SVI e mapa interativo das trilhas no campus, de forma a apoiar acoes educacionais e turisticas relacionadas as trilhas em areas florestadas.

---

## OBJETIVOS

### Geral

Propor representacao imersiva e interativa de trilhas, areas florestadas e areas degradadas no Campus Map UFAM.

### Especificos

- Demonstrar acoes de coleta, atualizacao base de dados geografica e interface aplicada ao mapeamento de trilhas

- Testar o uso de SVI, Realidade Aumentada e mapas interativos aplicados a representacao das trilhas em areas florestadas;

- Propor estudos de caso onde estas tecnologias podem ser aplicaveis dentro de pesquisas academicas florestais no ambito da UFAM.

---

## METODOLOGIA

### Area de estudo

O estudo vem sendo realizado na Universidade Federal do Amazonas - UFAM, na cidade de Manaus - AM. O Campus abrange uma imensa mancha verde dentro do perimetro urbano de Manaus, sendo responsavel por conter variadas amostras de fauna e flora amazonicas. (BORGES e GUILHERME, 2000). O Campus Senador Arthur Virgilio Filho (figura 1) e o principal campus da Universidade Federal do Amazonas, e esta localizado proximo a Bola do Coroado, inicio da zona Leste, um dos maiores fragmentos florestais da area urbana da cidade de Manaus.

[Figura 1 - Delimitacao da area de estudo. Fonte: O Autor (2025).]

O Campus em si faz fronteira com seis bairros da cidade. O campus da UFAM e dividido entre Setor Norte e Setor Sul e possui aproximadamente 670 hectares de area total. Segundo a UFAM (2008) existiam aproximadamente 15000 membros da comunidade da UFAM participando de atividades academicas ou administrativas desenvolvidas exclusivamente no Campus. Em 2000, estimava-se que 15% do total da area do campus era antropizada - edificacoes e areas construidas ou modificadas em geral (AMANCIO et al. 2000).

Segundo o site institucional da Pro-reitoria de Ensino e Graduacao, no interior do Campus funcionam 78 cursos de graduacao, totalizando 3818 vagas de ingresso anuais e divididos em 15 unidades academicas (UFAM, 2019). Segundo CALDAS (2016) - citando dados informais da prefeitura do Campus, existem cerca de 20 nascentes e 12 fluxos de igarapes no interior do Campus da UFAM.

Assim, a area de estudo e uma area de grande importancia ecologica, porem que sofre internamente - como na expansao de areas destinadas a unidades academicas e ocupacao - e externamente, como no raio sul do fragmento, devido a especulacao imobiliaria, e a extracao de recursos naturais como o corte seletivo a partir de trilhas clandestinas (CALDAS, 2016). A area esta inserida em uma Area protegida, conhecida como APA MANAUS, sob gestao da Prefeitura Municipal de Manaus. E um tipo de Unidade de Conservacao que desempenha um papel fundamental na melhoria da qualidade ambiental do seu entorno, uma vez que os bairros adjacentes, originarios de ocupacoes desordenadas, nao previram areas para desempenhar esta funcao. Sobretudo, estas areas servem de abrigo para diversas especies da fauna e da flora locais (CALDAS, 2016).

O campus da UFAM apresenta uma altitude media de 64,99 metros, variando entre 37 e 93 metros, com relevo caracterizado por 14% da area composta por encostas e vertentes com inclinacao entre 30% e 50%, enquanto 53% da superficie possui declividade suave, entre 5% e 10%. O solo predominante e o Latossolo Amarelo distrifico, abrangendo 337 hectares, seguido pelo Argissolo Amarelo distrifico com 216,59 hectares e pelos Neossolos Quartzarenicos distroficos, que ocupam 32,94 hectares. O sistema hidrografico do fragmento compreende vinte nascentes e doze igarapes. Em relacao a vegetacao, 62% da area e coberta por Floresta Ombrófila Densa e campinarana, reunindo um total de 52 especies, distribuidas em 49 generos e 33 familias botanicas, sendo 25 especies tipicas de floresta primaria, 28 de floresta secundaria e 10 especificas da campinarana. Destacando uma expressiva diversidade do fragmento, reforçando sua relevancia ecologica e potencial para pesquisas cientificas (RUBIM; MENDONCA, 2022).

### Materiais e Metodos

Foi dada enfase na utilizacao de plataformas e softwares livres. Para o mapeamento das trilhas, foram realizadas caminhadas com GNSS de smartphone, com tecnologia de GNSS Assistido. Para a aquisicao das imagens ao nivel da rua nas trilhas do campus com aplicacao de elementos de realidade aumentada foi utilizado o software mapillary, onde e possivel se trabalhar em qualquer smartphone, os dados foram coletados com o aparelho no sentido horizontal com a altura no peito de uma pessoa, aproximadamente 1,3 metros do solo se fixando no centro da trilha. Ao iniciar o software, a camera e automaticamente ativada e em seguida o usuario desloca-se pelo percurso, dando inicio ao processo de mapeamento no local de estudo. A plataforma faz a automatizacao do mapeamento representando o seu trajeto e suas caracteristicas locais obtendo imagens SVI.

A plataforma para hospedagem da interface foi a Amazon Web Services - AWS onde sao oferecidos provedores online para websites e armazenamentos de banco de dados geograficos baseados em nuvem com seus atributos (Tabela 1), rodando em servidor ubuntu EC2 Aws, previamente discutidos de forma a complementar o banco de dados do campus map.

### Tabela 1 - Banco de dados e atributos propostos para trilhas

| Atributo               | Descricao                                          | Tipo de Dados |
| ---------------------- | -------------------------------------------------- | ------------- |
| id_trilha              | Identificador unico da trilha                      | SERIAL        |
| nome_trilha            | Nome da trilha                                     | VARCHAR       |
| comprimento_m          | Comprimento da trilha, em metros                   | DECIMAL       |
| dificuldade            | Grau de dificuldade (facil, moderada, dificil).    | VARCHAR       |
| tipo_trilha            | Tipo (interpretativa, pesquisa, lazer).            | VARCHAR       |
| vegetacao_predominante | Tipo de vegetacao ao longo da trilha.              | VARCHAR       |
| tempo_estimado_minutos | Tempo medio de percurso.                           | INT           |
| status_conservacao     | Estado de conservacao da trilha                    | VARCHAR       |
| pontos_de_interesse    | Lista de atrativos da trilha (nascentes, especies) | VARCHAR       |
| observacoes            | Campo livre para observacoes adicionais.           | VARCHAR       |

Para desenvolver uma interface cartografica interativa, foi escolhido para criar site responsivo a linguagem de programacao o desenvolvimento web: HTML5, CSS3 e JavaScript. Esses tres elementos compoem a estrutura principal do que e chamado de "front-end" de um site ou aplicacao web. Isso assegura que a interface funcione bem em diversos dispositivos, tamanhos de tela e sistemas operacionais.

A ideia inicial e dar a sensacao de imersao ao usuario na trilha, considerando-se a utilizacao dentro da aplicacao CampusMap, onde o mesmo pode navegar e obter informacoes acerca da trilha desejada, sendo o diferencial a visualizacao do trajeto em um mapa interativo acompanhado com as imagem ao nivel de rua com elementos de realidade aumentada como forma de obter informacoes e elementos de interesse do local.

Alem disso, foi criado um site estatico em formato de pagina da Web para informacoes relevantes sobre a trilha para os usuarios (Figura 3). Este tipo de site e criado a partir de codificacao HTML e CSS em um editor de texto simples. Apresentando uma pagina inicial e informativos da trilha para informacoes como a quilometragem da trilha e o grau de dificuldade de acesso, apontando tambem a existencia de aspectos encontrados na trilha. O Resumo de software e aplicabilidade de cada estao descritos na tabela 02.

### Tabela 02 - Materiais utilizados ao longo do desenvolvimento do estudo

| Aplicativo | Aplicabilidade                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| Amazon AWS | Plataforma de nuvem online usada como servidor de dados                                              |
| Mapillary  | Plataforma que permite a coleta e disponibilizacao de imagens ao nivel da rua (SVI)                  |
| Mapbox     | Plataforma de mapeamento e Geolocalizacao para disponibilizacao de interface cartografica interativa |
| Android 14 | Samsung Galaxy A34 para coleta de imagens ao nivel de rua e delimitacao da trilha com GNSS embarcado |

Por fim, foram discutidos os principais aspectos relacionados a potenciais utilizacoes da interface proposta, sob o ponto de vista especialmente da importancia de se caracterizar as florestas do campus da UFAM em Manaus - AM. Este trabalho buscou abarcar 3 potenciais usos da interface, considerando publico externo e interno, com especial foco nos usos da pesquisa e ensino de ciencias florestais no campus, alem da educacao ambiental, uma vez que a UFAM encontra-se inserida na APA Manaus. Foram detalhados os recursos necessarios para uso e formas pensadas acerca de como poderia se dar a utilizacao da interface e funcionalidades relacionadas, com discussao acerca da imersao no espaco da floresta do campus.

---

## RESULTADO

O projeto de desenvolvimento da plataforma interativa para mapeamento e divulgacao de trilhas universitarias alcancou resultados satisfatorios com a sua implantacao em um ambiente de producao estavel. Para tanto, foi estabelecido um dominio web, hospedado na infraestrutura em nuvem Amazon AWS. A aplicacao encontra-se disponivel no endereco eletronico: <https://main.dx3fibxbpcz62.amplifyapp.com/>.

Um dos intuitos nesse desenvolvimento e a criacao de um sistema para categorizar as diferentes trilhas disponiveis no campus. Esta funcionalidade permitira uma organizacao das informacoes, facilitando a escolha pela navegacao dos usuarios. Para isso foi introduzido um mecanismo de filtragem que permite aos usuarios selecionar e visualizar as trilhas da universidade.

Como resultado obtivemos uma interface registrando o percurso com uma imagem ao nivel de rua e um mapa com a delimitacao das trilhas georreferenciadas armazenadas em um banco de dados (Figura 4).

Para carregar a interface adicionamos uma opcao "Open Map" (Figura 2) que quando acionada, exibe as caracteristicas das trilhas e um formato de mapa interativo, proporcionando aos usuarios uma visualizacao espacial clara das rotas disponiveis (Figura 3). O presente projeto tem recomendacoes e ideias futuras de refinar o sistema de classificacao das trilhas e aprimoramento da interface do usuario para maior intuitividade.

[Figura 2 - Pagina inicial da interface. Fonte: O autor.]

[Figura 3 - Pagina proposta para a trilha selecionada. Fonte: O autor.]

A imersao espacial foi realizada, onde a visualizacao centraliza para o local de interesse e logo faz-se a divisao da tela, de um lado direito as imagens ao nivel de rua SVI da trilha selecionada, ja o outro um mapa interativo para o usuario selecionar e seguir o caminho da trilha ao ponto que gostaria.

O desenvolvimento da plataforma de trilhas interativas progrediu significativamente, focando na imersao espacial e na experiencia do usuario. Devido a ausencia de integracao das informacoes caracteristicas especificas de cada trilha, implementamos funcionalidades para a navegacao e visualizacao sera executada apos selecionar o comando "OpenMap" (Figura 4) atraves do comando, proporcionando uma experiencia imersiva aos usuarios. Sua visualizacao e automaticamente centralizada no local de interesse. A intencao se divide em duas secoes distintas, oferecendo uma experiencia de navegacao.

[Figura 4 - Interface de navegacao da trilha. Fonte: o autor.]

No lado esquerdo da tela, os usuarios podem explorar imagens ao nivel da rua da trilha selecionada. Essas imagens proporcionam uma perspectiva realista do ambiente, permitindo aos usuarios se habituarem com o terreno e as caracteristicas visuais da trilha antes mesmo de visita-la pessoalmente. Simultaneamente, o lado direito da tela exibe um mapa interativo. Esta ferramenta permite aos usuarios selecionar e seguir virtualmente o caminho da trilha, oferecendo a flexibilidade de explorar diferentes segmentos e pontos de interesse ao longo do percurso. Os usuarios podem navegar livremente pelo mapa, focando em areas especificas de seu interesse ou planejando rotas personalizadas.

Esta abordagem de visualizacao dividida estabeleceu uma conformidade entre a perspectiva imersiva das imagens ao nivel da rua e a visao geral fornecida pelo mapa interativo, gerando uma navegacao da trilha obtendo facilidade de acessos a informacoes do ambiente. A partir da ideia de realidade aumentada, aqui foram testadas ilustracoes de elementos de interesse sendo realcadas por quadros com tonalidades conforme abaixo:

-> Especies Florestais de interesse, com molduras em vermelho;

-> Parcelas Experimentais na floresta, com a cor Magenta;

-> Antropismo e elementos humanos destacados em tom de laranja e;

-> Identificacao e acesso a trilhas exibindo pela tonalidade verde.

O mecanismo de interacao propicia uma navegacao dinamica ao longo do percurso, permitindo que o usuario selecione diferentes pontos georreferenciados no mapa para alternar automaticamente entre as respectivas imagens SVI do ambiente. Essa funcionalidade favorece o registro visual, enriquecendo a analise espacial por meio da visualizacao imersiva do local selecionado. O sistema ainda possibilita ajustar levemente o angulo de visao, aplicar zoom para aproximacao e explorar diferentes perspectivas, garantindo uma navegacao fluida e orientada entre diversos locais de interesse.

[Figura 5 - Interface integrando mapa 2D e imagem ao nivel de rua no setor sul da UFAM. Fonte: O Autor.]

Dentro das dificuldades, uma questao notada durante o levantamento de imagens SVI e que uma parte consideravel de imagens borradas (Figura 6), estima-se esse problema ser decorrente do percurso acelerado por parte do produtor conteudo nao se tem o controle para a coleta de imagem pois o aplicativo registra de forma automatica, acredita-se a ma nitidez das imagens seja devido ao ritmo e desigualdade do solo onde pode acontecer com o produtor devido a essas movimentacoes brusca, recomendando o estabilizador de celular. Outro problema da utilizacao do mapillary e trabalhar com as limitacoes de diferentes cameras e pontos de vista, tornando as trilhas por vezes sem um padrao definido.

[Figura 6 - Exemplo de imagem desfocada. Fonte: O Autor.]

A implementacao estabelece uma base solida para futuras melhorias e trabalhos. Servindo de base para proximas pesquisas integrando dados especificos sobre as trilhas existentes no campus, incluindo informacoes sobre dificuldade, pontos de interesse, flora e fauna local, igarapes entre outros aspectos relevantes.

---

## Contextos de uso - Discussao

Trabalhar contextos de uso quando se projeta interfaces de navegacao interativa facilita a implementacao da interface, pois criam o mecanismo basico da interacao com os potenciais usuarios. Para esse trabalho parcial inicialmente, dois contextos de uso foram escolhidos:

### Estudo de caso 1: Norteamento e acessibilidade para estudantes e publico externo

A trilha atrai usuarios entusiastas que buscam uma experiencia de caminhada recreativa, oferecendo orientacoes e informacoes relevantes sobre o ambiente universitario, suas caracteristicas naturais e pontos de interesse ajudando a se locomover ao longo do percurso do campi. Para melhor entendimento das necessidades de coleta, foram numeradas as seguintes atividades de fluxo de uso:

**-Dados necessarios:**

a. Localizacao da trilha (Campo universitario);
b. Nome da trilha;

**-Usuario entra no site** https://main.dx3fibxbpcz62.amplifyapp.com/;

**-Clica na opcao de abrir o mapa - OpenMap;**

**-Por meio de um site o usuario pode atraves de um filtro do site listar trilhas existente no campus universitario e visualiza uma breve descricao das caracteristicas da trilha;**

**-Usuario escolhe a trilha das pioneiras e em seguida abre dados relevantes da trilha juntamente com um mapa dividido com imagens SVI (imagens ao nivel da rua) (Figura 7);**

**-Usuario consegue visualizar presenca e informacoes de outras trilhas (Figura 8).**

[Figura 7: Acesso inicial da trilha e seu trajeto. Fonte: O autor.]

[Figura 8: Deteccao de outras trilhas. Fonte: O autor.]

Alem disso, neste contexto, o Campus Map pode fornecer informacoes para planejamento de percursos para praticas esportivas utilizado para otimizar trajetos para promover atividades de lazer e bem-estar. Na Figura 9 tem-se a recente utilizacao de trilha no campus para atividade esportiva de corrida na floresta, promovida na IV Semana Florestal de 2024, que foi promovida com divulgacao utilizando imagens do campus map.

[Figura 9 - Discentes de Engenharia Florestal promovem atividade de lazer Run Forest na Semana Florestal. Fonte: Divulgacao da Semana Florestal - Universidade Federal do Amazonas.]

---

### Estudo de caso 2: Estudo de uma disciplina de Engenharia Florestal

Para calouros de Engenharia Florestal, a trilha serve como uma ferramenta de recepcao interativa para novos estudantes e tracamento de rota, permitindo que acessem seu local de estudo no campus e nao se percam enquanto aprendem sobre as interacoes do ecossistema local, prevenindo estresse e utilizacao ineficiente do tempo dedicando-se em apenas em discutir os elementos de interesse.

A plataforma pode proporcionar uma navegacao previa para os estudantes, auxiliando os mesmos a se locomoverem pelo campus e suas trilhas, reduzindo a frustracao ao procurar por locais especificos. Isso e especialmente util em campi grandes e complexos como a Ufam, considerando que existem varias possibilidades de espacos de ocupacao.

Alem disso, eles podem identificar os tipos de elementos que serao analisados em seus estudos e discutir elementos de interesse como meio fisico, biologico e socioambiental. A interface pode ser utilizada como ferramenta para planejamento do estudo para alunos da disciplina de dendologia, que precisam realizar navegacao in loco, onde realizam as caracterizacoes macromorfologicas gerais de especies florestais, dentro da parcela experimental do professor de dendologia, reconhecendo as serrapilheiras, arbustos, arvores e lianas, podendo classificar diferentes tipos de ecossistemas florestais presentes. A seguinte sequencia foi sinalizada como potencial fluxo de uso:

**- Dados necessarios:**

c. Localizacao da trilha;
d. Nome da trilha;
i. listagem de nomes de Parcela Permanente existentes;

**- Usuario entra no site**

**- Clica na opcao de abrir o mapa - OpenMap;**

**- Usuario pode atraves de um filtro do site listar trilhas existente no campus universitario e suas caracteristicas;**

**- Usuario escolhe a trilha e em seguida abre dados relevantes da trilha juntamente com um mapa dividido com imagens SVI (imagens ao nivel da rua);**

**- Usuario consegue visualizar informacoes sobre elementos existentes na trilha(Figura 9);**

**- O usuario encontra a parcela da trilha escolhida (Figura 10).**

[Figura 9: Elementos de Interesse. Fonte: O autor.]

[Figura 10: Exemplo de localizacao de parcelas experimentais da disciplina dendologia. Fonte: O autor.]

---

### Estudo de caso 3: Caracteristicas da floresta atraves de imagens SVI

Neste estudo de caso, considera-se a necessidade do entendimento da floresta da APA Manaus e sua importancia para sociobiodiversidade, regulacao climatica e educacao ambiental na cidade de Manaus. Os estudos nas trilhas da UFAM podem apoiar na identificacao de estudos sucessivos e caracteristicas da floresta, uma vez que a floresta na regiao de Manaus apresenta uma notavel heterogeneidade estrutural e floristica, diretamente influenciada pela topografia local e o fragmento da UFAM significa estudar esta. O padrao de diferenciacao e um dos mais estudados na ecologia amazonica, sendo caracterizado pela transicao entre os platos bem drenados e os baixios adjacentes aos cursos d'agua, onde o lencol freatico e superficial. Essa variacao ambiental atua como um filtro ecologico, selecionando especies com tolerancias especificas e resultando em comunidades vegetais distintas em curtas distancias geograficas.

A interface proposta permite a localizacao de parcelas de estudo e monitoramento da floresta (Figura 11), apoiando estudos e trabalhos de campo nas observacoes e facilitando o registro temporal das areas monitoradas. Permite tambem a identificacao remota de eventuais alteracoes do ambiente, localizacao de especies, degradacoes, acumulo de residuos, reduzindo a necessidade de deslocamentos frequentes para observacao presencial e aumentando a eficiencia do monitoramento.

[Figura 11: parcelas de monitoramento de estudos florestais na UFAM. Fonte: O autor.]

Na area do fragmento, o mapeamento das trilhas nos permitiu localizar fisionomias da area. Os platos, ou terra-firme alta, constituem as porcoes mais elevadas e planas do interfluvio. Nesses ambientes, os solos sao predominantemente profundos, acidos e com baixa fertilidade natural, devido aos intensos processos de lixiviacao (Luizao et al., 2004). A drenagem e eficiente, e o lencol freatico localiza-se a profundidades superiores a dez metros, tornando-o inacessivel para a maior parte da vegetacao. Estas condicoes favoreceram o desenvolvimento de uma floresta estruturalmente complexa, com dossei fechado entre 30 e 35 metros de altura e emergentes que ultrapassam 50 metros (Ribeiro et al., 1999). Fitossociologicamente, abrigando a maior riqueza de especies da regiao, sendo dominados por arvores de madeira densa e de grande porte(Ferreira & Prance, 1998) conforme e possivel notar em uma das trilhas (figura 12).

[Figura 12: Caracteristicas do tipo plato. Fonte: O autor.]

Na Universidade tambem existem trilhas em vertentes (Figura 13), que representam a zona de transicao entre os platos e os baixios. Sao caracterizadas por declives variados que condicionam a dinamica hidrica, com maior escoamento superficial e transporte de sedimentos e nutrientes em direcao as areas mais baixas. A profundidade do lencol freatico aumenta progressivamente da base para o topo da encosta. A estrutura florestal e geralmente de porte intermediario, e a composicao floristica e singular, frequentemente incluindo tanto especies tipicas de plato (na porcao superior) quanto especies tolerantes a umidade (na porcao inferior) (Costa et al., 2005). Esta zona e crucial para a manutencao da variacao na composicao de especies entre habitats na paisagem.

[Figura 13: Caracteristicas do tipo vertente. Fonte: O autor.]

A UFAM tambem possui trilhas que se localizam nas areas de baixios (Figura 14). Os baixios correspondem as areas planas e deprimidas adjacentes aos cursos d'agua. Sao ambientes onde o lencol freatico e superficial ou ate aflorante durante o periodo chuvoso, resultando em solos permanentemente saturados e com deficiencia de oxigenio (Schietti et al., 2014). Estas condicoes impoe um forte filtro ambiental, selecionando especies com adaptacoes morfologicas e fisiologicas para tolerar a hipoxia radicular, como raizes aereas ou respiratorias. Consequentemente, a floresta apresenta dossei mais baixo (20-25m), menor riqueza de especies e clara dominancia ecologica de grupos adaptados, notadamente palmeiras e arvores como a seringueira e especies de Swartzia (Ribeiro et al., 1999). Apesar da menor diversidade, estes ambientes sao funcionalmente importantes para a ciclagem de nutrientes e recursos hidricos.

[Figura 14: Caracteristicas do tipo baixio. Fonte: O autor.]

Assim, a interface proposta pode ser utilizada na diferenciacao destas fisionomias, trabalhando estudos florestais mais especificos, bem como na visualizacao de arvores, lianas, solo, clareiras e outras caracteristicas ecologicas, como a formacao de clareiras, efeitos de borda no fragmento, erosao acoes humanas, como dejetos, lixo e invasoes. A coleta de imagens para este trabalho deve ser continua, e a interface deve prever a atualizacao destes dados, para que se possa manter uma continuidade no processo dentro da APA. Como recomendacoes, podemos inclusive apoiar a insercao destes mecanismos como obrigatorios para o plano de manejo da APA Manaus, para o bem da biodiversidade da area do campus.

---

## CONSIDERACOES FINAIS

A implementacao deste projeto focou na criacao de uma interface digital para o armazenamento e visualizacao de dados geograficos relacionados as trilhas do campus universitario. Com base nos resultados obtidos, conclui-se que a interface desenvolvida representa uma ferramenta promissora, servindo como base para futuras expansoes e aplicacoes academicas, inserindo novos dados. A plataforma mostrou capacidade de auxiliar estudantes e visitantes externos na localizacao e identificacao de seu interesse, fornecendo informacoes relevantes sobre as trilhas no campus da Universidade Federal do Amazonas, proporcionando informacoes uteis, ferramentas de monitoramento e ate curiosidades sobre o ambiente natural no campus universitario, constituindo uma base solida para estudos, uso diario na localizacao de rotas, alem de muitas possibilidades de futuras expansoes e aplicacoes academicas.

---

## REFERENCIAS

AMANCIO, A. B.; TELLO, J. R.; S., SARAIVA, E. C. Composicao floristica e estrutura da floresta densa aluvial (BaiPio) da area verde do Campus da Universidade do Amazonas. II Jornada de Iniciacao Cientifica da Universidade do Amazonas, 2000.

BORGES S. H. & GUILHERME, E. 2000. Comunidade de aves em um fragmento Florestal urbano em Manaus, Amazonas, Brasil. Ararajuba: Revista Brasileira de Ornitologia. Belo Horizonte, n.8, v.1, 2000, p. 17-23.

CALDAS, SILVIO RODRIGUES. IMPACTOS AMBIENTAIS SOBRE A FLORESTA DA UFAM. Dissertacao de Mestrado. PROGRAMA DE POS-GRADUACAO EM GEOGRAFIA - UFAM. 2016. 175p.

CORREA, Igor Cardoso. A modelagem de banco de dados geografico como suporte a organizacao de informacoes florestais e ambientais na Regiao Sul do Amazonas. Dissertacao de Mestrado. Programa de pos-graduacao em Ciencias Florestais e Ambientais - UFAM. Manaus, AM. 2021.

CRUZ, J.Caracterizacao morfologica, fenologica e produtividade de Oenocarpus bacaba Martius (Palmae) em floresta de terra firme e pastagens na Amazonia Central.Tese de Doutorado, Instituto Nacional de Pesquisas da Amazonia/Universidade Federal do Amazonas, Manaus, Amazonas. 149p. 2001.

CUNHA, Maria Alexandra et al. Smart cities: transformacao digital da cidades. 2016.

LEITAO, F. Campus Map Ufam: Modelagem, mapeamento e monitoramento do campus da UFAM. Manaus, AM. Relatorio final - Iniciacao cientifica. UFAM. 2021.

LIMA, D. Desenvolvimento de aplicativo para dispositivos moveis com foco em Campus Map. Trabalho de graduacao (Engenharia Cartografica e de Agrimensura)-Setor Ciencias da Terra. Universidade Federal do Parana, Curitiba, 2017.

LIMA, S. T. Trilhas interpretativas: a aventura de conhecer a paisagem. Cadernos Paisagem, v. 3, p. 3944, 1998.

PIRES JUNIOR, RAIMUNDO ERNANE. " e-Trilha":Sistema Computacional Colaborativo na Visualizacao de Trilhas Interpretativas. Dissertacao de Mestrado. Programa de Mestrado Profissional em Rede Nacional para Ensino das Ciencias Ambientais (PROFICIAMB) - CCA - UFAM. Itabaiana, AM. 2018. 6039.

SANTOS, Ivaneide de Oliveira. Novas metodologias para representacao geoespacial e valorizacao dos elementos da geodiversidade: integracao de geotecnologias, recursos online e educacao ambiental. Tese de Doutorado. 2017. YIN, Yinchao et al. A literature survey on smart cities. Science China. Information Sciences, v. 58, n. 10, p. 1-18, 2015.

UNIVERSIDADE FEDERAL DO AMAZONAS. Curso de engenharia florestal com tema conservacao, sustentabilidade e mudancas climaticas. Disponivel em: https://ufam.edu.br/noticias-destaque/6303-curso-de-engenharia-florestal-realiza-abertura-com-o-tema-conservacao-sustentabilidade-e-mudancas-climaticas.html. Acesso em: 09 de 2025.

RUBIM,Maria A.L.MENDONCA,Maria S.Fragmento Florestal do Campus da UFAM. Olhares diversos para o meio Manaus: FUA. 2022.

COSTA, F. R. C. et al. Mosscale distribution patterns of Amazonian understorey herbs in relation to topography, soil and watersheds. Journal of Ecology, v. 93, n. 5, p. 863-878, 2005.

FERREIRA, L. V.; PRANCE, G. T. Species richness and floristic composition in four hectares in the Jau National Park in upland forests in Central Amazonia. Biodiversity & Conservation, v. 7, n. 10, p. 1349-1364, 1998.

LUIZAO, R. C. C. et al. Variation in carbon and nitrogen cycling processes along a topographic gradient in a central Amazonian forest. Global Change Biology, v. 10, n. 5, p. 592-600, 2004.

RIBEIRO, J. E. L. da S. et al. Flora da Reserva Ducke: guia de identificacao das plantas vasculares de uma floresta de terra-firme na Amazonia Central. Manaus: INPA-DFID, 1999.

SCHIETTI, J. et al. Vertical distance from drainage drives floristic composition changes in an Amazonian rainforest. Plant Ecology & Diversity, v. 7, n. 1-2, p. 241-253, 2014.
