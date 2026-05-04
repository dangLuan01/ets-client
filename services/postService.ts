import { PostApiResponse, Post, PostDetailResponse, PostResponseData } from '@/types/post';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

export const postService = {
    async getPost(limit = 10, page = 1, orderBy = "updated_at", name: string): Promise<PostResponseData | null> {
      try {
          const response = await fetch(`${API_BASE_URL}/api/v1/client/post/get-all?limit=${limit}&page=${page}&name=${name}&order_by=${orderBy}`, {
            method: 'GET',
            next: { revalidate: 300 },
          });
    
          if (!response.ok) {
            return null;
          }
    
        // Parse JSON từ response
          const resJson: PostApiResponse = await response.json();
          // BƯỚC BÓC TÁCH: Kiểm tra xem có field 'data' không
          if (!resJson || !resJson.data) {
            return null;
          }

          return resJson.data;
        } catch (error) {
          return null;
        }
    },

    async getPostDetail(slug: string): Promise<Post | null> {
      try {
          const response = await fetch(`${API_BASE_URL}/api/v1/client/post/${slug}`, {
            method: 'GET',
            next: { revalidate: 300 },
          });
    
          if (!response.ok) {
            return null;
          }
    
          const resJson: PostDetailResponse = await response.json();

          if (!resJson || !resJson.data) {
            return null;
          }

          return resJson.data;
        } catch (error) {
          return null;
        }
    },

    async getPostByTag(limit = 10, page = 1, slug: string): Promise<PostResponseData | null> {
      try {
          const response = await fetch(`${API_BASE_URL}/api/v1/client/post/tag/${slug}?limit=${limit}&page=${page}`, {
            method: 'GET',
            next: { revalidate: 300 },
          });
    
          if (!response.ok) {
            return null;
          }
    
        // Parse JSON từ response
          const resJson: PostApiResponse = await response.json();
          // BƯỚC BÓC TÁCH: Kiểm tra xem có field 'data' không
          if (!resJson || !resJson.data) {
            return null;
          }

          return resJson.data;
        } catch (error) {
          return null;
        }
    },
}