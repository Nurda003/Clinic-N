
# Dental Services Application - MERN Stack

Welcome to the Dental Services Application, a comprehensive solution for managing dental clinics and appointments. This application is built using the MongoDB, ExpressJS, ReactJS, and NodeJS (MERN Stack), providing a modern and efficient platform for dental professionals and patients.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Project Structure](#project-structure)
  - [Client](#client)
  - [Server](#server)
- [Authors](#authors)

## Introduction

The Dental Services Application is designed to streamline the management of dental clinics, appointments, patient records, and more. It offers a user-friendly interface for both dental professionals and patients, ensuring smooth operations and enhanced patient experience.

## Getting Started

These instructions will guide you through setting up and running the Dental Services Application on your local machine for development and testing purposes.

### Prerequisites

Before starting, ensure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) - JavaScript runtime environment
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) - Package managers for Node.js

### Installation

1. Clone the repository:

   ```bash
   $ git clone https://github.com/your_username/dental-services.git
   $ cd dental-services
   ```

2. Install server dependencies:

   ```bash
   $ cd server
   $ npm install
   ```

3. Install client dependencies:

   ```bash
   $ cd ../ds/client
   $ npm install
   ```

### Running Locally

To start the server:

```bash
$ cd ../server
$ npm start
```

To start the client (React application) simultaneously:

```bash
$ cd ../ds/client
$ npm start
```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

## Project Structure

The Dental Services Application is structured into the following main directories:

### Client

The `ds/client` directory contains all frontend components, layouts, pages, styles, and assets.

- `src`: Core frontend code.
  - `comps`: Reusable UI components.
  - `redux`: Redux files and components.
  - `pages`: Pages for different routes.
  - `img`: Images and other static assets.

### Server

The `server` directory encompasses all backend code handling requests and interactions with the MongoDB database.

- `controllers`: Logic for handling client requests.
- `middleware`: Middleware functions for data validation and handling.
- `models`: MongoDB schema definitions.
- `routes`: API endpoints definition.
- `.env`: Environment variables (e.g., database URL, secret keys).

Before running the server, ensure to set up the required environment variables in the `.env` file.

## Authors

The Dental Services Application is developed by the following authors:

- Kalmakhambet Nurdaulet (200103217)
- Akhmetkazy Nurdaulet (200103370)
- Nygmetkaliev Nurlan (200103217)


For any inquiries or issues, please contact [200103217@stu.sdu.edu.is](mailto:200103217@stu.sdu.edu.is).

