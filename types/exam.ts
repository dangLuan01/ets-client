export interface ExamOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuestionData {
  question_id: number;
  question_text?: string;
  image_url?: string;
  correct_answer: string;
  audio_start_ms?: number;
  audio_end_ms?: number;
  options: ExamOption;
  explanation?: string;
  transcript?: string;
}

export interface SingleItem {
  order_index: number;
  entity_type: "SINGLE";
  question_data: QuestionData;
}

// Lược bớt định nghĩa GroupItem (Part 3, 4, 6, 7) ở bước này cho gọn
export type ExamItem = SingleItem | any; 

export interface ExamPayload {
  exam_id: number;
  title: string;
  year: number;
  audio_full_url: string;
  total_time: number;
  total_question: number;
  skills: ExamSkill[];
}

export interface DirectionExample {
  explanation: string;
  image_url: string;
  correct_option: string;
  audio_start_ms: number;
  audio_end_ms: number;
}

export interface SectionDirection {
  text: string;
  audio_start_ms: number;
  audio_end_ms: number;
  example?: DirectionExample;
}

export interface AnswerData {
  option: string;
  displayNumber: number;
}

export interface ExamPart {
  part_number: number;
  part_name: string;
  direction?: SectionDirection;
  items: ExamItem[];
}

export interface ExamSkill {
  skill_code: string;
  skill_name: string;
  parts: ExamPart[];
}

export interface SubmitAnswer {
  question_id: number;
  selected_answer: string;
}

export interface SubmitExamPayload {
  exam_id: number;
  answers: SubmitAnswer[];
}

export interface FeaturedExam {
    id: number;
    title: string;
    year: number;
    total_time: number;
    total_question: number;
    thumbnail: string | null;
}

export interface FeaturedExamsResponse {
    name: string;
    type: string;
    description: string;
    exams: FeaturedExam[];
}

export interface FeaturedExamsApiResponse {
    data: {
        pagination: {
            page: number;
            limit: number;
            total_records: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        response: FeaturedExamsResponse;
    };
    message?: string;
    status?: string;
}