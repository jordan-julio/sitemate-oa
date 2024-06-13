# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Make port available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Run the application when the container launches
CMD ["node", "index.js"]