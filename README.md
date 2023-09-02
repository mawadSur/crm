# CRM Admin CMS

### Start project

#### Create .env file and use values

```bash
NODE_ENV=development
PORT=3434
APP_URL=http://54.242.249.213

# Staging DB
# MONGO_URL=mongodb+srv://mawad:1DmY1ROUtJNfHYj3@cluster0.pd1pdsf.mongodb.net/

# Local DB
# MONGO_URL=mongodb://127.0.0.1:27343/crm

# Local DB run with docker
MONGO_URL=mongodb://db:27017/crm
```

#### Install dependencies

```bash
yarn
```

#### Start normal

<i>Must use local db or staging db (check at .env file)</i>

```bash
yarn dev
```

or

#### Start With docker

<i>Must use docker db or staging db (check at .env file)</i>

```bash
docker compose up
```

http://localhost:3434/admin

## How to deploy new code on server

1. Pull new code

2. Build code

```bash
$ yarn build
```

3. Restart pm2

```bash
$ pm2 restart crm
```
