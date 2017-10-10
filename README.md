# fcc-taipei-X
Free Code Camp Taipei - For practice


View the [Live Demo](https://alphameet.herokuapp.com/)
-------------------------------------------------------------------

The code for the demo is [here](https://github.com/joyfeel/fcc-taipei-X).

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

$ npm install
$ mongod --dbpath ~/data/db/ # Open another terminal, and launch mongodb
```

Development Mode
----------------

```shell
$ npm start  # Start the app, node server is listening on port 3000
```
[http://localhost:3000](http://localhost:3000)

Configuration
-------------

In order to sending an authentication/verification email (by Google SMTP server) for users. You need to change some email and password fields in `server/config/env/mail.js` file.

```javascript
// mail.js
export default {
  gmail: {
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
  },
  sendgrid: {
    sendgridSender: process.env.SENDGRID_USERNAME,
    apiKey: process.env.SENDGRID_API_KEY,
  },
  mailTemplate: {
    subject: 'Please comfirm your email address',
  },
}
```

Production Mode (Under construction)
----------------

```shell
$ npm run build  # Build to dist/
$ git add -A && git commit -m 'Update heroku'
$ git push heroku master
$ heroku open
$ heroku logs  # Check building status
```



License
-------

MIT
