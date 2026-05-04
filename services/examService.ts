// services/examService.ts
import { ExamPayload, SubmitExamPayload, FeaturedExamsApiResponse, FeaturedExamsResponse } from '@/types/exam';
import { FilterApiResponse, FilterOption } from '@/types/filter';
import apiClient from '@/utils/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

interface ApiResponse {
  data: ExamPayload;
  message?: string;
  status?: number;
}

export const examService = {
  /**
   * Lấy danh sách đề thi nổi bật (hot, new...)
   */
  async getFeaturedExams(type: string, limit: number = 1, page: number = 1): Promise<FeaturedExamsResponse | null> {
    try {
      const queryParams = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        type: type,
      });
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/featured?${queryParams.toString()}`, {
        method: 'GET',
        next: { revalidate: 900 },
      });

      if (!response.ok) {
        console.error(`Failed to fetch featured exams (${type}): ${response.statusText}`);
        return null;
      }

      const resJson: FeaturedExamsApiResponse = await response.json();

      if (!resJson || !resJson.data || !resJson.data.response) {
        console.error('Invalid API response structure for featured exams: Missing "data.response" payload');
        return null;
      }

      return resJson.data.response;
    } catch (error) {
      console.error(`Error fetching featured exams (${type}):`, error);
      return null;
    }
  },

  /**
   * Gọi API lấy chi tiết đề thi theo ID
   */
  async getExamBySlug(examSlug: string): Promise<ExamPayload | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/slug/${examSlug}/full-test`, {
        method: 'GET',
        next: {revalidate: 10},
      });

      if (!response.ok) {
        console.error(`Failed to fetch exam ${examSlug}: ${response.statusText}`);
        return null;
      }

      const resJson: ApiResponse = await response.json();
      if (!resJson || !resJson.data) {
        console.error('Invalid API response structure: Missing "data" payload');
        return null;
      }
      
      return resJson.data;
    } catch (error) {
      console.error('Error fetching exam:', error);
      return null;
    }
  },

  // Hàm nộp bài thi
  submitTest: async (payload: SubmitExamPayload) => {
    try {
      const response = await apiClient(`/api/v1/exams/calculate/score`, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error("[examService] Error submitting test:", error);
      throw error;
    }
  },

  /**
   * Lấy cấu trúc bộ lọc cho trang danh sách đề thi
   */
  async getFilterStructure(): Promise<FilterOption[] | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/filter-structure`, {
        method: 'GET',
        next: {revalidate: 900},
      });

      if (!response.ok) {
        console.error(`Failed to fetch filter structure: ${response.statusText}`);
        return null;
      }

      const resJson: FilterApiResponse = await response.json();

      if (!resJson || !resJson.data) {
        console.error('Invalid API response structure for filters: Missing "data" payload');
        return null;
      }

      return resJson.data;
    } catch (error) {
      console.error('Error fetching filter structure:', error);
      return null;
    }
  },
  /**
   * Lấy danh sách đề thi với filter
   * @param params Các tham số filter: limit, page, search, category_id
   */
  async filterExams(params: { limit?: number; page?: number; search?: string; category_id?: number[] }) {
    try {
      const query = new URLSearchParams();      
      if (params.search !== undefined) query.append('search', params.search);
      if (params.limit !== undefined) query.append('limit', String(params.limit));
      if (params.page !== undefined) query.append('page', String(params.page));
      if (params.category_id && Array.isArray(params.category_id)) {
        params.category_id.forEach(id => query.append('category_id', String(id)));
      }
      const url = `${API_BASE_URL}/api/v1/exams/filter?${query.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        next: {revalidate: 30},
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('[examService] Error filtering exams:', error);
      throw error;
    }
  },
};