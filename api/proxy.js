// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        console.error('Proxy error: No URL provided');
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        console.log(`Proxy fetching: ${url}`);
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'RobloxUserTracker/1.0 (Vercel Proxy)',
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(data);
    } catch (error) {
        console.error(`Proxy error: ${error.message}`, error);
        res.status(500).json({ error: `Proxy failed: ${error.message}` });
    }
}

export const config = {
    api: {
        externalResolver: true
    }
};
