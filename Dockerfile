# Use the official Node.js 14.x base image
FROM node:14

# Install SSH client
RUN apt-get update && apt-get install -y openssh-client

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy the private key file to the container
COPY ssh_private_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

COPY known_hosts /root/.ssh/known_hosts
RUN chmod 600 /root/.ssh/known_hosts

# Expose port 4000 for the Nest app
EXPOSE 4000

# Start the SSH tunnel and the Nest app
CMD ssh -f -N -L 3311:skytechcontrol-mysql-development.mysql.database.azure.com:3306 -i /root/.ssh/id_rsa jetmir@4.235.113.59 && npm run start:dev
