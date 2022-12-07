FROM node:16.14.0

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY dist ./
