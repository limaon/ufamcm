# RELATÓRIO FINAL

## EDIÇÃO: PIBIC/PAIC 2022/2023

### RECURSOS HUMANOS

**Nome do(a) orientador(a):**
Andre Luiz Alencar de Mendonça

**Nome do(a) aluno(a):** Karen Sayuri Takano

**Bolsa:**

- ( ) CNPQ
- ( ) UFAM
- ( ) FAPEAM
- (X) VOLUNTÁRIO

---

## IDENTIFICAÇÃO DO PROJETO

**Título:** Realidade Aumentada aplicada às atividades florestais: Estudo de caso do Campus Map UFAM

**Código do Projeto:** PIBA/0205/2022

**Área de Conhecimento:**

- (X) Exatas da Terra
- ( ) Agrárias
- ( ) Biológicas
- ( ) Sociais Aplicadas
- ( ) Engenharias
- ( ) Saúde
- ( ) Ciências Humanas
- ( ) Linguísticas, Letras e Artes
- ( ) Multidisciplinar

---

## COMITÊ DE ÉTICA EM PESQUISA COM HUMANOS (CEP) OU ANIMAIS (CEUA)

- ( ) Aprovado - Número do protocolo: _______
- ( ) Não se aplica
- ( ) Caso o projeto ainda não esteja aprovado, justifique: O comitê pediu pra que se refizesse pequena alteração no cronograma físico financeiro. A submissão foi em 05/23 (ver anexo), retorno em 07/23 ainda não reanalizado

---

**Notas Importantes:**

- _O Relatório deve ser apresentado abaixo deste formulário em no máximo 20 páginas_
- _O Relatório deverá estar de acordo com as normas atualizadas da ABNT para trabalhos acadêmicos._

---

# Karen Sayuri Takano

---

# REALIDADE AUMENTADA APLICADA ÀS ATIVIDADES FLORESTAIS: ESTUDO DE CASO DO CAMPUS MAP UFAM

PIB-A/0205/2022

---

**Orientador:** André Luiz Alencar de Mendonça

---

## MANAUS

### 2022/2023

---

## 1. RESUMO

O _Campus map_ pretende ser a centralização de dados georreferenciados da Universidade Federal do Amazonas e seus _campi_, contemplando qualquer tipo de dado que tenha relação com o espaço. Dado o volume de dados e a grande quantidade de possibilidades de usos, usuários e contextos de uso, a realidade aumentada surge como alternativa para apoio à visualização de dados deste banco de dados georreferenciado, que envolve desde mapas bidimensionais de áreas construídas até o uso de visualizações ao nível da rua para investigação de espécies florestais espalhadas pelo _campus_. Dado que as atividades ambientais e florestais não se resumem ao campus Manaus, esse trabalho está buscando expandir a implantação de um banco de dados também para a FAEXP - fazenda experimental da UFAM, propondo um modelo de dados e relacionamentos que contemple toda a atividade experimental e de extensão executada nos dois campi, para fins de cadastro e visualização de informações comuns e relevantes para os mais diversos usos. Com a utilização de ferramentas gráficas, Sistemas gerenciadores de Banco de dados e princípios de projeto cartográfico e _design_ de interfaces aplicados ao projeto _mobile_, este trabalho procurou apresentar pesquisa de foco em usos e usuários de dados geográficos e interfaces imersivas, bem como a aplicação destes em uma interface que inclui elementos de realidade aumentada para funcionamento em dispositivos _mobile_. Para tal, foram selecionados usuários para verificação da aceitação e necessidade de dados mais imersivos, como dados ao nível de rua - imagens SVI. Os resultados permitiram propor uma interface que foi considerada adequada para o registro de pontos de referência mentais, bem como para os diversos usos voltados para visualização de dados existentes nos campi da Universidade, inclusive para fazenda Experimental.

**Palavras-chave:** _Campus map_, interfaces SVI, testes com usuários

---

## 2. INTRODUÇÃO

