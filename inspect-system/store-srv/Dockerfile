# OS: alpine linux
# Node.js: 20.x.x
FROM node:20-alpine

# Create app directory
WORKDIR /app

COPY ./package*.json ./
RUN npm install

# Listen port
EXPOSE 2000