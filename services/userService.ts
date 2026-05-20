import { ApiErrorResponse } from "@/types/error";
import { UpdatePasswordData, UpdateUserData, UserDetailResponse } from "@/types/user";
import apiClient from "@/utils/apiClient";

export const getUserDetail = async (): Promise<UserDetailResponse> => {
    const response = await apiClient('/api/v1/user/info', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Đã có lỗi xảy ra.');
    }
  
    return response.json();
};

export const updateUser = async (data: UpdateUserData): Promise<any> => {
    const response = await apiClient('/api/v1/user/update', {
        method: 'PUT',
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw errorData;
    }

    return;
}

export const updatePassword = async (data: UpdatePasswordData): Promise<any> => {
    const response = await apiClient('/api/v1/user/update-password', {
        method: 'PATCH',
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw errorData;
    }

    return;
}