O _Campus Map_ é um projeto desenvolvido inicialmente pela Universidade Federal do Paraná (UFPR) (LIMA, 2017) e tem o objetivo de realizar o mapeamento _indoor_ e _outdoor_ de áreas de _campi_ universitários. Sua implementação, para mapeamento do campus universitário UFAM, vem sendo trabalhada nos últimos anos, inicialmente com atividades básicas de levantamento de requisitos e de etapas para o aerofotogrametria (Leão, 2021) e atualmente busca pensar em representações e projeto cartográfico aplicado, formas de mapeamento colaborativo, e no desenvolvimento de ferramentas que possam auxiliar a comunidade acadêmica, com atenção especial no caso do _Campus Map_ UFAM a questões da área florestal. Diversos estudos têm tido como foco a modelagem de dados aplicada, especialmente no desenvolvimento de bases georreferenciadas para o suporte de aplicações. No setor florestal, temos aplicações voltadas para a área de inventários florestais (Ferreira, 2009), manejo e monitoramento (Reis, 2017), assim como estudos para o desenvolvimento de atividades de _Smart cities_ (Yin et al., 2015; Cunha et al., 2006), que são de especial interesse no desenvolvimento deste trabalho. Porém, são poucos os estudos que abordem os aspectos específicos de gerenciamento de informações do ambiente universitário, em especial que integrem os usos de uma área ambientalmente importante com a sua aplicação no ambiente acadêmico, desde o levantamento de requisitos até o projeto cartográfico e as possibilidades de representação e desenvolvimento de interface. À medida que os computadores aumentam de potência e diminuem sua estrutura, novos aplicativos de computação móvel, vestíveis e pervasivos estão se tornando rapidamente viáveis. A realidade aumentada é definida como uma tecnologia que sobrepõe uma imagem gerada por computador à visão de um usuário do mundo real, fornecendo assim uma visão composta (Mcmillan, 2017). Os sistemas de realidade aumentada integram informações no ambiente físico de uma pessoa para que ela perceba essa informação como residente em seu entorno. Esses sistemas móveis fornecem o serviço sem restringir o paradeiro do indivíduo a uma área especialmente equipada. Idealmente, eles funcionam virtualmente em qualquer lugar, adicionando uma camada palpável de informações a qualquer ambiente sempre que desejado. O material apresentado por computador é integrado diretamente ao mundo real ao redor da pessoa em _roaming livre_, que pode interagir com ele para exibir informações relacionadas, resolver consultas e colaborar com o sistema (Höllerer, 2004). Fundamentando-se na diminuição dos _hardwares_ e o aumento no processamento dos dados, o uso da realidade aumentada tem sido abordado em diversos setores. Dentro dos exemplos de aplicações, encontra-se: a visualização de estruturas corporais internas para suporte a operações cirúrgicas (Tamura et al., 2016); a apresentação de objetos virtuais para tratamento de fobias (Botella et al., 2016); a navegação marítima utilizando sistemas imersivos (Grabowski, 2015); a inspeção microscópica com imagens em lapso de tempo (Baek et al., 2014); a educação ambiental (Krause, 2019); e a utilização visando a conservação de áreas com a apresentação de camadas de informações sobrepostas a imagens de câmeras, muitas vezes utilizada em patrimônios histórico-arquitetônicos tencioando ao conhecimento das edificações (Pierdicea et al., 2016). A conservação da biodiversidade representa um dos maiores desafios deste século, em função do elevado nível de perturbações antrópicas dos ecossistemas naturais (Viana, 1998). O desmatamento florestal tem danos severos relacionados à biodiversidade (Myers, 1992), considerando que as florestas são consideradas com devida importância ambiental principalmente pelo fato de protegerem os recursos hídricos, interceptando a precipitação, reduzindo o risco de erosão e aumentando a capacidade de infiltração da água no solo (Zarnott, 2012), além de diversos outros sistemas relacionados à floresta que influenciam nos recursos fornecidos à sociedade. Nessa conjuntura, torna claro a importância de aplicar estudos relacionados à conservação de áreas florestadas, a preservação de memórias para concretizar e clarificar sua relevância, e da mesma forma, avaliar o histórico de experimentos científicos e atividades de extensão relacionadas à universidade, uma vez que essas são alternativas que visam corroborar na compreensão da dinâmica e conservação florestal. O _Campus Map_ UFAM prevê um banco de dados de informações e georreferenciadas e mapeadas, bem como uma interface multiuso. A UFAM dispõe em seus _Campus_ (considerando o atual estudo somente aplicado ao Campus Manaus - Sen. Arthur Virgílio Filho - e a Fazenda Experimental - FAEXP) diversas atividades que incluem o cenário florestal como foco: experimentos científicos, atividades de extensão, inventários e entre outros. Todavia, a integração destes dados e adequação ao formato de um banco de dados são desafios, em razão de que nunca foram executadas em âmbito institucional. Acredita-se que esta integração e formalização sejam imprescindíveis para o desenvolvimento de uma interface de apoio, amparada à tecnologia de realidade aumentada para funcionamento em dispositivos _mobile_, considerando o georreferenciamento de feições aplicadas às áreas e áreas experimentais – e sua respectiva modelagem formal como chave para o sucesso de uma aplicação que permita aos usuários conhecer as características, a situação atual e o histórico destas feições. Assim, partindo-se da hipótese e colocando-a em prática, realizou-se a construção de interface aplicada à visualização em imagem de áreas de estudo na FAEXP e no Campus Sen. Arthur Virgílio Filho, além do desenvolvimento de atividades em diversos contextos dentro do _Campus Map_, especificamente na utilização de um banco de dados formalmente modelado e interface integrados, foi elaborada uma interface que considera dados espaciais na visualização, tanto em mapas quanto na navegação _in loco_. Esta interface pode ser testada com usuários de forma que possa se investigar se a mesma é aplicável a atividades da Universidade e se possuí ganhos do ponto de vista da usabilidade e da lembrança de pontos de referência em campo.

