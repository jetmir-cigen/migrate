# Use the official Node.js image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app/builder

COPY . .

RUN npm i
