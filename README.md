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

### Sessão compartilhada e contribuições no mapa

Mapa, edição e curadoria usam o mesmo token de sessão. Entre no formulário acima
do mapa com uma conta `editor` ou `admin`, desenhe e salve sua contribuição.
É possível desenhar antes do login: o rascunho permanece enquanto você entra na
mesma página. O salvamento exige autenticação, envia o Bearer token e registra
a autoria no banco com status `pending`.

Depois de entrar, navegue para **Editar features** ou, se for admin, para
**Curadoria administrativa**, sem novo login. **Sair** remove a sessão compartilhada.
Se a API recusar o token com `401`, o mapa pede novo login e preserva o rascunho.
As antigas sessões separadas foram substituídas: após esta atualização, entre
novamente uma vez.

### Publicação no mapa público

`GET /features` retorna somente registros `approved`, no formato GeoJSON
`FeatureCollection`. Pendentes e rejeitados não aparecem na camada pública,
na busca ou nos popups, mesmo quando o visitante está autenticado.
Após salvar um desenho, o rascunho sai do mapa e a interface informa que aguarda
aprovação. A contribuição continua disponível em **Editar features** e na fila
de curadoria enquanto estiver pendente.

Aprovar publica a feature; editar uma feature aprovada a devolve para `pending`
e a retira das próximas consultas públicas. Rejeitar mantém a feature fora do
mapa público. Recarregue o mapa para refletir decisões feitas em outra página.
Nenhum registro histórico é aprovado automaticamente.

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

## Edição de features pela API

`PATCH /features/:id` exige `Authorization: Bearer <token>`.
Editor pode editar somente features de sua autoria; admin pode editar qualquer
feature, inclusive registros históricos sem autor.

Envie apenas os campos que deseja alterar:

```json
{
  "name": "Biblioteca Central",
  "description": "Entrada principal atualizada"
}
```

Os campos editáveis são `name`, `category`, `description` e `geometry` (GeoJSON).
`description: null` remove a descrição. Campos omitidos são preservados.
Autoria e campos de curadoria não podem ser enviados nesse endpoint.
Toda edição, inclusive administrativa, retorna o status para `pending` e limpa
os metadados da revisão anterior, exigindo nova aprovação.
Retornos: `200` com `{ feature }`, `400` para dados inválidos, `401` sem sessão
válida, `403` sem permissão e `404` para feature inexistente.

### Formulário de edição

Acesse http://localhost:3000/features (link **Editar features** no mapa ou no
painel administrativo) e entre com uma conta `editor` ou `admin`.
`GET /features/editable` autentica e filtra a lista no servidor: somente as próprias
features para editor, todas para admin, independentemente do status.

Clique em **Editar**, altere os campos e use **Salvar alterações**. A geometria
é editada como GeoJSON (`Point`, `LineString` ou `Polygon`), com coordenadas em
longitude/latitude. **Cancelar** descarta o formulário sem gravar.
Erros preservam o formulário para correção; salvar com sucesso informa que a
feature aguarda nova aprovação. Use **Sair** para encerrar a sessão de edição.

Os testes em `admin-real.spec.ts` também cobrem edição pelo editor e pelo admin,
restrição da listagem, validação do formulário e persistência após recarga.

### Edição visual da geometria

Ao abrir uma feature, o preview contém uma camada editável. Arraste os pontos
ou vértices diretamente no mapa para alterar a geometria; o campo GeoJSON é
atualizado junto com o movimento. Também é possível corrigir o GeoJSON
manualmente e conferir o resultado no preview antes de salvar.