---

## 3. OBJETIVO

### 3.1 Geral

Propor e testar uma interface em realidade aumentada e respectiva simbologia para visualização de dados do Campus Map UFAM.8nn8n8n

### 3.2 Específicos

1. Coletar e verificar a aplicabilidade de dados para alimentar o banco de dados de feições para o _Campus map_ UFAM;
2. Propor integração destes dados em interface _mobile_ com elementos de realidade aumentada e SVI
3. Avaliar junto a usuários a aceitabilidade e a lembrança de pontos visitados com o uso da interface SVI

---

## 4. METODOLOGIA

### 4.1 ÁREA DE ESTUDO

O mini _campus_ da Universidade Federal do Amazonas - UFAM (3° 05' 59"S, 59° 58' 30"W) fica localizado na Avenida Rodrigo Otávio, bairro Coroado, zona leste da cidade de Manaus, e é o principal campus da Universidade Federal do Amazonas que em si faz fronteira com seis bairros da cidade. A área abrange uma grande mancha verde dentro do perímetro urbano de Manaus, sendo responsável por conter variadas fauna e flora amazônicas. (Borges e Guilherme, 2000). Atualmente a área do _campus_ está inscrita em uma Área protegida, conhecida como Área de Proteção Ambiental Floresta Manaus (Figura 1) sob gestão da Prefeitura Municipal de Manaus. O campus da UFAM é dividido entre Setor Norte (campus) e Setor Sul (mini campus) e possui aproximadamente 670 hectares de área total. Segundo a UFAM (2008), existiam aproximadamente 15000 membros da comunidade da UFAM participando de atividades acadêmicas ou administrativas desenvolvidas exclusivamente no Campus. Em 2000, estimava-se que 15% do total da área do campus era antropizada – edificações e áreas construídas ou modificadas em geral (Amâncio _et al_. 2000). Segundo o site institucional da Pró-reitoria de Ensino e Graduação, no interior do Campus funcionam 78 cursos de graduação, totalizando 3818 vagas de ingresso anuais e divididos em 15 unidades acadêmicas (UFAM, 2019). Segundo Caldas (2016) – citando dados informais da prefeitura do Campus, existem cerca de 20 nascentes e 12 fluxos de igarapés no interior do Campus da UFAM. É uma área de grande importância ecológica, porém que sofre intensamente – como na expansão de áreas destinadas a unidades acadêmicas e ocupação – e externamente, como na região sul do fragmento, devido à especulação imobiliária, e à extração de recursos naturais como o corte seletivo a partir de trilhas clandestinas (Câmara, 2014). Se considerarmos a APA da UFAM como um todo, é um tipo de Unidade de Conservação que desempenha um papel fundamental na melhoria da qualidade ambiental do seu entorno, uma vez que os bairros adjacentes, originários de ocupações desordenadas, não previram áreas para desempenhar sua função. Sobretudo, essa área serve de abrigo para diversas espécies da fauna e da flora locais (Caldas, 2016).

A Fazenda Experimental da Universidade Federal do Amazonas - FAEXP (02° 37' 17,1" e 02° 39' 41,4"S, 60° 03' 29,1" e 60° 07' 57,5"W) está localizada no km 38 da rodovia BR-174 (Figura 2) e faz limite ao sul com o Instituto Brasileiro do Meio Ambiente e dos Recursos Naturais Renováveis - IBAMA e ao norte com duas estações experimentais pertencentes ao Instituto Nacional de Pesquisas da Amazônia - INPA (Cruz,2001). Nesta área, existem diversos experimentos dos cursos da Faculdade de Ciências Agrárias da UFAM e há áreas de floresta primária e secundária, com diferentes fitofisionomias. Tanto o Mini Campus quanto a FAEXP são as sedes destinadas para o experimento deste trabalho, onde implementou-se o banco de dados geográfico em servidor, para criação de interface teste com aplicação de elementos de realidade aumentada e sua respectiva simbologia para visualização de dados florestais, dentro dos estudos do _Campus Map_ (**Figura 2**).

#### Figura 1. Localização do campus Sen. Arthur Virgílio Filho, com base em imagens de satélite Google Maps.

_Fonte: A autora (2023)_

#### Figura 2. Localização da Fazenda Experimental - FAEXP UFAM, em base de imagens de satélite Bing Aerial.

_Fonte: A autora (2023)_

---

### 4.2 COLETA

O projeto conduziu atividades de coleta em campo nas duas áreas de estudo, visando adquirir registros georreferenciados abrangendo ortofotomosaicos e modelos de elevação. Além disso, a obtenção de imagens de aerofotogrametria e dados provenientes de registros fotográficos foi realizada para compor a base de dados. A base de dados geográficos do campus map é dinâmica e tem sido coletada ao longo dos últimos anos. Porém neste trabalho foi possível delimitar áreas de interesse florestal em parcelas experimentais utilizadas por professores do Departamento de Ciências Florestais da FCA/UFAM e do ICB. O modelo proposto de dados para áreas experimentais incluiu elementos pontuais (árvores) e polígonos de interesse e foi inserido diretamente no banco de dados do projeto, armazenado em servidor externo do tipo postgis/postgreSQL. Mais detalhes sobre o modelo podem ser obtidos em Mendonça _et al_ (2022).

Para os dados de realidade aumentada, foi proposta a base de imagens ao nível da rua _Mapillary_ para coleta de dados das imagens e coordenadas geográficas associadas a elas (_geotagging_). Os dados dos campi da UFAM tem características _indoor_ e _outdoor_ e como a coleta automatizada do aplicativo não gerou resultados confiáveis para visualização de todos os elementos do campus (especialmente em áreas de mata e prédios) foram realizadas outras duas etapas para alimentação da base de dados SVI em uma ordem sequencial, com cada teste condicionado ao resultado do teste anterior. Os resultados dos testes foram avaliados quanto à possibilidade de se visualizar rotas sem quebras, com detalhamento de 180 graus de visada, usando as setas de navegação disponibilizadas pelo app. Os testes foram:

a) 1º teste: Uso somente do aplicativo _Mapillary_ onde o próprio aplicativo coleta as imagens e faz o _geotagging_.

b) 2º teste: Uso do _Mapillary_, com o auxílio da correção de coordenadas com o aplicativo _Geosetter_ e retirada de coordenadas da base Openstreetmap com o _QGIS_.

