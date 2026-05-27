const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toeicviet.com';

export async function GET() {
  try {
    // 1. Khai báo các sitemap cố định
    let sitemaps = `
      <sitemap><loc>${BASE_URL}/sitemap-pages.xml</loc></sitemap>
      <sitemap><loc>${BASE_URL}/sitemap-posts.xml</loc></sitemap>
    `;

    // 2. Gọi API đếm tổng số đề thi trong DB
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/count/sitemap`, {
      next: { revalidate: 86400 }, // Tổng số lượng chỉ cần cập nhật 1 ngày/lần là đủ
    });
    const { data } = await res.json(); // Giả sử trả về 60,000
    
    // 3. Tính toán số lượng file sitemap cần sinh ra
    const limitPerSitemap = 25000;
    const totalPages = Math.ceil(data / limitPerSitemap);
    
    // 4. Sinh vòng lặp đẩy vào XML (Sinh ra sitemap-exams-1, 2, 3...)
    for (let i = 1; i <= totalPages; i++) {
      sitemaps += `
        <sitemap>
          <loc>${BASE_URL}/sitemap-exams-${i}.xml</loc>
        </sitemap>
      `;
    }

    // 5. Build sitemap index
    const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps}
      </sitemapindex>
    `;

    return new Response(sitemapIndexXML.trim(), { headers: { 'Content-Type': 'application/xml' } });

  } catch (error) {    
    return new Response('Error', { status: 500 });
  }
}