# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock to the working directory
COPY package.json .
COPY package-lock.json .

# Install dependencies using npm
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
ENV NODE_ENV=production
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/app.js"]
