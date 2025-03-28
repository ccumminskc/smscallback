const axios = require('axios');

async function updateSmsStatusInFilemaker({ messageSid, status, error, errorCode }) {
  const scriptPayload = {
    script: 'Update SMS Status',
    scriptParam: JSON.stringify({
      messageSid,
      status,
      error,
      errorCode
    })
  };

  const response = await axios.post(
    process.env.FILEMAKER_SCRIPT_URL,
    scriptPayload,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FILEMAKER_API_TOKEN}`
      }
    }
  );

  return response.data;
}

module.exports = { updateSmsStatusInFilemaker };
