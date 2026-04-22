import { Tag } from "./tag";

export interface Post {
  name: string;
  slug: string;
  summary: string;
  content?: string;
  thumbnail_url: string;
  view_count: number;
  updated_at: string;
  tags: Tag[];
}

export interface Pagination {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PostResponseData {
  pagination: Pagination;
  response: Post[];
}

export interface PostApiResponse {
  data: PostResponseData;
  message?: string;
  status?: string;
}

export interface PostDetailResponse {
  data: Post;
  message?: string;
  status?: string;
}