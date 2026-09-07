# 🚀 Quick Start Guide

Get your MetalTrade Academy platform running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- A Neon PostgreSQL account (free tier works)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Database

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string (it looks like: `postgresql://user:pass@host.neon.tech/db`)

## Step 3: Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update these values:

```env
# Replace with your actual Neon connection string
DATABASE_URL="postgresql://user:pass@host.neon.tech/database?sslmode=require"

# Generate a random secret (run this in terminal):
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
BETTER_AUTH_SECRET="paste_generated_secret_here"

# Keep these as-is for local development
BETTER_AUTH_URL="http://localhost:3456"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3456"
```

## Step 4: Initialize Database

```bash
# Push the schema to Neon
npm run db:push

# Seed with demo courses
npm run seed
```

You should see:
```
✅ Seeding complete!
✓ Inserted 3 courses
✓ Inserted 12 lessons
```

## Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3456](http://localhost:3456) in your browser.

## ✅ What to Test

1. **Landing page** - Browse the 3 courses
2. **Sign up** - Create an account at `/inscription`
3. **Browse courses** - Click "Découvrir les formations"
4. **Watch a lesson** - Click into a course → Start course
5. **Upload documents** - Go to "Documents" (requires login)

## 📦 What's Included

- ✅ 3 complete courses (Introduction, Trading, Compliance)
- ✅ 12 video lessons with placeholder URLs
- ✅ French UI throughout
- ✅ Premium dark design with brass accents
- ✅ Full authentication system
- ✅ Document upload area
- ✅ Mobile responsive

## 🎬 Replacing Placeholder Videos

The seed includes public placeholder videos from Google Cloud Storage. To use your own:

1. Upload videos to a CDN (Vercel Blob, Cloudflare R2, S3, etc.)
2. Update the `lessons` table in your database:

```sql
UPDATE lessons 
SET video_url = 'https://your-cdn.com/your-video.mp4' 
WHERE slug = 'types-de-metaux';
```

Or edit `scripts/seed.ts` and re-run `npm run seed`.

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# - DATABASE_URL (your Neon connection string)
# - BETTER_AUTH_SECRET (same as local)
# - BETTER_AUTH_URL (https://your-domain.vercel.app)
# - NEXT_PUBLIC_BETTER_AUTH_URL (https://your-domain.vercel.app)
# - BLOB_READ_WRITE_TOKEN (optional, for document uploads)
```

## 🆘 Troubleshooting

**"Cannot connect to database"**
- Check your DATABASE_URL is correct
- Ensure it ends with `?sslmode=require`
- Verify your Neon database is active

**"Better Auth error"**
- Generate a new BETTER_AUTH_SECRET: `openssl rand -base64 32`
- Make sure both BETTER_AUTH_URL variables are set

**"Build fails"**
- Run `npm run build` to see detailed errors
- Ensure all environment variables are set

## 📚 Full Documentation

See [README.md](./README.md) for complete documentation, deployment guides, and customization options.

## 🎨 Customization

The premium dark theme is defined in `app/globals.css`. Key classes:
- `.brass-gradient` - Gold text gradient
- `.card-premium` - Card with glass effect
- `.btn-brass` - Gold button style

Colors are in CSS variables - adjust `--color-*` values to rebrand.

---

**Built with ❤️ for French B2B professionals**
