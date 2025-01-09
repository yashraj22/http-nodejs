const https = require('https');
const http = require('http');

const PORT = process.env.PORT || 3000;

// Create the server
http.createServer((req, res) => {
  // Extract the query URL from the request URL
  const queryUrl = req.url.slice(1); // Remove the leading '/'

  if (!queryUrl.startsWith('https://') && !queryUrl.startsWith('http://')) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Invalid URL. Please provide a valid URL in the format: /https://example.com');
    return;
  }

  const options = {
    hostname: 'r.jina.ai',
    path: queryUrl, // Replace with the query URL
    headers: {
      'Authorization': 'Bearer jina_afbc6f8b7e754d2ea499adb595ec5e7eQ3edJtHm2lCXf2GEKZZv9STuP-EZ'
    }
  };

  // Make the HTTPS request
  https.get(options, (response) => {
    let data = '';

    // Collect response data
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Respond back to the client once all data is received
    response.on('end', () => {
      res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  }).on('error', (error) => {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('An error occurred while processing the request.');
  });

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
