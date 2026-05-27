const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https:/toeicviet.com';

export async function GET() {
  // 1. Khai báo danh sách các trang tĩnh của hệ thống
  const staticPages = [
    {
      path: '', // Trang chủ (Landing Page)
      priority: '1.0',
      changefreq: 'daily',
    },
    {
      path: '/kho-de-thi',
      priority: '0.9',
      changefreq: 'daily',
    },
    {
      path: '/bai-viet',
      priority: '0.9',
      changefreq: 'daily',
    },
    {
      path: '/dieu-khoan-su-dung',
      priority: '0.3',
      changefreq: 'yearly',
    },
    {
      path: '/chinh-sach-bao-mat',
      priority: '0.3',
      changefreq: 'yearly',
    },
    {
      path: '/lien-he',
      priority: '0.3',
      changefreq: 'yearly',
    }
  ];

  // 2. Lấy thời gian hiện tại làm lastmod mặc định cho các trang tĩnh
  // (Hoặc bạn có thể hardcode một ngày cụ thể nếu muốn kiểm soát chặt chẽ)
  const currentIsoDate = new Date().toISOString();

  // 3. Build các thẻ <url> cho file XML
  const urlset = staticPages.map((page) => `
    <url>
      <loc>${BASE_URL}${page.path}</loc>
      <lastmod>${currentIsoDate}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('');

  // 4. Bọc lại bằng thẻ <urlset> chuẩn sitemap
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlset}
    </urlset>
  `;

  // 5. Trả về file XML cho trình duyệt/bot
  return new Response(sitemapXML.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      // Cache dài hạn trên CDN/Trình duyệt vì đây là trang tĩnh (cache 1 tuần)
      'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate', 
    },
  });
}