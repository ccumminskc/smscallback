router.post('/twilio-status', async (req, res) => {
  const {
    MessageSid,
    MessageStatus,
    To,
    From,
    ErrorCode,
    ErrorMessage
  } = req.body;

  console.log('📦 Twilio Webhook Received:', {
    sid: MessageSid,
    status: MessageStatus,
    to: To,
    from: From,
    errorCode: ErrorCode,
    errorMessage: ErrorMessage
  });

  try {
    await updateSmsStatusInFilemaker({
      messageSid: MessageSid,
      status: MessageStatus,
      error: ErrorMessage,
      errorCode: ErrorCode
    });

    res.status(200).send('Status received');
  } catch (error) {
    console.error('❌ Error updating FileMaker:', error);
    res.status(500).send('Failed to update status');
  }
});
