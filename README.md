This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Food Recall Sync System

This project syncs food recall data from both FDA and USDA sources to a Turso database.

### FDA Sync (Automated)
- Runs automatically via Vercel Cron Job daily at 2:00 AM UTC
- Fetches the latest 100 FDA food enforcement records
- Endpoint: `/api/sync-fda`
- Can be manually triggered by visiting the endpoint (requires CRON_SECRET if configured)

### USDA Sync (Client-Side)
- Runs when users visit the site (once per day)
- Required because the USDA API doesn't respond to server/headless requests
- Uses client-side data fetching and background sync

### Environment Variables
```
TURSO_DB_URL=your_turso_database_url
TURSO_DB_TOKEN=your_turso_auth_token
CRON_SECRET=your_cron_secret (optional, for securing the cron endpoint)
```

### Database Schema
Both FDA and USDA data are stored in the `reports` table with a unified schema. A `sync_tracker` table tracks daily syncs per authority to prevent duplicate syncs.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
