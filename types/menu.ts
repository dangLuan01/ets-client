export interface Menu {
  name: string;
  slug: string | null;
  children?: Menu[];
}

export interface Pagination {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface MenuResponseData {
  pagination: Pagination;
  response: Menu[];
}

export interface ApiResponse {
  data: MenuResponseData;
  message?: string;
  status?: string;
}