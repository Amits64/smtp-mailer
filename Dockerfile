# Dockerfile
FROM node:14

# Set environment variables for sensitive data
ENV DB_HOST my-database-container
ENV DB_PORT 3306
ENV DB_USER admin
ENV DB_PASSWORD Password1!
ENV SECRET_API_KEY ad8fb3c8b78bee02ea05c05f64936cc9 

# Create a directory for your app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Define the command to run your Node.js application
CMD ["node", "app.js"]

