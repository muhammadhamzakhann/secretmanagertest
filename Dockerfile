# Use an official node image as a parent image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5000

ARG REACT_APP_AWS_ACCESS_KEY_ID
ARG REACT_APP_AWS_SECRET_ACCESS_KEY

ENV REACT_APP_AWS_ACCESS_KEY_ID $REACT_APP_AWS_ACCESS_KEY_ID
ENV REACT_APP_AWS_SECRET_ACCESS_KEY $REACT_APP_AWS_SECRET_ACCESS_KEY

# Command to run the application
CMD ["serve", "-s", "build"]