// services/examService.ts
import { ExamPayload } from '@/types/exam';

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
  }
};