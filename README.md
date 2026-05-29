# Customer Support Portal

A modern Angular + Nx microfrontend proof of concept that simulates a customer support workspace. The project demonstrates scalable frontend architecture using standalone components, route-based access control, shared libraries, PrimeNG UI components, and Angular Signals.

## Overview

This project is built as a learning and showcase application to explore modern Angular architecture patterns commonly used in enterprise applications.

The portal represents a customer support workspace where users can log in with different roles and access features based on their permissions.

Current focus areas include:

* Nx Monorepo Architecture
* Angular Standalone Components
* Angular Signals
* Route Guards
* Role-Based Access Control (RBAC)
* PrimeNG UI Components
* Shared Libraries
* Microfrontend-Ready Structure

---

## Tech Stack

### Frontend

* Angular 20+
* TypeScript
* SCSS
* PrimeNG
* PrimeIcons

### Architecture

* Nx Monorepo
* Standalone Components
* Shared Libraries
* Route-Based Code Splitting

---

## Project Structure

```text
customer-support-portal/
│
├── shell/                # Host application
├── tickets/              # Tickets microfrontend (WIP)
├── customers/            # Customers microfrontend
├── analytics/            # Analytics microfrontend
├── admin/                # Admin microfrontend
│
├── libs/
│   └── shared/
│       ├── auth/         # Authentication & authorization
│       └── models/       # Shared types and interfaces
│
└── nx.json
```

---

## Features Implemented

### Authentication

A lightweight demo authentication flow has been implemented using Angular Signals.

Features:

* Login screen
* Session persistence
* User role selection
* Logout functionality

### Role-Based Access Control

The application supports role-based authorization.

Current roles:

* Admin
* Team Lead
* Support Agent
* Viewer

Permissions are mapped to roles through a centralized permission matrix.

Examples:

```text
ticket.read
ticket.create
ticket.update
customer.read
customer.update
analytics.view
admin.manage
```

### Route Guards

Protected routes prevent unauthorized access.

Implemented guards:

* Authentication Guard
* Guest Only Guard

Examples:

```text
/login        -> Guest only
/dashboard    -> Authenticated users
```

### Dashboard

A modern dashboard built using PrimeNG components.

Features:

* User information
* Role visibility
* Permission-based actions
* Support metrics cards
* Access scope display

### Shared Libraries

#### Shared Models Library

Contains:

* UserRole types
* PermissionScope types
* Auth interfaces
* Permission mappings

#### Shared Auth Library

Contains:

* AuthService
* PermissionService
* Route Guards
* Authorization utilities

---

## Angular Signals Usage

Authentication state is managed using Angular Signals.

Example:

```ts
readonly user = computed(() => this.sessionSignal()?.user);
```

Benefits:

* Reactive state management
* Minimal boilerplate
* Better performance
* Simplified component communication

---

## PrimeNG Integration

The project uses PrimeNG v21.

Implemented components:

* Card
* Button
* Select
* Tag
* InputText

Theme:

* Aura

---

## Running the Application

Install dependencies:

```bash
npm install
```

Start the shell application:

```bash
npx nx serve shell
```

Open:

```text
http://localhost:4200
```

---

## Future Enhancements

Planned features:

### Tickets Microfrontend

* Ticket list
* Ticket details
* Status updates
* Assignment workflow

### Customers Module

* Customer profile
* Interaction history
* Customer search

### Analytics Module

* SLA metrics
* Resolution trends
* Agent performance dashboards

### Admin Module

* User management
* Role management
* Permission administration

### AI Features

Potential additions:

* AI ticket summarization
* Suggested responses
* Customer sentiment analysis
* Agent productivity insights

---

## Learning Goals

This project was created to explore and demonstrate:

* Enterprise Angular Architecture
* Monorepo Development with Nx
* Angular Signals
* Shared Library Design
* Authentication & Authorization
* Microfrontend Architecture
* PrimeNG Integration
* Scalable Frontend Development

---

## Author

Arnab Roy Chowdhury

Senior Frontend Developer with experience in Angular, React, TypeScript, JavaScript, HTML, and CSS.
