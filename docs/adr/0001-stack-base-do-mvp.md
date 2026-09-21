---
status: accepted
---

# Stack base do MVP

O Campus Map UFAM adotará uma arquitetura web em camadas, com **TypeScript** como linguagem principal, **Next.js 16/React** no frontend, **OpenLayers** para mapas, **Node.js 20/Express 5** no backend e **PostgreSQL 16 com PostGIS 3.4** para persistência geoespacial. A API será REST, utilizando JSON e GeoJSON; o acesso ao banco será feito por **Knex.js**, com migrations versionadas, e a validação de entradas por **Zod**.

O ambiente local será reproduzível com **Docker Compose**. A qualidade será garantida inicialmente por **ESLint, Prettier, Vitest, Supertest e Playwright**. A primeira fatia funcional será mapa público + autenticação + criação de feature pendente + aprovação administrativa. GeoServer/WMS, Mapillary, Mapbox, visualização 3D, Nginx e Jenkins ficam adiados até serem necessários por uma entrega concreta.

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
