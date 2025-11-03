export interface ApiError {
  success: false;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface QueryParams extends PaginationParams {
  sort?: string;
  order?: 'asc' | 'desc';
  [key: string]: string | number | undefined;
}