c) 3º teste: Uso do _Mapillary_ com o _Mapillary JS_, Javascript bruto, filtrando sequências e datas para visualização.

A estrutura da interface foi desenvolvida, tomando como base o trabalho de Leitão (2022 - no prelo), o qual delineou o _design_ preliminar da interface destinada a dispositivos móveis. A partir do estágio preliminar da interface básica, foram adicionados os componentes do conjunto de dados que apresentam a etapa prévia para serem transformados em dados aumentados. Para dar início ao processo de desenvolvimento da interface, foi conduzida uma avaliação prévia da simbologia e funcionalidades em colaboração com usuários piloto. Este tipo de avaliação tem por objetivo validar tanto a adequação da simbologia adotada quanto a viabilidade efetiva de uso da interface.

---

### 4.3 TESTE DE INTERFACE

A avaliação da interface com os elementos SVI visa analisar se seu uso pode oferecer algum ganho em relação a uma interface de mapa bidimensional tradicional e se a mesma tem aceitabilidade dos usuários. A metodologia empregada para a realização do teste envolveu a participação de 12 usuários, os quais avaliaram dois tipos de interfaces distintas (**Quadro 1 e Figura 3**). A primeira interface foi baseada no SVI, construída com base nos dados obtidos da aplicação _Mapillary_ (Ma _et al_, 2019) e enriquecida por meio de uma abordagem metodológica própria. A segunda interface foi o "Mapa 2D" (OSM), que variava entre dispositivos de _hardware_ _desktop_ e dispositivos _mobile_. A tabela abaixo ilustra a configuração empregada na avaliação realizada por cada usuário, sendo Interface _desktop_ (a) e _mobile_ (b), somente mapa 2d (x) e com mapa + _Mapillary_ (dividido) (y).

