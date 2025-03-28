const express = require('express');
const bodyParser = require('body-parser');
const { updateSmsStatusInFilemaker } = require('./utils/filemaker');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/twilio-status', async (req, res) => {
  const {
    MessageSid,
    MessageStatus,
    ErrorCode,
    ErrorMessage
  } = req.body;

  console.log('📦 Twilio Status Callback Received:');
  console.log(req.body);

  try {
    await updateSmsStatusInFilemaker({
      messageSid: MessageSid,
      status: MessageStatus,
      error: ErrorMessage,
      errorCode: ErrorCode
    });

    res.status(200).send('OK');
  } catch (error) {
    console.error('❌ Error sending to FileMaker:', error.response?.data || error.message);
    res.status(500).send('Failed to update status in FileMaker');
  }
});

// Catch-all fallback for unexpected POST routes
app.post('*', (req, res) => {
  console.log('🚨 Caught unexpected POST path:');
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  res.status(404).send('Not Found');
});

app.listen(port, () => {
  console.log(`🚀 Webhook server listening on port ${port}`);
});
