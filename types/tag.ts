export interface Tag {
  name: string;
  slug: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface TagResponseData {
  pagination: Pagination;
  response: Tag[];
}

export interface TagApiResponse {
  data: TagResponseData;
  message?: string;
  status?: string;
}