| Usuário | Interface |
| ------- | --------- |
| 1       | By        |
| 2       | Bx        |
| 3       | Bx        |
| 4       | Ax        |
| 5       | Ay        |
| 6       | Ay        |

**Quadro 1.** Teste com usuários para avaliação de interface.
_Fonte: A autora (2023)_

#### Figura 3. Usuários. A, teste com ax. B, teste com ay. C, teste com by. D, teste com bx.

_Fonte: A autora (2023)_

O teste de uso (_task_ orientado) obedeceu a métodos de acompanhamento cronometrados por 30 minutos com o protocolo _think-aloud_ seguido de um questionário. De modo geral, avaliou-se a eficácia da execução da tarefa (busca por feição, rota e estimativa de tempo de viagem), _Think aloud_ (estratégia, pontos de referência, interação, desorientação e narração da rota), carga de trabalho, questionários (caracterização do usuário, percepção de desempenho e pontos de referência) e sua correspondência com a realidade ou _spatial awareness_ (Mccullough e Collins, 2019).

---

### 4.4 PROJETO DE INTERFACE

O design da interface foi realizada a partir do aplicativo _mobile_ para integração de dados, porém sem o compromisso de funcionamento real, já que há ainda a dependência de investimento em desenvolvimento para tal, sendo uma etapa inicial para este desenvolvimento. Este estágio deve necessariamente contemplar o mapa base, com Projeto cartográfico desenvolvido considerando a solução em Realidade Aumentada para _mobile_.

O desenho da interface foi realizado a partir do _Figma_ para integração a aplicação do servidor do _Mapillary_ e o _MapillaryJS_ com a implementação direta do JavaScript bruto.

---

### 4.5 BANCO DE DADOS

O banco de dados pretende ser alimentado a partir de trabalhos futuros pela revisão bibliográfica de publicações que tenham realizado estudos de aspectos de fauna e flora dentro do _campus_, apoiados por artigos e textos físicos obtidos junto à Biblioteca Central da UFAM. Juntamente com consulta de professores dos departamentos supracitados e administração da FAEXP, como forma de reconstituição de atividades e obtenção de dados.

A discussão sobre classes e relacionamentos foi realizada a partir dos requisitos feitos em Leitão (2021) e em Mendonça _et al_. (2022) com o apoio de professores do Departamento de Ciências Florestais - DCF, demais departamentos da Faculdade de Ciências Agrárias - especialmente por conta dos experimentos da FAEXP - e das ciências biológicas.

---

## 5. RESULTADOS

O objetivo por trás do desenvolvimento da interface tanto para espaços _indoors_ quanto _outdoor_ é melhorar a eficiência temporal, oferecendo acesso e mobilidade a estudantes e funcionários no campus, dada a ampla distribuição de salas e laboratórios. Através da criação de mapas detalhados, é possível planejar antecipadamente rotas, especialmente para indivíduos com necessidades especiais, assim como para fins fisioterápeuticos na Universidade Federal do Amazonas (UFAM). Isso envolve avaliar a localização das entradas, identificação de pontos de acesso, estacionamentos, campos de percurso e salas específicas de interesse.

Da mesma forma, no âmbito dos funcionários da instituição, essa abordagem permitiria a identificação de salas que necessitam de manutenção por meio de mapeamento detalhado, além de determinar quais salas estão atualmente em uso. Dado o valor da preservação da biodiversidade, também é crucial implementar métodos de monitoramento em áreas florestais, começando com os fragmentos florestais relacionados ao campus universitário e, posteriormente, expandindo para outras regiões.

