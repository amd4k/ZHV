# Zah Luxury Jewelry E-commerce Platform

## Overview

Zah is a modern luxury jewelry e-commerce platform built with a full-stack TypeScript architecture. The application features a React-based frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration. The platform is designed to showcase and sell premium jewelry through multiple channels including direct sales and external marketplace integrations (Amazon, Flipkart, Myntra, Meesho).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system for luxury aesthetics
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Design System**: Custom luxury jewelry brand styling with frosted glass effects, elegant typography, and premium color schemes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured route handlers
- **Database Integration**: Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **Development**: Hot reload with Vite integration for full-stack development

### Data Storage Architecture
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM with schema-first approach
- **Schema Design**: 
  - Users table with admin role support
  - Categories with gender-based classification (men/women/unisex)
  - Products with comprehensive jewelry metadata (material, weight, SKU)
  - Platform links for multi-channel sales support
  - Image storage via JSON arrays for product galleries

### Authentication & Authorization
- **User System**: Basic username/password authentication
- **Admin Access**: Role-based access control with admin dashboard at `/admin-zah-dashboard`
- **Session Management**: Server-side sessions with PostgreSQL storage

### Product Management System
- **Multi-Channel Support**: Integration points for Amazon, Flipkart, Myntra, Meesho, and direct sales
- **Inventory Management**: Stock quantity tracking with out-of-stock handling
- **Image Handling**: Multiple product images with carousel support
- **SEO Optimization**: Comprehensive meta tags, schema markup, and Open Graph integration

## External Dependencies

### Core Technologies
- **Database**: Neon PostgreSQL serverless database
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **UI Components**: Radix UI primitives via shadcn/ui
- **Styling**: Tailwind CSS with PostCSS

### Development Tools
- **Build System**: Vite for frontend, esbuild for backend bundling
- **Runtime**: tsx for development TypeScript execution
- **Development Experience**: Replit-specific plugins for cartographer and error overlay

### External Integrations (Planned)
- **E-commerce Platforms**: Amazon, Flipkart, Myntra, Meesho APIs for stock synchronization
- **Payment Processing**: Payment gateway integration for direct sales
- **Image Hosting**: External image storage service for product photos
- **Email Services**: Newsletter subscription and customer communication
- **Social Media**: Instagram, Facebook, Twitter, WhatsApp, YouTube integration

### Deployment Infrastructure
- **Database**: Neon PostgreSQL with connection pooling
- **Environment**: Production-ready configuration with environment variables
- **Asset Optimization**: Vite-based build optimization for production deployment