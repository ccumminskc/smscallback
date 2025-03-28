const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Catch Twilio delivery status callbacks
app.post('/twilio-status', (req, res) => {
  console.log('📦 Incoming Twilio delivery status:');
  console.log(req.body);

  res.status(200).send('Received!');
});

app.listen(port, () => {
  console.log(`🚀 Webhook server listening on port ${port}`);
});
