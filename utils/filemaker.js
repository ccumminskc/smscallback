const axios = require('axios');
const { getFilemakerToken } = require('./auth');

async function updateSmsStatusInFilemaker({ messageSid, status, error, errorCode }) {
  const token = await getFilemakerToken();

  const scriptParam = JSON.stringify({
    messageSid,
    status,
    error,
    errorCode
  });

  const url = `${process.env.FILEMAKER_SERVER_URL}/fmi/data/v1/databases/${process.env.FILEMAKER_DATABASE}/layouts/Text%20Messages/script`;

  const response = await axios.post(url, {}, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'FM-Data-API-Version': 'v1',
      'script': 'Update SMS Status',
      'script.param': scriptParam
    }
  });

  return response.data;
}

module.exports = { updateSmsStatusInFilemaker };
