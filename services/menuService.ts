import { ApiResponse, Menu } from '@/types/menu';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

export const menuService = {
    async getMenu(limit = 10, type = "header"): Promise<Menu[] | null> {
      try {
          // Gọi API thực tế của bạn
          // Thêm cache: 'no-store' để đảm bảo luôn lấy đề thi mới nhất, không bị cache lại
          const response = await fetch(`${API_BASE_URL}/api/v1/menus?limit=${limit}&type=${type}`, {
            method: 'GET',
            next: { revalidate: 300 },
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            return null;
          }
    
        // Parse JSON từ response
          const resJson: ApiResponse = await response.json();
          // BƯỚC BÓC TÁCH: Kiểm tra xem có field 'data' không
          if (!resJson || !resJson.data.response) {
            console.error('Invalid API response structure: Missing "data" payload');
            return null;
          }
          
          // BƯỚC BẢO MẬT: Nếu API của bạn có trả về 'correct_answer', 
          // bạn NÊN dùng một hàm ở đây để map() qua toàn bộ mảng data 
          // và xóa trường 'correct_answer' đi trước khi return data.
          // (Giả sử API hiện tại chưa trả đáp án hoặc đã ẩn rồi thì cứ return thẳng)
    
          return resJson.data.response;
        } catch (error) {
          console.error('Error fetching exam:', error);
          return null;
        }
    },
}