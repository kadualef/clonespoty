# Clonespoty 🎵

Aplicação web full stack inspirada no Spotify, com frontend em **Next.js + TailwindCSS** e backend em **Node.js + Express + Prisma + PostgreSQL**.

## ✅ Recursos implementados

- Autenticação com JWT (cadastro/login/me)
- Perfis de usuário com papéis **ADMIN** e **CUSTOMER**
- Plano **FREE/PREMIUM** simulado
- Player funcional (play/pause, next/prev, progresso e volume)
- Histórico de músicas e favoritos
- Busca de músicas por título/artista
- Playlists (criar, listar, editar, excluir, adicionar/remover música)
- Área Admin com métricas e CRUD base de usuários
- Upload de arquivos (simulado local)
- Integração Spotify OAuth (URL de autorização, callback e importação de playlists)
- Estrutura pronta para deploy com Docker Compose para PostgreSQL

---

## Estrutura de pastas

```bash
clonespoty/
├── client/                 # Frontend Next.js
│   ├── src/app/            # Rotas/pages
│   ├── src/components/     # Componentes UI
│   ├── src/lib/            # API client
│   └── src/store/          # Zustand store (player)
├── server/                 # Backend Express
│   ├── prisma/schema.prisma
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middleware/
│       ├── services/
│       └── config/
├── docker-compose.yml      # Postgres local
└── README.md
```

---

## Backend (server)

### Variáveis de ambiente (`server/.env`)

```env
PORT=5000
DATABASE_URL="postgresql://admin:password@localhost:5432/spotify_db?schema=public"
JWT_SECRET="super_secret"
SPOTIFY_CLIENT_ID="..."
SPOTIFY_CLIENT_SECRET="..."
SPOTIFY_REDIRECT_URI="http://localhost:5000/api/spotify/callback"
```

### Rodando backend

```bash
cd server
npm install
npm run prisma:generate
npm run prisma:push
npm run dev
```

Seeder opcional:

```bash
curl http://localhost:5000/api/seed
```

---

## Frontend (client)

### Variáveis de ambiente (`client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Rodando frontend

```bash
cd client
npm install
npm run dev
```

Acesse: `http://localhost:3000`

---

## Banco de dados com Docker

```bash
docker-compose up -d
```

---

## Principais rotas da API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/me/plan`
- `GET /api/songs?q=`
- `POST /api/songs/:songId/history`
- `POST /api/songs/:songId/favorite`
- `GET /api/playlists`
- `POST /api/playlists`
- `PATCH /api/playlists/:id`
- `DELETE /api/playlists/:id`
- `GET /api/admin/dashboard` (admin)
- `GET /api/spotify/auth-url`
- `GET /api/spotify/callback?code=...`
- `POST /api/spotify/import-playlists`

---

## Deploy

- Frontend: Vercel / Netlify
- Backend: Render / Railway / Fly.io
- DB: Neon / Supabase / RDS
- Ajuste as variáveis de ambiente em produção e habilite CORS para o domínio do frontend.
