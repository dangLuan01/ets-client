const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https:/toeicviet.com';

export async function GET() {
  try {
    // 1. Gọi API lấy danh sách bài viết Blog từ Backend
    // Mẹo: API này nên trả về những bài viết ở trạng thái 'published' (đã xuất bản)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/client/post/sitemap`, {
      next: { revalidate: 3600 }, // Cache trong 1 giờ để giảm tải Server
    });
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    const posts = await res.json();
    // Giả sử API trả về: [{ slug: '5-meo-thi-toeic', updated_at: '2023-10-20' }, ...]

    // 2. Build cấu trúc XML cho từng bài viết
    const urlset = posts.data.map((post: any) => {
      // Tùy thuộc vào cấu trúc URL blog của bạn (VD: /blog, /tin-tuc, /bai-viet)
      const postUrl = `${BASE_URL}/bai-viet/${post.slug}`;
      const lastModDate = new Date(post.updated_at).toISOString();

      return `
        <url>
          <loc>${postUrl}</loc>
          <lastmod>${lastModDate}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    }).join('');

    // 3. Bọc trong thẻ <urlset> chuẩn sitemap
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urlset}
      </urlset>
    `;

    // 4. Trả về kết quả
    return new Response(sitemapXML.trim(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

  } catch (error) {
    console.error('Error generating sitemap-posts:', error);
    // Trả về file XML rỗng hợp lệ để Google bot không đánh lỗi sập sitemap
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
    return new Response(emptySitemap, { 
      status: 200, 
      headers: { 'Content-Type': 'application/xml' } 
    });
  }
}