import type { VercelRequest, VercelResponse } from '@vercel/node';
    
    export default async function handler(req: VercelRequest, res: VercelResponse) {
      try {
        const response = await fetch('https://mtiradio.substack.com/feed');
        const xml = await response.text();
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
        res.status(200).send(xml);
      } catch (error) {
        res.status(500).json({ error: 'Signal Lost — Vault Unreachable' });
      }
    }
