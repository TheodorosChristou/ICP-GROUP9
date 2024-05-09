# Docker Compose Documentation

## Overview
This document details the Docker Compose setup for a web application involving multiple services, including a Node.js application, Nginx for web serving and SSL termination, and Certbot for SSL certificate management.

## Full Code
```yaml
version: '3'

services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    restart: always
    volumes:
      - ./data/nginx:/etc/nginx/conf.d/:ro
      - ./data/certbot/conf:/etc/letsencrypt/:ro
      - ./data/certbot/www:/var/www/certbot/:ro
  certbot:
    image: certbot/certbot
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt/:rw
      - ./data/certbot/www:/var/www/certbot/:rw
  ts-node-docker:
    build:
      context: .
      dockerfile: Dockerfile
      target: base
    volumes:
      - ./src:/home/node/app/src
    container_name: ts-node-docker
    expose:
      - '8080'
    ports:
      - '8080:3000'
    command: npm run dev
```

## `docker-compose.yml` Breakdown

### Version
```yaml
version: '3'
```
- **Description**: Specifies the version of the Docker Compose file format. Version 3 supports Docker stack deployment features and is recommended for production environments.

### Services Configuration
The services section defines the configuration for each service involved in the application.

#### Nginx Service
```yaml
services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    restart: always
    volumes:
      - ./data/nginx:/etc/nginx/conf.d/:ro
      - ./data/certbot/conf:/etc/letsencrypt/:ro
      - ./data/certbot/www:/var/www/certbot/:ro
```
- **Image**: Uses the latest Nginx image.
- **Ports**: Maps ports 80 and 443 on the host to the container, handling HTTP and HTTPS traffic.
- **Restart**: Configured to always restart unless manually stopped, ensuring high availability.
- **Volumes**: Mounts directories for Nginx configuration and SSL certificates as read-only (`ro`), which enhances security by preventing modifications.

#### Certbot Service
```yaml
  certbot:
    image: certbot/certbot
    volumes:
      - ./data/certbot/conf:/etc/letsencrypt/:rw
      - ./data/certbot/www:/var/www/certbot/:rw
```
- **Image**: Uses the official Certbot image for handling SSL certificates.
- **Volumes**: Mounts volumes for storing Certbot configuration and webroot files with read-write access (`rw`), enabling certificate renewal and storage.

#### Node.js Application (ts-node-docker)
```yaml
  ts-node-docker:
    build:
      context: .
      dockerfile: Dockerfile
      target: base
    volumes:
      - ./src:/home/node/app/src
    container_name: ts-node-docker
    expose:
      - '8080'
    ports:
      - '8080:3000'
    command: npm run dev
```
- **Build**: Specifies that the service should build from the local Dockerfile, targeting the `base` stage. This setup is used for development.
- **Volumes**: Mounts the `src` directory to the container, allowing for live code changes without the need to rebuild the image.
- **Container Name**: Sets a specific name for easier reference.
- **Expose**: Makes port 8080 available to linked services.
- **Ports**: Maps port 8080 in the container to port 3000 on the host, typically where the Node.js application is accessed.
- **Command**: Runs the development command `npm run dev` to start the Node.js application in development mode with hot reloading.

