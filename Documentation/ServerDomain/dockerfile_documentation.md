# Dockerfille Documentation

## Overview
This document outlines the Docker configuration for a Node.js based web application. The configuration is split into multiple stages to optimize the build process and manage dependencies effectively.

## Full Code
```Dockerfile
FROM node:17 as base 

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
```

## Dockerfile Breakdown

### Base Image
```Dockerfile
FROM node:17 as base 
```
- **Description**: The Dockerfile begins by specifying `node:17` as the base image. This is the official Node.js Docker image, which includes the Node.js runtime and npm package manager.
- **Stage**: Tagged as `base` to be used in subsequent stages, avoiding the need to repeat the setup.

### Working Directory
```Dockerfile
WORKDIR /
```
- **Description**: Sets the root directory as the working directory where all commands will be executed.

### Copying Package Files
```Dockerfile
COPY package.json ./
```
- **Description**: Copies the `package.json` file from your project directory into the Docker image. This file contains the project dependencies.

### Install Dependencies
```Dockerfile
RUN npm install
```
- **Description**: Runs `npm install` to install the dependencies defined in `package.json`. This is done in a separate step to leverage Docker's cache, speeding up rebuilds when dependencies don't change.

### Copy Project Files
```Dockerfile
COPY . .
```
- **Description**: Copies the rest of your project files into the Docker image. This includes all files in your project directory.

### Production Stage
```Dockerfile
FROM base as production
```
- **Description**: Starts a new build stage named `production` which uses the previously configured `base` image. This method is useful for keeping the production build separate and possibly stripping out unnecessary files or settings not needed in production.

### Environment Variables
```Dockerfile
ENV NODE_PATH=./build
```
- **Description**: Sets the `NODE_PATH` environment variable to point to the `build` directory. This environment variable is used by Node.js to determine the primary directory for executable modules.

### Build Application
```Dockerfile
RUN npm run build
```
- **Description**: Executes the build script defined in `package.json`. This typically compiles the application into JavaScript, ready for production deployment.
