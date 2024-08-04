module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  smtp: {
    service: process.env.SMTP_SERVICE,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