O contexto das áreas florestais, que está vinculado a projetos de extensão, experimentos científicos e identificação de parcelas, tanto no Campus UFAM quanto na Fazenda Experimental, destaca a necessidade de compreender a condição presente e o histórico dessas características específicas. Isso é alcançado por exemplo, por meio da identificação de parcelas, estabelecimento de trilhas direcionadas e realização de inventário florestal (**Figura 6 e 7**).

Todas as imagens SVI para construir a base de dados foram desenvolvidas e coletadas, abrangendo tanto a Fazenda Experimental como o Campus da UFAM. O banco de dados foi carregado na plataforma do Mapillary (**Figura 4 5**)

#### Figura 4. Imagens SVI da FAEXP no banco de dados.

_Fonte: A autora (2023)_

#### Figura 5. Imagens SVI do Campus UFAM no banco de dados.

_Fonte: A autora (2023)_

#### Figura 6. Parcela florestal com finalidade de pesquisas científicas no Campus UFAM.

_Fonte: A autora (2023)_

#### Figura 7. Estudos com imagens de RPA (aerofotogrametria) na Fazenda Experimental

Foram também incorporados dados de experimentos e estudos na FAEXP.
_Fonte: A autora (2023)_

---

### 5.1 DADOS SVI

Os resultados para avaliação da metodologia exata para a interface estão abaixo:

a) **1º teste:** Nesta etapa do processo, realizou-se uma análise da orientação das fotografias, concluindo que as áreas de referência seriam mais eficazmente identificadas quando as imagens estivessem na orientação horizontal. Contudo, durante essa fase, deparou-se com um impasse, especialmente em ambientes internos, onde as coordenadas geográficas podem se tornar imprecisas devido à falta de sinais de satélite. Existem diversos fatores que afetam negativamente a precisão do GPS em espaços fechados. Um desses fatores é a necessidade de, no mínimo, três satélites para obter uma localização 2D (latitude e longitude). Além disso, a forma que os sinais são transmitidos por esses satélites que não resistem às grandes caixas de concreto, o que também contribui para a limitação do desempenho do GPS em ambientes _indoors_. Idealmente, o procedimento envolveria a captura de uma sequência de três imagens, totalizando um ângulo de 180°, porém foram encontrados problemas relacionados à compatibilidade desse processo com a aplicação _Mapillary_.

b) **2º teste:** No contexto deste experimento, procedeu-se à aquisição de imagens por meio de uma série de três capturas consecutivas, abrangendo um ângulo de 180 graus. Essas imagens foram posteriormente submetidas a ajustes de ângulo utilizando a ferramenta _Geosetter_, enquanto as coordenadas geográficas associadas a cada imagem foram refinadas utilizando o software _QGIS_. Embora tenha sido possível obter com sucesso as informações de localização geográfica para a maioria das rotas avaliadas, algumas delas não foram reconhecidas de maneira adequada. Constatou-se o desempenho do aplicativo _Mapillary_ é mais consistente quando as imagens são capturadas diretamente por meio da própria aplicação, sugerindo a preferência pelo uso interno do aplicativo para a captura de imagens em futuras etapas do estudo.

c) **3º teste:** No terceiro teste, que foi considerado o teste efetivo, empregou-se exclusivamente a plataforma _Mapillary_ em conjunto com a ferramenta _MapillaryJS_, a qual se baseia na linguagem de programação JavaScript. Os resultados obtidos compreenderam a criação de uma interface de usuário com funcionalidades de filtragem de dados específicos, com critérios como data de aquisição, alcançados por meio da programação. Adicionalmente, observou-se o uso eficaz da referida interface e a conclusão da implementação da mesma para fins de teste. Além disso, com o uso da biblioteca mapillary JS foi possível incorporar dados de bases livres como o mapbox, que proporciona mapas 2D em perspectiva, optando-se, para as versões oficiais do Campus Map, a utilização deste modelo (**Figura 8 e 9**).

#### Figura 8. Interface 2D+SVI.

_Fonte: A autora (2023)_

#### Figura 9. Interface Desktop para teste.

_Fonte: A autora (2023)_

---

### 5.2 TESTE DE INTERFACE

