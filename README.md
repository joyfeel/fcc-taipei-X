# fcc-taipei-X
Free Code Camp Taipei - For practice

Prerequisites
-------------

- [Node.js](http://nodejs.org)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

Installation
------------

```shell
$ git clone https://github.com/joyfeel/fcc-taipei-X
$ cd fcc-taipei-X/

# Install NPM dependencies
$ npm install

# Open another terminal, and launch mongodb
$ mongod --dbpath ~/data/db/

# Start the app
$ npm start

# Node server is listening on port 3000
# View your site at "http://localhost:3000"
```

Configuration
-------------

In order to sending an authentication/verification email (by Google SMTP server) for users. You need to change some email and password fields in `server/config/env/mail.js` file.

```javascript
// mail.js
export default {
  gmailSender: process.env.GMAIL_USERNAME,  // Here!
  gmailConfig: {
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,     // Here!
      pass: process.env.GMAIL_PASSWORD,     // Here!
    },
    logger: true,
    debug: true,
  },
  registerMailTemplate: {
    subject: 'Hello subject',
    text: 'Click here to activate your account: http://www.google.com.tw', // plaintext body
    html: '<h1><a href="www.google.com.tw">Click here to activate your account</a></h1>',
  },
}
```



License
-------

MIT
