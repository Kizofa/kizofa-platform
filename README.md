# Kizofa Platform

Kizofa is an innovative on-demand peer-to-peer (P2P) shipping platform that connects users needing to send packages with travelers who have available luggage space.

## Project Structure

This is a monorepo containing all components of the Kizofa platform:

- `apps/backend` - NestJS backend API
- `apps/mobile` - React Native mobile application (future)
- `apps/admin` - React admin dashboard (future)
- `packages/*` - Shared packages/libraries
- `docs/` - Project documentation

## Getting Started

### Prerequisites

- Node.js 14+
- npm 6+
- MySQL & Redis (installed via Homebrew on macOS)

### Running the Application

From the root directory, you can use the following npm scripts:

```bash
# Start the backend in development mode
npm run backend:dev

# Start the backend in production mode
npm run backend:start

# Build the backend
npm run backend:build

# Start the mobile app (once implemented)
npm run mobile:start

# Start the admin dashboard (once implemented)
npm run admin:start
```

### Accessing the Application

- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api
- Health Check: http://localhost:3000/health

## Documentation

Detailed documentation can be found in the `docs/` directory:

- `PHASE1-COMPLETION.md` - Current progress and next steps
- `PHASE1-STEPS.md` - Step-by-step guide for Phase 1 development
- `developmentplan.md` - Overall development plan
- `roadmap.md` - Project roadmap
- `CONTEXT.md` - Platform context and architecture

## Development Guidelines

- Follow NestJS best practices for backend development
- Use feature modules for organization
- Write tests for all new features
- Document API endpoints using Swagger

## GitHub Account Requirements

**Important:** Several upcoming tasks require a GitHub account:

- Setting up CI/CD pipelines with GitHub Actions
- Integrating with PlanetScale for production database
- Configuring Render for deployments
- Version control and collaboration

Please refer to `docs/PHASE1-STEPS.md` for instructions on creating a GitHub account and setting up the necessary integrations 