A avaliação inicial do potencial da interface SVI foi conduzida para avaliar a eficácia e a aceitabilidade no contexto do Campus Map UFAM. O teste proposto consistiu em propor ao usuário uma rota entre dois pontos (partida conhecida e chegada em uma sala) e a mesma ser descrita, para identificação de pontos de referência. Embora os resultados tenham indicado que o uso somente de uma interface 2D (Mapa do OSM) foi mais bem-sucedida para os usuários acharem o ponto de chegada da rota na Universidade, para este projeto, o mais importante foi a análise de aceitabilidade e de possibilidades de interação e uso, no qual a interface SVI performou adequadamente. As estratégias de navegação utilizadas pelos participantes mostraram-se mais eficazes quando se concentraram na interface 2D, independentemente das diferenças nas interfaces e dispositivos, apesar das informações limitadas disponíveis.

Contudo, a interação com a Visualização ao nível da rua (SVI) produziu uma dinâmica diferenciada. Ela influenciou os usuários a preferirem essa modalidade de visualização, resultando na redução do uso do mapa 2D como ferramenta de orientação para localização, com a consequente limitação na obtenção de informações mais pormenorizadas. Notavelmente, aqueles usuários que conseguiram identificar com maior precisão seus destinos não apenas desenvolveram estratégias de navegação mais distintas, mas também detalharam minuciosamente seus próprios métodos de orientação, o que resultou em trajetos descrições de referência melhores.

---

### 5.3 PROJETO DA INTERFACE

O design da interface foi concretizado através da utilização da plataforma _Figma_ (**Figura 10**). O protótipo foi desenvolvido de maneira interativa, com a finalidade de possibilitar a inclusão de código em JavaScript e HTML para futuras iterações do aplicativo. A plataforma é projetada para permitir uma experiência de navegação acessível e abrange diversas funcionalidades, incluindo a interface 2D+SVI, imagens 2D e de satélite, bem como a implementação da classificação conforme descrita por Leitão (2021) (**Figures 11, 12**).

A elaboração da interface teve como principal objetivo melhorar a usabilidade do aplicativo, simplificando tanto o processo de coleta de informações quanto a navegação na infraestrutura da universidade. Além disso, a interface inclui uma seção dedicada à avaliação dendrológica das espécies florestais presentes no Campus UFAM Manaus e na Fazenda Experimental (FAEXP), com o propósito de oferecer suporte aos acadêmicos de Engenharia Florestal.

#### Figura 10. Visão geral das janelas do aplicativo com implementação no Campus UFAM e FAEXP. Acesse a interface pelo link:

https://www.figma.com/proto/JiAnoLjdSwHZZtxKxM0JN1l-ufam_app_interface?node-id=436-41&starting-point-node-id=436%3A18
_Fonte: A autora (2023)_

#### Figura 11. Área dedicada às espécies florestais com ênfase na classificação de Leitão (2021).

_Fonte: A autora (2023)_

#### Figura 12. SVI mostrando o dormitório da FAEXP.

_Fonte: A autora (2023)_

---

### 5.4 Continuação e trabalhos futuros

Os testes realizados e os novos dados obtidos deverão ser incorporados à interface final do sistema do Campus Map, como forma de acesso e registro de atividades de pesquisa e extensão nas áreas. Ressalta-se a importância de viabilizar servidor da UFAM para armazenamento da interface e acesso ao Banco de Dados de imagens e vetores, a partir da aplicação do _MapillaryJS_. Também espera-se realizar novos testes com usuários para verificar a aceitabilidade da interface final da plataforma.

---

## 6. REFERÊNCIAS

BOTELLA, C. et al. In Vivo versus Augmented Reality Exposure in the Treatment of Small Animal Phobia: A Randomized Controlled Trial. _Cyberpsychology, Behavior, and Social Networking_, v. 19, n. 2, p. 1-22, 2016.

CALDAS, S. R. Impactos ambientais sobre a floresta da UFAM. Dissertação de Mestrado em Geografia. UFAM, 2016.

CÂMARA, J. B. D. A. Modelagem ambiental e trilha como instrumento de ecoturismo e educação ambiental. Mestrado em Ciências do Ambiente e Sustentabilidade na Amazônia. UFAM, 2014.

CRUZ, I. P. O. A caracterização pedológica, fitoecológica e produtividade de Ocneacarpus bacaba Martius (Palmae) em floresta de terra firme e pastagens na Amazônia Central. Tese de Doutorado, Instituto Nacional de Pesquisas da Amazônia, Manaus, Amazonas. 2001.

