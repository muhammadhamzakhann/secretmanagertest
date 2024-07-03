# Base image
FROM node:18.17.0

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Install AWS SDK (if not already installed by your package.json)
RUN yarn add aws-sdk

# Expose port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]