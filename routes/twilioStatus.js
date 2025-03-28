const express = require('express');
const router = express.Router();
const { updateSmsStatusInFilemaker } = require('../utils/filemaker');

router.post('/twilio-status', async (req, res) => {
  const {
    MessageSid,
    MessageStatus,
    To,
    From,
    ErrorCode,
    ErrorMessage
  } = req.body;

  try {
    await updateSmsStatusInFilemaker({
      messageSid: MessageSid,
      status: MessageStatus,
      error: ErrorMessage,
      errorCode: ErrorCode
    });

    res.status(200).send('Status received');
  } catch (error) {
    console.error('Error updating FileMaker:', error);
    res.status(500).send('Failed to update status');
  }
});

module.exports = router;