CUNHA, M. A. PRZEYBILOVICZ, E., MACAYA, J. F. ME SANTOS, F. B. P. D. Smart cities: transformação digital de cidades. 2016.FERREIRA, G. C. Modelagem ambiental de espécies de árvores no Vale do Jari, Monte Dourado, Pará usando dados de inventário florestal.Tese de Doutorado, Instituto de Pesquisas Jardim Botânico do Rio de Janeiro, 2009.

GRABOWSKI, M. Research on Wearable, Immersive Augmented Reality (WIAR) Adoption in Maritime Navigation. _Journal of Navigation_, v. 68, n. 3, p. 453-464, 2015.

HÖLLERER, T., FEINER, S. Mobile augmented reality. _Telegeoinformatics: Location-based computing and services_, 21, 2004.

KRAUSE, F. C. Educação ambiental baseada no lugar com realidade aumentada: métodos e diretrizes para a transposição didática no desenvolvimento e uso de aplicativos, 2019.

LAGUELA, S., GESTO, M.; RIVEIRO, B. Gonzalez-Aguilera, D. Infrared Cephalic-Vein To Assist Blood Extraction Tasks: Automatic Projection And Recognition. Int. Arch. Photogramm. Remote Sens. Spatial Inf. Sci., XLI-B5, 2016.

LEITÃO, F. Campus Map Ufam: Modelagem, mapeamento e monitoramento do campus da UFAM. Manaus, AM. Relatório final - Iniciação científica. UFAM, 2023.

LIMA, C. R. Desenvolvimento de aplicativo para dispositivos móveis com mapas indoors para o projeto UFPR Campus Map. Trabalho de graduação (Engenharia Cartográfica e Agrimensura) Setor Ciências da Terra, Universidade Federal do Paraná, Curitiba, 2017.

MA, D., FAN, H., LI, W., & DING, X. The state of mapillary: An exploration analysis. _ISPRS International Journal of Geo-Information_, v. 9, n. 1, p. 10, 2019.

MCCULLOUGH, REBECCA. "Are we losing our way?" Navigational aids, socio-sensory way-finding and the spatial awareness of young adults. _Area_, v. 51, n. 3, p. 479-488, 2019.

MCMILLAN, E., FLOOD, KGLAESER, R. Virtual reality, augmented reality, mixed reality, and the marine conservation movement. _Aquatic Conservation:Marine and Freshwater Ecosystems_, 27, 162-168, 2017.MURARI, M. L. Desenvolvimento de um sistema de interface para plataforma desktop visando a delimitação de áreas urbanas em escalas municipais. Doutorado em Tecnologia Ambiental, 2019.

MENDONÇA, A. L., LEITÃO, F., ALBUQUERQUE, N., SCHMIDT, M. e DELAZAR, L.S.Rumo ao SMART CAMPUS: Interfaces e Modelagem de Banco de Dados Geográfico no Âmbito do Campus Map. Anais do Colóquio Brasileiro de Ciências Geodésicas UFPR, 2022.

MYERS, N. The Primary Source: Tropical Forests and our Future, 2nd ed., W.W. Norton, New York, NY, E.U.A. 416 p. 1992.

NEVES, A. N. et al. Iniciativa Smart Campus: um estudo de caso em progresso na Universidade Federal do Pará. In: Anais do Workshop de Computação Urbana. SBC, 2017.

NIKOOHEMAT, Shayan. Smart campus map. Technical University of Munich Faculty of Civil, Geo and Environmental Engineering Department of Cartography, 2013.

PERREIRA, J. S. O futuro da floresta - as alterações climáticas. In: Sande Silva, J. (ed). Floresta e Sociedade. Uma história comum. Publicação Social SA. Fundação Calouste Gulbenkian para o Desenvolvimento. Lisboa. 127-142 pp, 2007.

PIERDICEA, R. et al. Smart museumization of riverbanks using a standard data layer and Augmented Reality. _Computers & Geosciences_, v. 95, p. 67-74, 2016.

PINHEIRO, L. Conservação da biodiversidade em fragmentos florestais. Série técnica IPEF, v. 12, n. 32, p. 25-42, 1998.YIN, C. et al. A literature survey on smart cities. _Science China Information Sciences_, v. 58, n. 10, p. 1-18, 2015.

ZARNOTT, D. H. Alocação de áreas florestais visando a conservação do solo e da água em propriedades familiares. Dissertação UFPEL, 2012.
