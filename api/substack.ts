import type { VercelRequest, VercelResponse } from '@vercel/node';
    
    const SUBSTACK_RSS = 'https://mtiradio.substack.com/feed';
    
    interface SubstackPost { title: string; link: string; pubDate: string; description: string; category: string[]; enclosure?: string; }
    
    function extractText(xml: string, tag: string): string {
      const cdataMatch = new RegExp(`<${tag}[^>]*><!\[CDATA\[([\s\S]*?)\]\]></${tag}>`, 'i').exec(xml);
      if (cdataMatch) return cdataMatch[1].trim();
      const plainMatch = new RegExp(`<${tag}[^>]*>([\s\S]*?)</${tag}>`, 'i').exec(xml);
      return plainMatch ? plainMatch[1].trim() : '';
    }
    
    function extractAll(xml: string, tag: string): string[] {
      const results: string[] = [];
      const re = new RegExp(`<${tag}[^>]*><!\[CDATA\[([\s\S]*?)\]\]></${tag}>|<${tag}[^>]*>([\s\S]*?)</${tag}>`, 'gi');
      let match;
      while ((match = re.exec(xml)) !== null) {
        results.push((match[1] || match[2]).trim());
      }
      return results;
    }
    
    function stripHtml(html: string): string {
      return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    }
    
    function parseItems(xml: string): SubstackPost[] {
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      const posts: SubstackPost[] = [];
      let match;
      while ((match = itemRegex.exec(xml)) !== null) {
        const item = match[1];
        const enclosureMatch = /enclosure[^>]+url="([^"]+)"/.exec(item);
        const rawDesc = extractText(item, 'description');
        const shortDesc = stripHtml(rawDesc).slice(0, 160) + (stripHtml(rawDesc).length > 160 ? '…' : '');
        posts.push({
          title: stripHtml(extractText(item, 'title')),
          link: extractText(item, 'link') || extractText(item, 'guid'),
          pubDate: extractText(item, 'pubDate'),
          description: shortDesc,
          category: extractAll(item, 'category'),
          enclosure: enclosureMatch ? enclosureMatch[1] : undefined,
        });
      }
      return posts;
    }
    
    export default async function handler(req: VercelRequest, res: VercelResponse) {
      try {
        const response = await fetch(SUBSTACK_RSS, {
          headers: { 'User-Agent': 'MTI-Universe/1.0' },
        });
        if (!response.ok) {
          return res.status(502).json({ error: 'Feed unavailable' });
        }
        const xml = await response.text();
        const posts = parseItems(xml);
        res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
        res.status(200).json({ posts, fetchedAt: new Date().toISOString() });
      } catch (error) {
        res.status(500).json({ error: 'Feed fetch failed' });
      }
    }
    
