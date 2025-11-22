# Basic Ecommerce Application

This is a monorepo containing the source code for the Basic Ecommerce application.

## Project Structure

- **backend/**: NestJS application (Node.js + TypeScript + PostgreSQL)
- **frontend/**: Next.js application (App Router + TypeScript + Tailwind CSS + Zustand)

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database

### Setup

1.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Configure .env file (see backend/README.md)
    npm run start:dev
    ```

2.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Features

- **Backend**: REST API, TypeORM, OTP Authentication, Order Management, Email Service.
- **Frontend**: Pixel-perfect UI, Popular Products Grid, Cart Management, OTP Login.
