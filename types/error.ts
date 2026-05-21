export interface ApiErrorResponse {
    code?: string;
    detail?: string;
    error?: string;
    errors?: Record<string, string>;
}