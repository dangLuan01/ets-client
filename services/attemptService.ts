import { AttemptApiResponse, AttemptResponse } from "@/types/attempt";
import apiClient from "@/utils/apiClient";

export const attemptService = {
      async getAttempts(status?: string, limit: number = 1, page: number = 1): Promise<AttemptApiResponse['data'] | null> {
        try {
          const queryParams = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            status: String(status),
          });
          
          const response = await apiClient(`/api/v1/user/attempt?${queryParams.toString()}`, {
            method: 'GET',
          });
    
          if (!response.ok) {
            console.error(`Failed to fetch attempt: ${response.statusText}`);
            return null;
          }
    
          const resJson: AttemptApiResponse = await response.json();
    
          if (!resJson || !resJson.data) {
            console.error('Invalid API response structure for: Missing "data" payload');
            return null;
          }
    
          return resJson.data;
        } catch (error) {
          console.error(`Error fetching attempt:`, error);
          return null;
        }  
    },
}