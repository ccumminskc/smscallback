const axios = require('axios');
const { getFilemakerToken } = require('./auth');

async function updateSmsStatusInFilemaker({ messageSid, status, error, errorCode }) {
  const token = await getFilemakerToken();

  const scriptPayload = {
    script: 'Update SMS Status',
    scriptParam: JSON.stringify({
      messageSid,
      status,
      error,
      errorCode
    })
  };

  const url = `${process.env.FILEMAKER_SERVER_URL}/fmi/data/v1/databases/${process.env.FILEMAKER_DATABASE}/scripts`;

  const response = await axios.post(
    url,
    scriptPayload,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  );

  return response.data;
}

module.exports = { updateSmsStatusInFilemaker };
