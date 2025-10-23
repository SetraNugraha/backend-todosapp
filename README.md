## Tech Stack

**Frontend:** Vite + ReactJS, Typescript, TailwindCSS

**Backend:** Node, Express, Typescript, Prisma, PostgreSQL

## Run Locally

Clone the project

```bash
  git clone https://github.com/SetraNugraha/backend-todosapp
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Environtment

```bash
  copy .env.example to .env, set the value as needed
```

### Setup DB/Prisma

Create Database localy on PostgreSQL & Make sure Postgresql local service already running/start.

Generate Prisma

```bash
  npx prisma generate
```

```bash
  npx prisma db push
```

### Run project

```bash
  npm run dev
```

## 🔗 Frontend Repository

https://github.com/SetraNugraha/frontend-todosapp
