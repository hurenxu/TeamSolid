const crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc', 'password');
var crypted = cipher.update('aaa', 'utf-8', 'hex');
crypted += cipher.final('hex');

// Imports the Google APIs client library
console.log(crypted)

var decipher = crypto.createDecipher('aes-256-cbc', 'password');
var decrypted = decipher.update(crypted, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');
console.log(decrypted);