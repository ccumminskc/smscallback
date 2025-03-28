const axios = require('axios');

async function updateSmsStatusInFilemaker({ messageSid, status, error, errorCode }) {
  const url = `${process.env.FILEMAKER_SERVER_URL}/fmi/data/v1/databases/${process.env.FILEMAKER_DATABASE}/sessions`;

  const scriptParam = JSON.stringify({
    messageSid,
    status,
    error,
    errorCode
  });

  const response = await axios.post(url, {
    script: 'Update SMS Status',
    scriptParam: scriptParam
  }, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.FILEMAKER_USERNAME}:${process.env.FILEMAKER_PASSWORD}`).toString('base64')}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = { updateSmsStatusInFilemaker };
