// Serverless function to proxy form submissions to your API
// Deploy this to Vercel/Netlify/Cloud Functions

const API_URL = 'https://api-qt7n3qu5sa-uc.a.run.app/leads';
const API_KEY = '9fc94694a9b4182ef0a238c5772e1caec4da5c84c3a469c4';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your domain: 'https://ataabak.com'
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData = req.body;

    console.log('Received lead data:', leadData);

    // Forward to your API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(leadData)
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log('Lead submitted successfully:', responseData);
      return res.status(200).json({ success: true, data: responseData });
    } else {
      console.error('API error:', responseData);
      return res.status(response.status).json({ success: false, error: responseData });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
