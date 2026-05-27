// app/sitemap-exams.xml/route.ts
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https:/toeicviet.com';

export async function GET(
  request: Request,
  // { params }: { params: { page: string } }
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    //const page = parseInt(params.page, 10) || 1;
    const limit = 1000;
    // 1. Gọi API lấy danh sách đề thi từ Backend
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/exams/sitemap?page=${page}&limit=${limit}`, {
      next: { revalidate: 3600 }, // Cập nhật mỗi giờ
    });
    const exams = await res.json();
    
    
    if (!exams || exams.length === 0) {
      //return new Response('Not Found', { status: 404 });
    }
    // 2. Build cấu trúc XML cho từng đề thi và trang giải thích
    const urlset = exams.data.map((exam: any) => {
      // Vì đã chốt thêm root /de-thi/ vào cấu trúc
      let examType: string;
      switch (exam.exam_type) {
        case "FULL":
          examType = "full-test"
          break;
        case "MINI":
          examType = "mini-test"
          break;
        default:
          examType = "luyen-tap-part"
          break;
      }

      const testUrl = `${BASE_URL}/de-thi/${exam.cert_slug}/${examType}/${exam.slug}`;
      const explanationUrl = `${testUrl}/giai-chi-tiet`;
      
      const lastModDate = new Date(exam.updated_at).toISOString();

      return `
        <url>
          <loc>${testUrl}</loc>
          <lastmod>${lastModDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${explanationUrl}</loc>
          <lastmod>${lastModDate}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority> 
        </url>
      `;
    }).join('');

    // 3. Bọc trong thẻ <urlset> chuẩn của Google
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urlset}
      </urlset>
    `;

    return new Response(sitemapXML.trim(), {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

  } catch (error) {
    return new Response('Error generating sitemap', { status: 500 });
  }
}