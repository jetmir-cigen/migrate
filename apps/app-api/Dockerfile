# Use the official Node.js image as the base
FROM skytech-monorepo:nx-base AS builder

# Set the working directory
WORKDIR /app/builder

RUN npx nx build app-api

# Expose the port your app runs on
EXPOSE 4000

# Start the app
CMD ["node", "./dist/apps/app-api/main.js"]

