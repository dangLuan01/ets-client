export interface FilterOption {
  id: number;
  name: string;
  type: string;
  children?: FilterOption[];
}

export interface FilterApiResponse {
  data: FilterOption[];
  message?: string;
  status?: string;
}
