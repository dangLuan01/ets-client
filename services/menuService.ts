import { ApiResponse, Menu } from '@/types/menu';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

export const menuService = {
    async getMenu(limit = 10, type = "header"): Promise<Menu[] | null> {
      try {
          const response = await fetch(`${API_BASE_URL}/api/v1/menus?limit=${limit}&type=${type}`, {
            method: 'GET',
            next: { revalidate: 300 },
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
          
          return resJson.data.response;
        } catch (error) {
          console.error('Error fetching exam:', error);
          return null;
        }
    },
}