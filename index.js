const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/twilio-status', (req, res) => {
  console.log('📦 Incoming Twilio delivery status:');
  console.log(req.body); // This will appear in Railway deploy logs

  res.status(200).send('Received!');
});

app.listen(port, () => {
  console.log(`🚀 Webhook server listening on port ${port}`);
});
