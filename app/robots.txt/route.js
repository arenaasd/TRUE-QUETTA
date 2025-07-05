export function GET() {
  return new Response(`User-agent: *
Allow: /
Sitemap: https://truequetta.com/sitemap.xml
`, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
