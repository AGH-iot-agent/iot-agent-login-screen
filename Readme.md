# IoT Agent Login Screen

## Description
IoT Agent GLogin Screen is a microservice that is responsible for displaying login screen, and login related functionallity (login / register panels)

## Features
- Login panel 
- Register panel 
- Integration with authorization service


## Requirements
- Node.js
- npm

The application runs on port 3000 by default.

## Configuration
The configuration file is located at `src/config.js`.

## Deployment
The application includes Helm charts (`Helm/values-dev.yaml`, `Helm/values-sbx.yaml`) and a Dockerfile for containerized deployments.