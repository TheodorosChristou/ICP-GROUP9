# Nginx Configuration Documentation

## Overview
This document explains the Nginx configuration for handling HTTP and HTTPS traffic, including SSL termination and redirection, for a web application hosted on an Azure VM. The configuration specifically supports Certbot for SSL certificate management.

## Full Code
```nginx
server {
    listen 80;
    server_name maritime-emergency.northeurope.cloudapp.azure.com;

    location / {
        return 301 http://maritime-emergency.northeurope.cloudapp.azure.com$request_uri;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }    
}

server {
    listen 443 ssl;
    server_name maritime-emergency.northeurope.cloudapp.azure.com;

    ssl_certificate /etc/letsencrypt/live/maritime-emergency.northeurope.cloudapp.azure.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/maritime-emergency.northeurope.cloudapp.azure.com/privkey.pem;

    location / {
    proxy_pass http://maritime-emergency.northeurope.cloudapp.azure.com:8080;
    }
}
```

## `app.conf` Breakdown

### HTTP Server Configuration
This section handles HTTP traffic, enforcing HTTPS by redirecting all HTTP requests to HTTPS.
```nginx
server {
    listen 80;
    server_name maritime-emergency.northeurope.cloudapp.azure.com;

    location / {
        return 301 http://maritime-emergency.northeurope.cloudapp.azure.com$request_uri;
    }

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }    
}
```
- **Listen**: Configures Nginx to listen on port 80 (HTTP).
- **Server Name**: Specifies the domain name for the server.
- **Location /**: Redirects all traffic from HTTP to HTTPS using a 301 redirect, which helps with SEO by indicating that the move to HTTPS is permanent.
- **Location /.well-known/acme-challenge/**: Serves files from the `/var/www/certbot` directory, facilitating the ACME challenge response for SSL certificate verification by Certbot.

### HTTPS Server Configuration
This section configures HTTPS settings, including SSL certificates and proxy settings for secure content delivery.
```nginx
server {
    listen 443 ssl;
    server_name maritime-emergency.northeurope.cloudapp.azure.com;

    ssl_certificate /etc/letsencrypt/live/maritime-emergency.northeurope.cloudapp.azure.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/maritime-emergency.northeurope.cloudapp.azure.com/privkey.pem;

    location / {
    proxy_pass http://maritime-emergency.northeurope.cloudapp.azure.com:8080;
    }
}
```
- **Listen**: Listens on port 443 and enables SSL.
- **SSL Certificate and Key**: Specifies the paths to the SSL certificate and key files, which are managed by Certbot and automatically renewed.
- **Location /**: Configures a reverse proxy to pass all HTTPS traffic to the internal service running on port 8080. This setup is crucial for applications that need to handle secure client connections while the actual application logic runs on a non-SSL capable server.
