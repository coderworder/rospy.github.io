// api/proxy.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;

    if (!url) {
        console.error('Proxy error: No URL provided');
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        console.log(`Proxy fetching: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(data);
    } catch (error) {
        console.error(`Proxy error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
