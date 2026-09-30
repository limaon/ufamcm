# Stack base do MVP

O Campus Map UFAM adotará uma arquitetura web em camadas, com **TypeScript** como linguagem principal, **Next.js 16/React** no frontend, **OpenLayers** para mapas, **Node.js 20/Express 5** no backend e **PostgreSQL 16 com PostGIS 3.4** para persistência geoespacial. A API será REST, utilizando JSON e GeoJSON; o acesso ao banco será feito por **Knex.js**, com migrations versionadas, e a validação de entradas por **Zod**.

O ambiente local será reproduzível com **Docker Compose**. A qualidade será garantida inicialmente por **ESLint, Prettier, Jest, Supertest e Playwright**. A primeira fatia funcional será mapa público + autenticação + criação de feature pendente + aprovação administrativa. GeoServer/WMS, Mapillary, Mapbox, visualização 3D, Nginx e Jenkins ficam adiados até serem necessários por uma entrega concreta.

## Decisão

```text
Next.js/React + OpenLayers
            |
       REST/GeoJSON
            |
     Express/TypeScript
            |
     PostgreSQL + PostGIS
```

O banco próprio será a fonte oficial das features colaborativas. OSM será usado como basemap inicial. Integrações externas, como WMS e Mapillary, serão adicionadas posteriormente atrás de interfaces próprias, evitando acoplamento prematuro.

## Opções consideradas

- **GeoServer desde o início:** adiado porque a primeira fatia pode servir GeoJSON diretamente pela API, reduzindo infraestrutura inicial.
- **Mapbox desde o início:** adiado porque OpenLayers atende OSM, GeoJSON, desenho e futura integração WMS sem exigir token pago.
- **Backend dentro do Next.js:** rejeitado para preservar a separação prevista no Documento V4 entre interface e regras de negócio.
- **Microserviços:** rejeitados; o MVP começará como uma aplicação modular com um frontend, uma API e um banco.

## Consequências

- O desenvolvimento local não dependerá de GeoServer, Mapillary ou Mapbox.
- O domínio e a API poderão evoluir sem vincular a persistência a um provedor externo.
- Será necessário manter contratos claros entre frontend e backend.
- O proxy reverso, HTTPS, CI/CD e políticas de produção serão definidos na etapa de implantação, não na primeira fatia local.

# Cronograma inicial a ser seguido

1. Monorepo com frontend e API.
2. API Express funcionando.
3. Endpoint `/health`.
4. Endpoint `/version`.
5. Docker Compose com PostgreSQL + PostGIS.
6. Configuração do Knex.
7. Conexão da API com o banco.
8. Endpoint `/db-health`.
9. Migrations versionadas:
   - Habilitação do PostGIS.
   - Criação de `campus_features`.
   - Correção de timestamps.
10. Índice espacial `GIST`.
11. Model para consultar e criar features.
12. Endpoint `GET /features`.
13. Endpoint `POST /features`.
14. Validação de entrada com Zod.
15. Conversão para GeoJSON.
16. Resposta como `FeatureCollection`.
17. CORS entre frontend e API.
18. OpenLayers instalado.
19. Mapa OpenStreetMap renderizado no frontend.
20. Features de teste cadastradas no banco.
21. Criar uma `VectorLayer` no OpenLayers.
22. Buscar `/features` pelo frontend.
23. Desenhar as features do PostGIS sobre o mapa.

### Mapa

24. Popup ao clicar em uma feature.
25. Controle de camadas.
26. Estilos diferentes por categoria.
27. Ferramenta para desenhar pontos, linhas e polígonos.
28. Enviar desenhos para `POST /features`.
29. Busca por nome ou categoria.

### Autenticação

30. Criar tabela de usuários.
31. Login.
32. Hash de senhas.
33. JWT.
34. Logout.
35. RBAC:

- Público.
- Editor.
- Administrador.

### Curadoria

36. Fluxo de status:

```text
pending -> approved
pending -> rejected
```

37. Painel administrativo.
38. Aprovação e rejeição com justificativa.
39. Edição das próprias features pelo editor.
40. Edição de qualquer feature pelo administrador.

### Dados adicionais

41. Camadas WMS/GeoServer.
42. Trilhas.
43. Integração com Mapillary.
44. Catálogo de árvores.
45. Visualização 3D.

### Qualidade e produção

46. Tratamento centralizado de erros.
47. Testes unitários.
48. Testes de API.
49. Testes end-to-end.
50. Configuração por variáveis de ambiente.
51. Logs estruturados.
52. Rate limiting.
53. HTTPS.
54. Backup do banco.
55. CI/CD.
56. Acessibilidade e responsividade.
