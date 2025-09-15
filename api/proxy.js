// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        console.error('Proxy error: No URL provided');
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        console.log(`Proxy fetching URL: ${url}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });

        console.log(`Proxy response status: ${response.status} ${response.statusText}`);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Roblox API error: ${response.status} ${response.statusText} - ${errorText}`);
            throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Proxy response data:', JSON.stringify(data, null, 2));
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error details:', {
            message: error.message,
            stack: error.stack,
            url
        });
        res.status(500).json({ error: `Proxy failed: ${error.message}` });
    }
}

export const config = {
    api: {
        externalResolver: true
    }
};
