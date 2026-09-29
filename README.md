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
A sessão do painel fica em memória: recarregar a página exige novo login.
