const axios = require('axios');
const { getFilemakerToken } = require('./auth');

async function updateSmsStatusInFilemaker({ messageSid, status, error, errorCode }) {
  const token = await getFilemakerToken();

  const scriptName = encodeURIComponent('Update SMS Status');
  const layoutName = encodeURIComponent('Text Messages');
  const database = encodeURIComponent(process.env.FILEMAKER_DATABASE);

  const scriptParam = encodeURIComponent(JSON.stringify({
    messageSid,
    status,
    error,
    errorCode
  }));

  const url = `${process.env.FILEMAKER_SERVER_URL}/fmi/data/v1/databases/${database}/layouts/${layoutName}/script/${scriptName}?script.param=${scriptParam}`;

  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  return response.data;
}

module.exports = { updateSmsStatusInFilemaker };
