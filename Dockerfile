# Use an official Node.js runtime as the base image
FROM node:14

# Create a non-root user and group for running the application
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot

# Set environment variables for sensitive data
ENV DB_HOST=my-database-container
ENV DB_PORT=3306
ENV DB_USER=admin
ENV DB_PASSWORD=Password1!
ENV SECRET_API_KEY=ad8fb3c8b78bee02ea05c05f64936cc9

# Create a directory for your app and set it as the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies as the non-root user
RUN npm install

# Bundle app source
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Switch to the non-root user for running the application
USER nonroot

# Define the command to run your Node.js application
CMD ["node", "app.js"]
