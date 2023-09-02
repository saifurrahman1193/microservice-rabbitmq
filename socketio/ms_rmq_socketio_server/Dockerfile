# Use the official Node.js image based on Alpine Linux
FROM node:16.18.1-alpine

# Set the working directory within the container
WORKDIR /app

COPY . .

RUN npm install nodemon multer

RUN npm config set cache /tmp --global

EXPOSE 5000

# Command to run your Node.js application
CMD ["npm", "start"]
