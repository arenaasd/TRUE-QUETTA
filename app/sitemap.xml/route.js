import { promises as fs } from 'fs'
import path from 'path'

// helper to escape XML special characters
const escapeXml = (unsafe) =>
    unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;'
            case '>': return '&gt;'
            case '&': return '&amp;'
            case '"': return '&quot;'
            case "'": return '&apos;'
        }
    })

export async function GET() {
    const baseUrl = "https://truequetta.com"
    const sitemapEntries = []

    // 1. Homepage
    sitemapEntries.push({
        loc: `${baseUrl}`,
        lastmod: new Date().toISOString()
    })

    // contact page
    sitemapEntries.push({
        loc: `${baseUrl}/contact`,
        lastmod: new Date().toISOString()
    })

    // 2. Category + Place pages
    const categoriesDir = path.join(process.cwd(), 'data', 'categories')
    const categoryFiles = await fs.readdir(categoriesDir)

    for (const fileName of categoryFiles) {
        if (!fileName.endsWith('.json')) continue
        const categoryName = fileName.replace('.json', '')
        const categoryUrl = `${baseUrl}/category/${categoryName}`

        // category page
        sitemapEntries.push({
            loc: categoryUrl,
            lastmod: new Date().toISOString()
        })

        // places in category
        const fileContent = await fs.readFile(path.join(categoriesDir, fileName), 'utf-8')
        const places = JSON.parse(fileContent)

        for (const place of places) {
            const placeSlug = place.name.toLowerCase().replace(/\s+/g, '-')
            sitemapEntries.push({
                loc: `${categoryUrl}/${placeSlug}`,
                lastmod: new Date().toISOString()
            })
        }
    }

    // 3. Build XML string
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `
  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
  </url>
`).join('')}
</urlset>`

    return new Response(sitemapXml, {
        headers: {
            'Content-Type': 'application/xml'
        }
    })
}
