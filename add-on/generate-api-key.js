const crypto = require('crypto');

function generateSecretApiKey(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

const secretApiKey = generateSecretApiKey(32); // Generate a 32-character random string
console.log('Generated Secret API Key:', secretApiKey);

