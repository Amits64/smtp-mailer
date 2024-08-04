# Use an official Node.js runtime as the base image
FROM node:18.19.1-bookworm-slim

# Create a non-root user and group for running the application
RUN groupadd -r nonroot && useradd -r -g nonroot nonroot

# Set environment variables for sensitive data to empty values
ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV SECRET_API_KEY=""

# Create a directory for your app and set it as the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production
RUN npm fund

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Switch to the non-root user for running the application
USER nonroot

# Define the command to run your Node.js application
CMD ["node", "app.js"]
