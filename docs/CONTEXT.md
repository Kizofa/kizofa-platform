# Kizofa Platform Documentation

## Overview

Kizofa is an innovative on-demand peer-to-peer (P2P) shipping platform that connects users needing to send packages with travelers who have available luggage space. By leveraging existing travel plans, Kizofa offers a cost-effective, secure, and eco-friendly solution for cross-border shipping. The platform builds trust through a unified KYC process, dual matchmaking, and a secure transaction flow.

## Core Features

### 1. Unified Onboarding & Verification
- User registration via email/password and OTP
- KYC verification through government-issued ID upload
- Admin approval process for account activation

### 2. Dashboard & Role Selection
Users can choose between two primary roles:
- **Package Sender**: Create and manage shipment requests
- **Traveler**: Register flights and offer luggage space

### 3. Dual Matchmaking System
- **Senders** post shipment requirements:
  - Package dimensions
  - Weight
  - Package type and contents
  - Origin/destination points
  - Delivery timeline
- **Travelers** register:
  - Flight details
  - Available space
  - Travel dates
- Automated matching based on route, timing, and capacity

### 4. Secure Transaction Flow
- 6-digit PIN verification for package handoff
- Photo documentation at pickup and delivery
- Status tracking (Posted → In Transit → Delivered)

### 5. Communication Features
- Real-time in-app messaging
- Push notifications for:
  - New matches
  - PIN verification
  - Status updates
  - Chat messages

### 6. Beta Testing Strategy
- Controlled user group deployment
- Integrated feedback mechanisms
- Analytics-driven improvements

## Technical Architecture

### Frontend Stack
- **Core Framework**: React Native
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: 
  - NativeBase
  - React Native Paper
- **Internationalization**: i18next (English/French)
- **Real-time**: Socket.io Client

### Backend Stack
- **Server**: Node.js with Express/NestJS
- **API**: RESTful architecture
- **Real-time Protocol**: Socket.io
- **Authentication**: JWT
- **File Handling**: Multer
- **Queue Management**: Bull
- **Push Notifications**: Firebase FCM

### Data Layer
- **Primary Database**: MySQL with PlanetScale
- **ORM**: Prisma
- **Caching**: Redis
- **File Storage**: Cloudinary

### Infrastructure
- **Cloud Platform**: 
  - Render for hosting backend services
  - Vercel for hosting frontend/admin dashboard
  - PlanetScale for scalable MySQL database
- **CI/CD**: GitHub Actions
- **Containerization**: Docker

### Database Schema

#### Core Tables

1. **Users**
   - id: UUID (PK)
   - email: STRING (UNIQUE)
   - password: STRING (hashed)
   - phone: STRING
   - firstName: STRING
   - lastName: STRING
   - role: ENUM ['SENDER', 'TRAVELER', 'ADMIN']
   - isVerified: BOOLEAN
   - kycStatus: ENUM ['PENDING', 'APPROVED', 'REJECTED']
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

2. **KYC**
   - id: UUID (PK)
   - userId: UUID (FK)
   - idType: ENUM ['PASSPORT', 'NATIONAL_ID', 'DRIVERS_LICENSE']
   - idNumber: STRING
   - idFrontImage: STRING (S3 URL)
   - idBackImage: STRING (S3 URL)
   - selfieImage: STRING (S3 URL)
   - status: ENUM ['PENDING', 'APPROVED', 'REJECTED']
   - rejectionReason: STRING
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

3. **Shipments**
   - id: UUID (PK)
   - senderId: UUID (FK)
   - travelerId: UUID (FK)
   - status: ENUM ['POSTED', 'MATCHED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']
   - packageType: STRING
   - weight: DECIMAL
   - dimensions: JSONB
   - originAddress: STRING
   - destinationAddress: STRING
   - requestedPickupDate: DATE
   - requestedDeliveryDate: DATE
   - actualPickupDate: TIMESTAMP
   - actualDeliveryDate: TIMESTAMP
   - verificationPin: STRING
   - price: DECIMAL
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

4. **Trips**
   - id: UUID (PK)
   - travelerId: UUID (FK)
   - flightNumber: STRING
   - departureAirport: STRING
   - arrivalAirport: STRING
   - departureDate: TIMESTAMP
   - arrivalDate: TIMESTAMP
   - availableSpace: DECIMAL
   - status: ENUM ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

5. **Messages**
   - id: UUID (PK)
   - senderId: UUID (FK)
   - receiverId: UUID (FK)
   - shipmentId: UUID (FK)
   - content: TEXT
   - isRead: BOOLEAN
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

6. **Transactions**
   - id: UUID (PK)
   - shipmentId: UUID (FK)
   - amount: DECIMAL
   - status: ENUM ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED']
   - paymentMethod: STRING
   - paymentReference: STRING
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

7. **Reviews**
   - id: UUID (PK)
   - reviewerId: UUID (FK)
   - revieweeId: UUID (FK)
   - shipmentId: UUID (FK)
   - rating: INTEGER
   - comment: TEXT
   - createdAt: TIMESTAMP
   - updatedAt: TIMESTAMP

### Project Folder Structure

## Summary

Kizofa revolutionizes cross-border shipping by creating a secure and efficient P2P platform. By connecting package senders with travelers, we provide a sustainable solution that benefits both parties while reducing environmental impact. Our robust technical architecture ensures scalability, security, and an excellent user experience.
