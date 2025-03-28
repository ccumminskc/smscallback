const axios = require('axios');

let cachedToken = null;
let tokenExpiration = null;

async function getFilemakerToken() {
  const now = Date.now();

  if (cachedToken && tokenExpiration && now < tokenExpiration) {
    console.log('🔄 Reusing cached FileMaker token');
    return cachedToken;
  }

  const url = `${process.env.FILEMAKER_SERVER_URL}/fmi/data/v1/databases/${process.env.FILEMAKER_DATABASE}/sessions`;

  console.log(`🎯 Requesting new FileMaker token from: ${url}`);

  try {
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.FILEMAKER_USERNAME}:${process.env.FILEMAKER_PASSWORD}`).toString('base64')}`,
        'Content-Type': 'application/json',
      }
    });

    const token = response.data?.response?.token;

    if (!token) {
      throw new Error('Token not returned in FileMaker response');
    }

    console.log('✅ FileMaker token acquired:', token);

    cachedToken = token;
    tokenExpiration = now + 14 * 60 * 1000; // 14-minute expiration buffer

    return token;
  } catch (error) {
    console.error('❌ Failed to get FileMaker token:', error.response?.data || error.message);
    throw new Error('Unable to authenticate with FileMaker');
  }
}

module.exports = { getFilemakerToken };
