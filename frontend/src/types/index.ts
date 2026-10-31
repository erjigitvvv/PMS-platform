export type UserRole = 'ADMIN' | 'OTM_STAFF' | 'TEACHER' | 'MENTOR' | 'STUDENT';

export interface User {
  id: string;
  username: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  telegram_chat_id?: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  role: UserRole;
  user_id: string;
  full_name: string;
}

export interface Company {
  id: string;
  name: string;
  tin_stir?: string;
  address?: string;
  director_name?: string;
  contact_phone?: string;
  email?: string;
  is_partner: boolean;
}

export interface Vacancy {
  id: string;
  company_id: string;
  title: string;
  description?: string;
  requirements?: string;
  quota: number;
  is_active: boolean;
}

export interface DailyLog {
  id: string;
  application_id: string;
  log_date: string;
  tasks_done: string;
  acquired_skills?: string;
  mentor_feedback?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_at?: string;
}

export interface FinalAssessment {
  id: string;
  application_id: string;
  mentor_score: number;
  mentor_review?: string;
  teacher_score: number;
  teacher_review?: string;
  total_score: number;
  grade_letter?: string;
}
