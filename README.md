# Campus Map UFAM

Plataforma web GIS colaborativa do campus Sen. Arthur Virgílio Filho.

## Requisitos

- Node.js 20+
- npm 10+
- Docker e Docker Compose

## Instalação

```bash
npm install
cp .env.example .env
docker compose -f infra/docker-compose.yml up -d
```

## Desenvolvimento

```bash
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3001/health
- Banco: localhost:5432

## Administrador inicial

Com o banco ativo, execute na raiz:

```bash
npx knex --knexfile apps/api/knexfile.cjs migrate:latest
read -r -p 'Nome: ' ADMIN_NAME
read -r -p 'Email: ' ADMIN_EMAIL
read -r -s -p 'Senha: ' ADMIN_PASSWORD
export ADMIN_NAME ADMIN_EMAIL ADMIN_PASSWORD
npm run admin:create --workspace @campus-map/api
unset ADMIN_NAME ADMIN_EMAIL ADMIN_PASSWORD
```

A senha deve ter ao menos 8 caracteres e até 72 bytes (limite do bcrypt).
O comando armazena somente o hash e não altera contas com email já cadastrado.
Ele usa a mesma `DATABASE_URL` da API; na ausência dela, usa o banco local configurado em `src/lib/db.ts`.

Inicie a aplicação com `npm run dev` e acesse http://localhost:3000/admin.
Entre com as credenciais criadas para listar, aprovar ou rejeitar pendências.
A sessão do painel é persistida no navegador. Use **Sair** para encerrá-la.

## Testes E2E administrativos com API real

Com PostgreSQL/PostGIS ativo, migrations aplicadas e `npm run dev` rodando,
execute em outro terminal, na raiz:

```bash
npm run test:e2e --workspace @campus-map/web -- admin-real.spec.ts --workers=1
```

Os testes usam o navegador, a API e o banco reais, sem interceptar requisições.
Cobrem login, recarga da sessão, aprovação/rejeição, logout, senha incorreta e
restrição de acesso para editor. Usuários e features temporários têm identificadores
únicos e são removidos ao final de cada teste, inclusive em caso de falha.
O processo dos testes deve usar a mesma `DATABASE_URL` da API (ou o mesmo padrão
local). A URL da API segue `NEXT_PUBLIC_API_URL`, com padrão `http://localhost:3001`.
