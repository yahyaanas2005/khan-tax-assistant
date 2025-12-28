# Deployment Guide - Khan Waheed & Co. AI Tax Assistant

## Prerequisites
- Node.js 18+ installed
- Vercel account (free tier available)
- OpenAI API key
- PostgreSQL database (Vercel Postgres or Neon free tier)

## Step 1: Install Dependencies

```bash
cd "c:/Users/i4970/Downloads/Saas/Khanwco anything/create-anything/create-anything/_/apps/web"
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the web app directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your actual values:
- `OPENAI_API_KEY`: Your OpenAI API key from https://platform.openai.com/api-keys
- `DATABASE_URL`: Your PostgreSQL connection string

## Step 3: Set Up Database

### Option A: Vercel Postgres (Recommended)
1. Go to https://vercel.com/dashboard
2. Create a new project or select existing
3. Go to Storage → Create Database → Postgres
4. Copy the connection strings to your `.env.local`
5. Run the schema:
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Link your project
   vercel link
   
   # Pull environment variables
   vercel env pull .env.local
   
   # Run schema (you'll need to connect to your database)
   # Use the Vercel dashboard SQL editor or psql
   ```

### Option B: Neon (Alternative)
1. Go to https://neon.tech
2. Create a free account and database
3. Copy the connection string to `.env.local`
4. Run the schema from `schema.sql`

## Step 4: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- Homepage loads correctly
- Navigate to `/ai-assistant`
- Select a jurisdiction
- Have a test conversation
- Try generating a form

## Step 5: Deploy to Vercel

### Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your project (or upload the folder)
3. Configure:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `build/client`
   - Install Command: `npm install`
4. Add Environment Variables:
   - `OPENAI_API_KEY`
   - `DATABASE_URL` (or use Vercel Postgres)
5. Deploy!

## Step 6: Initialize Database

After deployment, initialize your database with the schema:

1. Go to your Vercel project dashboard
2. Navigate to Storage → Your Postgres database
3. Click "Query" or "Data"
4. Copy and paste the contents of `schema.sql`
5. Execute the SQL

## Step 7: Verify Deployment

1. Visit your deployed URL (e.g., `https://your-app.vercel.app`)
2. Test the AI assistant with all 4 jurisdictions:
   - USA (IRS)
   - Canada (CRA)
   - Saudi Arabia (ZATCA)
   - Pakistan (FBR)
3. Test form generation
4. Check database to ensure conversations are being saved

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 18+)
- Clear build cache: `rm -rf build .react-router`

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database is accessible from Vercel
- Ensure schema has been run

### AI Not Responding
- Verify `OPENAI_API_KEY` is set correctly
- Check OpenAI API usage limits
- Review Vercel function logs for errors

### Form Generation Fails
- Check if PDF generation integration is configured
- Verify database tables exist
- Check browser console for errors

## Free Hosting Alternatives

If you prefer not to use Vercel:

### Netlify
- Similar to Vercel
- Free tier available
- Requires adapter changes for React Router

### Railway
- Free tier with PostgreSQL included
- Good for full-stack apps
- Deploy via GitHub

### Render
- Free tier available
- Built-in PostgreSQL
- Deploy via GitHub

## Monitoring & Maintenance

### Monitor API Usage
- Check OpenAI usage: https://platform.openai.com/usage
- Monitor Vercel function invocations
- Set up billing alerts

### Database Maintenance
- Regularly backup your database
- Monitor storage usage
- Clean up old conversations if needed

### Updates
- Keep dependencies updated: `npm update`
- Monitor for security vulnerabilities: `npm audit`
- Update tax brackets annually

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to Domains
3. Add your custom domain (e.g., `khanwco.com`)
4. Update DNS records as instructed
5. SSL certificate will be auto-generated

## Support

For issues:
- Check Vercel logs: `vercel logs`
- Review browser console
- Check database logs
- Verify environment variables

Your AI Tax Assistant is now live! 🎉
