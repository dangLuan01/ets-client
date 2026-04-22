import { Tag, TagApiResponse } from '@/types/tag';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

export const tagService = {
    async getTag(limit = 20, page = 1): Promise<Tag[] | null> {
      try {
          // Gọi API thực tế của bạn
          const response = await fetch(`${API_BASE_URL}/api/v1/client/tag/get-all?limit=${limit}&page=${page}`, {
            method: 'GET',
            next: { revalidate: 5 },
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            return null;
          }
    
        // Parse JSON từ response
          const resJson: TagApiResponse = await response.json();
          if (!resJson || !resJson.data.response) {
            return null;
          }

          return resJson.data.response;
        } catch (error) {
          return null;
        }
    },
}