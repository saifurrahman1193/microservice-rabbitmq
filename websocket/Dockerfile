# Use the official Node.js image based on Alpine Linux
FROM node:16.18.1-alpine

# Set the working directory within the container
WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

EXPOSE 3000

# Command to run your Node.js application
CMD ["npm", "run", "dev"]
