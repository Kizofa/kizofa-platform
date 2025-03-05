# Render Deployment Guide

This document provides instructions on how to deploy the Kizofa backend API to Render.

## Prerequisites

- GitHub account
- Render account (created using GitHub authentication)
- PlanetScale database (already set up)

## Deployment Steps

### 1. Create a New Web Service on Render

1. Log in to your Render account at [https://render.com](https://render.com)
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the following settings:
   - **Name**: kizofa-api
   - **Root Directory**: apps/backend
   - **Environment**: Node
   - **Region**: Choose the region closest to your users (e.g., Frankfurt for Europe)
   - **Branch**: main
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Instance Type**: Free (for testing) or Basic (for production)

### 2. Environment Variables

Add the following environment variables:

- `NODE_ENV`: production
- `DATABASE_URL`: Your PlanetScale connection string
- `JWT_SECRET`: A secure random string for JWT token signing
- `PORT`: 10000 (Render will automatically use its own PORT)

### 3. Health Check

- **Path**: /health
- **Interval**: 10s
- **Timeout**: 5s
- **Grace Period**: 120s

## Redeployment

Render automatically redeploys your service when you push changes to the connected GitHub repository branch.

## Troubleshooting

If your deployment fails, check the following:

1. Logs in the Render dashboard
2. Make sure all required environment variables are set
3. Verify the build and start commands are correct
4. Check that the Prisma schema is compatible with PlanetScale

## Resources

- [Render Documentation](https://render.com/docs)
- [NestJS Deployment Guide](https://docs.nestjs.com/techniques/performance)
- [Prisma with PlanetScale](https://www.prisma.io/docs/guides/deployment/platforms) 