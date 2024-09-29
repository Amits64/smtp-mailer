# Stage 1: Build Stage
FROM node:18.20.2-bookworm-slim AS build

# Set environment variables for sensitive data to empty values
ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV SECRET_API_KEY=""
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

# Create a directory for your app and set it as the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Run npm fund
RUN npm fund

# Stage 2: Production Stage
FROM node:18.20.2-bookworm-slim

# Create a non-root user and group for running the application
RUN groupadd -r nonroot && useradd -r -g nonroot nonroot

# Set environment variables for sensitive data to empty values
ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_USER=""
ENV DB_PASSWORD=""
ENV SECRET_API_KEY=""
ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

# Create a directory for your app and set it as the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app /usr/src/app

# Expose the port your app will run on
EXPOSE 3000

# Add a health check to ensure the container is running properly
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/ || exit 1

# Switch to the non-root user for running the application
USER nonroot

# Define the command to run your Node.js application
CMD ["node", "app.js"]
