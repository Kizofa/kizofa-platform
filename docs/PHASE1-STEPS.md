# Step-by-Step Guide for Phase 1 Development

This guide is designed for beginners with no prior coding experience. It will walk you through each step of Phase 1 development for the Kizofa platform.

## Prerequisites

Before starting development, make sure you have the following installed:

1. **Node.js and npm**: Download and install from [nodejs.org](https://nodejs.org/)
2. **Git**: Download and install from [git-scm.com](https://git-scm.com/)
3. **Docker Desktop**: Download and install from [docker.com](https://docker.com/)
4. **Visual Studio Code**: Download and install from [code.visualstudio.com](https://code.visualstudio.com/)

## Step 1: Setup Development Environment

### 1.1 Install Required Tools

Open your terminal (Command Prompt on Windows, Terminal on Mac) and install the following global packages:

```bash
# Install NestJS CLI globally
npm install -g @nestjs/cli

# Install React Native CLI globally
npm install -g react-native-cli

# Verify installations
nest --version
react-native --version
```

### 1.2 Working with Existing Monorepo

Since you already have a monorepo structure at Kizofa_Monorepo, we'll use that instead of creating a new repository.

Monorepo Structure:
```
Kizofa_Monorepo/
├── apps/
│   ├── backend/        # NestJS backend
│   ├── mobile/         # React Native mobile app
│   └── admin/          # React admin dashboard
├── packages/           # Shared packages/libraries
│   ├── common/         # Common utilities and types
│   └── ui/             # Shared UI components
├── docs/               # Documentation
└── docker-compose.yml  # Docker compose for local development
```

Let's create this folder structure in your existing repository.

## Step 2: Backend Setup

### 2.1 Initialize NestJS Project

```bash
# Create apps directory if it doesn't exist
mkdir -p apps

# Create a new NestJS project in the backend folder
cd apps
nest new backend

# Navigate to the backend folder
cd backend

# Install additional dependencies
npm install --save @nestjs/config class-validator class-transformer helmet
npm install --save @nestjs/swagger swagger-ui-express
npm install --save @prisma/client prisma
npm install --save-dev @types/node @types/jest

# Install development dependencies
npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier
```

### 2.2 Configure ESLint and Prettier

Create `.prettierrc` file in the backend folder:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

Create `.eslintrc.js` file in the backend folder:

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
```

### 2.3 Configure Git Hooks with Husky

```bash
# Install husky and lint-staged
npm install --save-dev husky lint-staged
```

Add the following to your package.json:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,js}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

## Step 3: Database Setup

### 3.1 Setup Docker for Local Development

Create a `docker-compose.yml` file in the root of your project:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: kizofa
      MYSQL_USER: kizofa_user
      MYSQL_PASSWORD: kizofa_password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:6
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

Start the containers:

```bash
# Start Docker containers
docker-compose up -d
```

### 3.2 Initialize Prisma

Inside the backend folder:

```bash
# Initialize Prisma with MySQL
npx prisma init --datasource-provider mysql
```

Edit the `.env` file to configure the database connection:

```
DATABASE_URL="mysql://kizofa_user:kizofa_password@localhost:3306/kizofa"
```

### 3.3 Create Initial Database Schema

Edit the `prisma/schema.prisma` file:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(uuid())
  email         String   @unique
  password      String
  firstName     String?
  lastName      String?
  phone         String?
  role          Role     @default(USER)
  isVerified    Boolean  @default(false)
  kycStatus     KycStatus @default(PENDING)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  kyc           KYC?
}

model KYC {
  id              String    @id @default(uuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id])
  idType          IDType
  idNumber        String
  idFrontImage    String
  idBackImage     String
  selfieImage     String
  status          KycStatus @default(PENDING)
  rejectionReason String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum Role {
  USER
  TRAVELER
  ADMIN
}

enum KycStatus {
  PENDING
  APPROVED
  REJECTED
}

enum IDType {
  PASSPORT
  NATIONAL_ID
  DRIVERS_LICENSE
}
```

Generate Prisma client:

```bash
npx prisma generate
```

### 3.4 Push Schema to Local Database

```bash
npx prisma db push
```

## Step 4: Mobile App Setup

### 4.1 Initialize React Native Project

From the root of your project:

```bash
# Create React Native project
npx react-native init mobile
```

### 4.2 Install Essential Dependencies

```bash
cd mobile

# Install dependencies
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
npm install react-native-vector-icons react-native-paper
npm install @reduxjs/toolkit react-redux
npm install axios formik yup
```

### 4.3 Configure ESLint and Prettier

Create `.prettierrc` file:

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "semi": true
}
```

## Step 5: Admin Dashboard Setup

### 5.1 Initialize React Project

From the root directory:

```bash
npx create-react-app admin-dashboard --template typescript
```

### 5.2 Install Dependencies

```bash
cd admin-dashboard

# Install dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install axios chart.js react-chartjs-2
```

## Step 6: Core Application Features

### 6.1 Implement Health Check Endpoints

Install the required packages:

```bash
cd apps/backend
npm install --save @nestjs/terminus
```

Create a health module and controller to provide endpoints for monitoring application health.

### 6.2 Implement Logging System

Install Winston logger:

```bash
cd apps/backend
npm install --save winston nest-winston
```

Create a logging module to configure centralized logging.

## Step 7: Create GitHub Account (Required for Deployment)

⚠️ **IMPORTANT:** Before proceeding with the deployment setup, you must create a GitHub account. This is required for the following tasks:

1. Setting up CI/CD pipelines with GitHub Actions
2. Integrating with PlanetScale (which often requires GitHub authentication)
3. Configuring Render for deployments (which authenticates via GitHub)
4. Version control and collaboration

### Create a GitHub Account

1. Go to [github.com](https://github.com/) and click "Sign up"
2. Follow the registration process to create your account
3. Set up two-factor authentication for added security
4. Create a new repository for your project
5. Push your local code to the GitHub repository:

```bash
# Initialize git if not already done
git init

# Add your remote repository
git remote add origin https://github.com/yourusername/kizofa.git

# Add files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

## Step 8: Setup Deployment Infrastructure

⚠️ **NOTE: All the steps in this section require a GitHub account.** ⚠️

### 8.1 Setup PlanetScale Account

1. Go to [planetscale.com](https://planetscale.com/) and create an account (you can sign up with your GitHub account)
2. Create a new database named "kizofa"
3. Create a new branch called "develop"
4. Create a database password and save the connection string

### 8.2 Setup Render Account

1. Go to [render.com](https://render.com/) and create an account (sign up with your GitHub account)
2. Link your GitHub repository to Render
3. Configure your web services for deployment

### 8.3 Troubleshooting Render Deployment Issues

#### Handling Native Dependencies (bcrypt)

When deploying Node.js applications with native dependencies like bcrypt to Render, you may encounter binding-related errors. Here's how to fix them:

1. Update your backend `package.json` to include a postinstall script that rebuilds bcrypt:

```json
{
  "scripts": {
    // ... other scripts
    "postinstall": "if [ \"$RENDER\" = \"true\" ]; then npm rebuild bcrypt --build-from-source; fi"
  }
}
```

2. Configure Render build settings:
   - **Root Directory**: `apps/backend` (for monorepo setups)
   - **Build Command**: `export RENDER=true && npm install && npm rebuild bcrypt --build-from-source && cd ../.. && npm run backend:build`
   - **Start Command**: `npm run start:prod`
   - **Environment Variables**: Add `RENDER=true`

3. These settings ensure that:
   - The RENDER environment variable is set to trigger the conditional rebuild
   - bcrypt is rebuilt from source during deployment
   - The application is built from the monorepo root
   - The start command runs directly from the backend directory

#### Render Deployment Checklist

- ✅ Set appropriate Node.js version (14.x, 16.x, or 18.x)
- ✅ Configure environment variables (database connection strings, JWT secrets, etc.)
- ✅ Ensure build command navigates back to root for monorepo setups
- ✅ Verify that start command doesn't try to change directories if already in the correct directory
- ✅ Add any native dependencies to the rebuild step

### 8.4 Configure GitHub Actions

Create `.github/workflows/ci.yml` file:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '14.x'
      - name: Install dependencies
        run: |
          cd backend
          npm ci
      - name: Run tests
        run: |
          cd backend
          npm test
```

## Step 9: Documentation

### 9.1 Create API Documentation

In the backend project, configure Swagger:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Kizofa API')
    .setDescription('The Kizofa API description')
    .setVersion('1.0')
    .addTag('kizofa')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### 9.2 Create a README.md in the root of your project

```markdown
# Kizofa Platform

Kizofa is an innovative on-demand peer-to-peer (P2P) shipping platform that connects users needing to send packages with travelers who have available luggage space.

## Project Structure

- `/backend` - NestJS backend API
- `/mobile` - React Native mobile application
- `/admin-dashboard` - React admin dashboard
- `/docs` - Project documentation

## Getting Started

### Prerequisites

- Node.js 14+
- Docker Desktop
- Git
- GitHub account (for deployment)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/kizofa.git
   cd kizofa
   ```

2. Start the database services
   ```bash
   docker-compose up -d
   ```

3. Start the backend
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

4. Start the mobile app
   ```bash
   cd mobile
   npm install
   npx react-native run-ios # or run-android
   ```

5. Start the admin dashboard
   ```bash
   cd admin-dashboard
   npm install
   npm start
   ```

## Documentation

- API documentation is available at `http://localhost:3000/api` when the backend is running
```

## Next Steps

After completing these steps, you should have:

1. A fully configured development environment
2. A basic NestJS backend with Prisma ORM
3. Initial database schema
4. A React Native mobile app structure
5. A React admin dashboard structure
6. Health check endpoints for monitoring
7. Logging system with Winston
8. A GitHub account for version control
9. CI/CD configuration with GitHub Actions
10. Deployment configuration for Render and PlanetScale

You'll now be ready to move on to Phase 2, which focuses on authentication and user management features. 