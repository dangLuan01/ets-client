export interface ExamOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface QuestionData {
  question_id: number;
  display_number: number;
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
  exam_type: string;
  year: number;
  audio_full_url: string;
  total_time: number;
  total_question: number;
  thumbnail: string;
  skills: ExamSkill[];
}

export interface SubQuestion {
  question_id: string;
  display_number: number;
  question_text: string;
  options: ExamOption;
  correct_answer?: string;
  explanation?: string;
}

export interface QuestionGroup {
  group_id?: string;
  image_url?: string;
  transcript?: string;
  explanation?: string;
  sub_questions: SubQuestion[];
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
  attempt_id: number;
  exam_slug: string;
  answers: SubmitAnswer[];
}

export interface UserAnswerPayload {
  attempt_id: number;
  question_id: number;
  selected_answer: string;
  time_spent_sec: number;
  answer_time_sec: number;
}

export interface FeaturedExam {
    title: string;
    slug: string;
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