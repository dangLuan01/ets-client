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