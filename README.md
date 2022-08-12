This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies
```bash
npm install
```

Generate the database
```bash
npx prisma migrate dev --name init
```

Seed the local database with sample data
```bash
npx prisma db seed
```

Start the local development server
```bash
npm run dev
```

The interactive API docs can be viewed at http://localhost:3000/api-doc