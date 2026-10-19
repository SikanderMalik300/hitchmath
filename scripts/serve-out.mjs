// Minimal static server for the exported site (trailing-slash -> index.html).
// Gzips text assets and sets cache headers so local Lighthouse reflects a CDN.
import http from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = path.resolve('out');
const PORT = Number(process.argv[2] || 4178);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
};
const COMPRESSIBLE = new Set([
  'text/html; charset=utf-8',
  'text/javascript',
  'text/css',
  'application/json',
  'image/svg+xml',
  'application/manifest+json',
  'text/plain; charset=utf-8',
  'application/xml',
]);

const server = http.createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(ROOT, p);
    try {
      const st = await fs.stat(file);
      if (st.isDirectory()) file = path.join(file, 'index.html');
    } catch {
      if (!path.extname(file)) {
        try {
          await fs.stat(file + '.html');
          file = file + '.html';
        } catch {
          file = path.join(ROOT, '404.html');
        }
      }
    }
    let buf = await fs.readFile(file);
    const type = TYPES[path.extname(file)] || 'application/octet-stream';
    const headers = { 'content-type': type };
    if (p.startsWith('/_next/static/') || p.startsWith('/images/')) {
      headers['cache-control'] = 'public, max-age=31536000, immutable';
    }
    const acceptsGzip = (req.headers['accept-encoding'] || '').includes('gzip');
    if (acceptsGzip && COMPRESSIBLE.has(type)) {
      buf = zlib.gzipSync(buf, { level: 9 });
      headers['content-encoding'] = 'gzip';
    }
    res.writeHead(200, headers);
    res.end(buf);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.end('<h1>404</h1>');
  }
});
server.listen(PORT, () => console.log(`serving out/ on http://localhost:${PORT}`));
