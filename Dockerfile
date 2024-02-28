# Use an official Node.js runtime as the base image
FROM node:18.19.1

# Create a non-root user and group for running the application
RUN groupadd -g 1001 nonroot && useradd -u 1001 -g nonroot -m nonroot

# Set environment variables for sensitive data to empty values
ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV SECRET_API_KEY=""

# Create a directory for your app and set it as the working directory
WORKDIR /usr/src/app

# Copy specific files and directories required for the image to run
COPY package.json .
COPY package-lock.json .
COPY app.js .

# Install app dependencies as the non-root user
RUN npm install

# Expose the port your app will run on
EXPOSE 3000

# Switch to the non-root user for running the application
USER nonroot

# Define the command to run your Node.js application
CMD ["node", "app.js"]
