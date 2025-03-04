# Kizofa Platform

Kizofa is an innovative on-demand peer-to-peer (P2P) shipping platform that connects users needing to send packages with travelers who have available luggage space.

## Project Structure

This repository is structured as a monorepo containing the following components:

- **apps/**: Contains the different applications
  - **backend/**: NestJS API backend
  - **mobile/**: React Native mobile application
  - **admin/**: React admin dashboard
- **packages/**: Shared libraries and utilities
  - **common/**: Common code used across applications
  - **ui/**: Shared UI components
- **docs/**: Documentation assets
- **docker-compose.yml**: Docker Compose configuration for local development

## Getting Started

### Prerequisites

- Node.js (v14+)
- Docker and Docker Compose
- Git

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Kizofa/kizofa-backend.git
   cd kizofa-backend
   ```

2. Run the setup script:
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. Start the backend:
   ```bash
   npm run start:backend
   ```

4. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

## Development Guidelines

### Branch Naming

- `feature/feature-name`: For new features
- `bugfix/bug-name`: For bug fixes
- `hotfix/issue-name`: For critical issues
- `release/version`: For release preparation

### Commit Message Format

Follow the conventional commits format:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Example: `feat(auth): implement user registration`

### Pull Requests

- Create a pull request from your feature branch to the main branch
- Ensure all tests pass before requesting a review
- Include clear descriptions of changes
- Reference any related issues

## CI/CD Workflows

This project uses GitHub Actions for continuous integration and deployment:

### CI Workflow

- Runs on every push to `main` and `develop` branches and on all PRs
- Runs tests and linting to ensure code quality
- Builds both backend and frontend applications

### Deployment Workflows

#### Staging Deployment

- Triggers automatically on pushes to the `develop` branch
- Deploys both backend and frontend to the staging environment
- Uses the `staging` GitHub environment

#### Production Deployment

- Triggers automatically on pushes to the `main` branch
- Deploys both backend and frontend to the production environment
- Uses the `production` GitHub environment with required approvals

## Deployment with Render

This project is set up for deployment on Render, using Docker for both the backend and frontend components.

### Backend Deployment
- Deployed as a Docker service from `backend/Dockerfile`
- Configured with environment variables for database, JWT, etc.
- Health checks configured at `/health` endpoint

### Frontend Deployment  
- Deployed as a Docker service from `frontend/Dockerfile`
- Uses Nginx to serve static assets
- Proxies API requests to the backend service

## Fixing GitHub and Render Setup

If you're encountering issues with GitHub Actions or Render deployments, follow these steps:

### 1. Configure GitHub Secrets

Go to your GitHub repository > Settings > Secrets and Variables > Actions and add:

#### Production secrets:
- `RENDER_API_KEY`: Your Render API key from Account Settings
- `RENDER_SERVICE_ID_BACKEND`: Your Render backend service ID
- `RENDER_SERVICE_ID_FRONTEND`: Your Render frontend service ID
- `DATABASE_URL`: Production database connection string

#### Staging secrets (in staging environment):
- `RENDER_SERVICE_ID_BACKEND_STAGING`: Staging backend service ID
- `RENDER_SERVICE_ID_FRONTEND_STAGING`: Staging frontend service ID
- `DATABASE_URL`: Staging database connection string

### 2. Verify Render Setup

1. Make sure both services are created in Render:
   - kizofa-api (backend)
   - kizofa-frontend (frontend)

2. Ensure environment variables are set correctly in Render dashboard

3. Check service logs in Render for any build or deployment errors

### 3. Common Issues and Solutions

- **Build failures**: Check if Dockerfiles exist in the correct locations
- **Health check failures**: Ensure backend `/health` endpoint is working correctly
- **Database connection errors**: Verify PlanetScale connection strings are correct
- **Frontend not connecting to backend**: Check the Nginx configuration in `frontend/nginx.conf`

## Documentation

- [Project Context](docs/CONTEXT.md): Overview of the Kizofa platform
- [Development Plan](docs/developmentplan.md): Detailed development timeline and tasks
- [Revised Roadmap](docs/revised-roadmap.md): Updated production-first approach roadmap
- [API Documentation](backend/README.md): API endpoints and usage
- [Phase 1 Completion](docs/PHASE1-COMPLETION.md): Phase 1 tasks completion report

## License

This project is proprietary and confidential. All rights reserved. 