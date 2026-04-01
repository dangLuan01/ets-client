
// services/examService.ts
import { ExamPayload, SubmitExamPayload } from '@/types/exam';
import { FilterApiResponse, FilterOption } from '@/types/filter';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.yourserver.com';

interface ApiResponse {
  data: ExamPayload;
  message?: string;
  status?: number;
}

export const examService = {
  /**
   * Gọi API lấy chi tiết đề thi theo ID
   */
  async getExamById(testId: string): Promise<ExamPayload | null> {
    try {
      // Gọi API thực tế của bạn
      // Thêm cache: 'no-store' để đảm bảo luôn lấy đề thi mới nhất, không bị cache lại
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/${testId}/full-test`, {
        method: 'POST',
        cache: 'no-store', 
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Thêm token nếu API của bạn yêu cầu auth
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch exam ${testId}: ${response.statusText}`);
        return null;
      }

    // Parse JSON từ response
      const resJson: ApiResponse = await response.json();
      // BƯỚC BÓC TÁCH: Kiểm tra xem có field 'data' không
      if (!resJson || !resJson.data) {
        console.error('Invalid API response structure: Missing "data" payload');
        return null;
      }
      
      // BƯỚC BẢO MẬT: Nếu API của bạn có trả về 'correct_answer', 
      // bạn NÊN dùng một hàm ở đây để map() qua toàn bộ mảng data 
      // và xóa trường 'correct_answer' đi trước khi return data.
      // (Giả sử API hiện tại chưa trả đáp án hoặc đã ẩn rồi thì cứ return thẳng)

      return resJson.data;
    } catch (error) {
      console.error('Error fetching exam:', error);
      return null;
    }
  },

  // Hàm nộp bài thi
  submitTest: async (payload: SubmitExamPayload) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/calculate/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Bạn có thể thêm Authorization Token ở đây sau này:
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload),
      });

      // Bắt lỗi HTTP (400, 500...)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
      
    } catch (error) {
      console.error("[examService] Error submitting test:", error);
      throw error; // Ném lỗi ra ngoài để UI Component tự xử lý hiển thị
    }
  },

  /**
   * Lấy cấu trúc bộ lọc cho trang danh sách đề thi
   */
  async getFilterStructure(): Promise<FilterOption[] | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/exams/filter-structure`, {
        method: 'GET',
        cache: 'no-store', 
        headers: {
          'Content-Type': 'application/json',
        },
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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