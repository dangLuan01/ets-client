export interface AttemptPayload {
  exam_slug: string;
}

export interface ResumedAnswer {
  [questionId: string]: string;
}

export interface ResumedAttempt {
  id: number;
  exam_slug: string;
  status: number;
  time_spent_sec: number;
  last_viewed_question_id: number;
  answers: ResumedAnswer;
}

export interface ResumedAttemptData {
  has_active_attempt: boolean;
  attempt?: ResumedAttempt;
}

export interface ResumeApiResponse {
  data: ResumedAttemptData;
  message: string;
  status: string;
}

export interface AttemptResponse {
  title: string,
  exam_slug: string,
  exam_type: string,
  total_question: number,
  total_answer: number,
  start_time: string,
  end_time?: string,
  total_score: number,
  listening_score: number,
  reading_score: number,
  time_spent_sec: number,
  status: number
}

export interface AttemptApiResponse {
    data: {
        pagination: {
            page: number;
            limit: number;
            total_records: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        response: AttemptResponse[];
    };
    message?: string;
    status?: string;
}