FROM node:16.18.1-alpine

# Set the working directory in the container
WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g npm@9.8.1

# Start the development server
CMD ["npm", "run", "start:docker"]