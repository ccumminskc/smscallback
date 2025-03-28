const express = require('express');
const bodyParser = require('body-parser');
const twilioStatus = require('./routes/twilioStatus');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', twilioStatus);

app.listen(port, () => {
  console.log(`Webhook server listening on port ${port}`);
});

