# Reddere Soluções Financeiras

Site institucional da Reddere — plataforma de consultoria financeira, investimentos, planejamento patrimonial e sucessório.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | Laravel 12 (PHP 8.5) |
| Frontend | React 19 + Inertia.js 3 |
| Estilo | Tailwind CSS v4 |
| Build | Vite 8 |
| Banco | SQLite (dev) / MySQL ou PostgreSQL (prod) |

---

## Pré-requisitos

- PHP >= 8.2
- Composer >= 2.x
- Node.js >= 18
- npm >= 9

---

## Rodar localmente

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/seu-usuario/ReddereSolucoesFinanceiras.git
cd ReddereSolucoesFinanceiras

composer install
npm install
```

### 2. Configurar o ambiente

```bash
cp .env.example .env
php artisan key:generate
```

Edite `.env` conforme necessário (banco, mail, etc.).

### 3. Banco de dados

```bash
php artisan migrate
```

> Por padrão usa SQLite (`database/database.sqlite`). Para usar MySQL/PostgreSQL, edite `DB_CONNECTION`, `DB_DATABASE`, `DB_USERNAME` e `DB_PASSWORD` no `.env`.

### 4. Iniciar os servidores

Abra **dois terminais**:

```bash
# Terminal 1 — backend Laravel
php artisan serve
```

```bash
# Terminal 2 — frontend Vite (hot reload)
npm run dev
```

Acesse em: **http://localhost:8000**

---

## Páginas disponíveis

| URL | Descrição |
|-----|-----------|
| `/` | Home — hero, simulador, soluções, depoimentos |
| `/solucoes` | Catálogo completo de soluções com filtro |
| `/consultor` | Consultor virtual (chat interativo) |
| `/time` | Equipe e valores da empresa |
| `/contato` | Formulário de contato |
| `/admin` | Painel administrativo (soluções, CRM, conversas) |

---

## Estrutura do projeto

```
.
├── app/
│   └── Http/
│       ├── Controllers/
│       │   ├── PageController.php       # Render das páginas Inertia
│       │   └── ContatoController.php    # POST /contato
│       └── Middleware/
│           └── HandleInertiaRequests.php
├── resources/
│   ├── css/
│   │   └── app.css                      # Tailwind v4 + tema Reddere
│   ├── js/
│   │   ├── app.jsx                      # Entry point Inertia
│   │   ├── Components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── QuotesTicker.jsx
│   │   ├── Layouts/
│   │   │   └── MainLayout.jsx
│   │   └── Pages/
│   │       ├── Home.jsx
│   │       ├── Solucoes.jsx
│   │       ├── Consultor.jsx
│   │       ├── Time.jsx
│   │       ├── Contato.jsx
│   │       └── Admin.jsx
│   └── views/
│       └── app.blade.php                # Root view do Inertia
├── routes/
│   └── web.php
└── public/
    └── images/
        └── reddere-mark.png             # Logo da marca
```

---

## Deploy (produção)

### Opção A — VPS / servidor próprio (recomendado)

**Requisitos no servidor:** PHP 8.2+, Composer, Node.js, Nginx ou Apache, banco de dados.

#### 1. Enviar os arquivos

```bash
# Via Git
git clone https://github.com/seu-usuario/ReddereSolucoesFinanceiras.git /var/www/reddere
cd /var/www/reddere
```

#### 2. Instalar dependências e compilar assets

```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build          # gera public/build/
```

#### 3. Configurar ambiente

```bash
cp .env.example .env
php artisan key:generate

# Edite .env com as credenciais de produção:
# APP_ENV=production
# APP_DEBUG=false
# APP_URL=https://seudominio.com.br
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_DATABASE=reddere
# DB_USERNAME=reddere_user
# DB_PASSWORD=senha_segura
```

#### 4. Banco e cache

```bash
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### 5. Permissões

```bash
chown -R www-data:www-data /var/www/reddere
chmod -R 755 /var/www/reddere/storage
chmod -R 755 /var/www/reddere/bootstrap/cache
```

#### 6. Nginx — configuração do virtual host

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;
    root /var/www/reddere/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

Ative HTTPS com Certbot:

```bash
certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

---

### Opção B — Hospedagem compartilhada (cPanel / Plesk)

> Requer suporte a PHP 8.2+ e acesso SSH.

1. Faça upload de todos os arquivos (exceto `node_modules/` e `.env`) via FTP ou Git no servidor.
2. Aponte o `document root` do domínio para a pasta `public/`.
3. Renomeie `.env.example` para `.env` e preencha as variáveis.
4. Via SSH:
   ```bash
   composer install --optimize-autoloader --no-dev
   npm install && npm run build
   php artisan key:generate
   php artisan migrate --force
   php artisan config:cache
   ```

---

### Opção C — Deploy em nuvem (Laravel Forge / Vapor / Railway)

**Laravel Forge (recomendado para VPS gerenciado):**
1. Conecte seu servidor (DigitalOcean, AWS, Linode, etc.) ao Forge.
2. Crie um site apontando para o repositório GitHub.
3. Configure o deploy script:
   ```bash
   cd /home/forge/seudominio.com.br
   git pull origin main
   composer install --no-interaction --prefer-dist --optimize-autoloader --no-dev
   npm install && npm run build
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan queue:restart
   ```

**Railway / Render (container):**
- Adicione um `Procfile` na raiz:
  ```
  web: php artisan serve --host=0.0.0.0 --port=$PORT
  ```
- Build command: `composer install --no-dev && npm install && npm run build && php artisan migrate --force`

---

## Variáveis de ambiente importantes

| Variável | Descrição |
|----------|-----------|
| `APP_ENV` | `local` ou `production` |
| `APP_DEBUG` | `true` (dev) / `false` (prod) |
| `APP_URL` | URL pública da aplicação |
| `DB_CONNECTION` | `sqlite`, `mysql` ou `pgsql` |
| `DB_DATABASE` | Nome do banco (ou caminho do SQLite) |
| `MAIL_MAILER` | Driver de e-mail (`smtp`, `ses`, `mailgun`) |
| `MAIL_FROM_ADDRESS` | E-mail remetente |

---

## Scripts úteis

```bash
npm run dev       # Vite em modo desenvolvimento (hot reload)
npm run build     # Compilar assets para produção

php artisan serve                  # Servidor de desenvolvimento
php artisan migrate                # Rodar migrations
php artisan migrate:fresh --seed   # Recriar banco com dados de teste
php artisan config:clear           # Limpar cache de configuração
php artisan route:list             # Listar rotas registradas
php artisan tinker                 # REPL do Laravel
```
