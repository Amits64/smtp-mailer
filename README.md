# SMTP Mailer Service

This is a simple SMTP mailer service for sending emails using Node.js and Express.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Support](#docker-support)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- Send emails via SMTP server
- Configurable via environment variables

## Prerequisites

- Node.js
- npm
- SMTP server credentials (host, port, username, password)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smtp-mailer.git
   cd smtp-mailer

2. Install the dependencies:

   ```bash
   npm install

# Configuration

Configure the SMTP server and other settings by creating a .env file in the project root. You can copy the provided .env.example file and update it with your SMTP server credentials and other settings.
  ```bash
    SMTP_HOST=your-smtp-host
    SMTP_PORT=your-smtp-port
    SMTP_USER=your-smtp-username
    SMTP_PASS=your-smtp-password
  ```

# Usage
Start the SMTP mailer service with the following command:
  ```bash
    npm start
  ```
The service will listen on port 3000 by default, but you can customize it in your .env file.

# API Endpoints
* POST /send-mail: Send an email. You should provide the email content and recipient information in the request body.
Example Request:

  ```bash
    {
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "text": "Your email content."
  }
  ```
Example Response:

  ```bash
    {
  "message": "Email sent successfully!"
  }
  ```

# Docker Support
You can also run this service in a Docker container. A Dockerfile is provided in the repository. Build the Docker image and run the container with your custom environment variables.

Example Docker commands:
  ```bash
    docker run -itd -e DB_HOST=my-database-container -e DB_PORT=3306 -e DB_USER=admin -e DB_PASSWORD=Password1! -e SECRET_API_KEY=ad8fb3c8b78bee02ea05c05f64936cc9 -p 3000:3000 smtp-mailer
  ```

# Screenshots
![smtp-mailer-app](https://github.com/Amits64/smtp-mailer/assets/135766785/a054ff6e-e09b-4e61-b563-0dad61443b43)
![grafana-dashboard](https://github.com/Amits64/smtp-mailer/assets/135766785/01f3d01a-8d09-494c-8aa7-59445e698fd8)
![smtp-mailer-app-1](https://github.com/Amits64/smtp-mailer/assets/135766785/0eeddeca-5fa5-418a-8961-070096dba0d1)


# Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.


Please replace placeholders like `yourusername`, `your-smtp-host`, and `your-smtp-username` with your actual information. This README covers basic sections, and you can add more details or sections as needed for your project.
