# Deployment Guide

This guide covers deploying the Doctors Appointment Platform to various hosting platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nagasurya07/-Doctors-Appointment-Platform)

**Automatic Deployment:**
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js configuration
3. Add environment variables in Vercel dashboard
4. Deploy with zero configuration

**Manual Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

1. Connect repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

## 🔧 Environment Variables

Set these environment variables in your hosting platform:

### Required Variables
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Vonage Video API
VONAGE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----...
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_app_id
```

### Optional Variables
```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Error Tracking
SENTRY_DSN=https://...

# Custom Domain
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## 🗄️ Database Setup

### Neon (Recommended)

1. **Create Neon Account**: Visit [neon.tech](https://neon.tech)
2. **Create Database**: Set up a new PostgreSQL database
3. **Get Connection String**: Copy the connection URL
4. **Set Environment Variable**: Add to `DATABASE_URL`

### Self-hosted PostgreSQL

1. **Install PostgreSQL**: On your server
2. **Create Database**: `createdb doctors_platform`
3. **Configure Connection**: Update `DATABASE_URL`
4. **Run Migrations**: `npx prisma migrate deploy`

### Database Migration Commands

```bash
# Production migration
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Reset database (caution!)
npx prisma migrate reset
```

## 🎥 Video Service Setup

### Vonage Configuration

1. **Create Vonage Account**: Visit [vonage.com](https://vonage.com)
2. **Create Video Application**:
   - Go to Video API dashboard
   - Create new application
   - Download private key
3. **Set Environment Variables**:
   - `VONAGE_PRIVATE_KEY`: Content of private key file
   - `NEXT_PUBLIC_VONAGE_APPLICATION_ID`: Your app ID

### Alternative: Agora.io

```javascript
// lib/video-config.js
export const videoConfig = {
  provider: 'agora',
  appId: process.env.NEXT_PUBLIC_AGORA_APP_ID,
  // ... other config
}
```

## 🔐 Authentication Setup

### Clerk Configuration

1. **Create Clerk Application**: [clerk.com](https://clerk.com)
2. **Configure OAuth**: Set up social providers
3. **Webhooks**: Set up user sync webhooks
4. **Customize UI**: Brand your auth pages

### Environment Setup
```env
# Development
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Add Domain to Hosting Platform**
2. **Configure DNS Records**:
   ```
   Type: CNAME
   Name: @
   Value: your-platform-domain
   ```
3. **SSL Certificate**: Usually auto-configured
4. **Update Environment Variables**:
   ```env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

### Subdomain Setup
```
Type: CNAME
Name: app
Value: your-platform-domain
```

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// app/layout.js
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Google Analytics
```javascript
// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}
```

### Error Tracking with Sentry
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.CLERK_PUBLISHABLE_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - CLERK_SECRET_KEY=${CLERK_SECRET_KEY}
    depends_on:
      - postgres

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: doctors_platform
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔍 Health Checks

### Health Check Endpoint
```javascript
// app/api/health/route.js
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`
    
    return Response.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        auth: 'operational'
      }
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    )
  }
}
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check environment variables
   - Verify dependencies
   - Review build logs

2. **Database Connection**
   - Verify DATABASE_URL format
   - Check network access
   - Ensure database exists

3. **Authentication Issues**
   - Verify Clerk configuration
   - Check domain whitelist
   - Review webhook endpoints

4. **Video Call Problems**
   - Verify Vonage credentials
   - Check firewall settings
   - Test network connectivity

### Debug Commands
```bash
# Check build output
npm run build 2>&1 | tee build.log

# Test database connection
npx prisma db push --preview-feature

# Verify environment variables
node -e "console.log(process.env)"
```

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review error logs
- Contact support teams
- Create GitHub issues

## 🔒 Security Checklist

- [ ] Environment variables properly set
- [ ] HTTPS enabled
- [ ] Database secured
- [ ] API rate limiting enabled
- [ ] User input validated
- [ ] Error messages sanitized
- [ ] Dependencies updated
- [ ] Security headers configured
