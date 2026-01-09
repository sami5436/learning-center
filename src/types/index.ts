// Types for the Homeschool Platform

// User Roles
export type UserRole = 'admin' | 'student';

// Profile (linked to Supabase auth.users)
export interface Profile {
  id: string;
  email: string;
  display_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

// Student Profile (additional student-specific data)
export interface Student {
  id: string;
  profile_id: string;
  grade_level: number;
  timezone: string;
  parent_id: string; // Links to admin profile
  created_at: string;
  updated_at: string;
  profile?: Profile;
}

// Subjects
export type Subject = 
  | 'math' 
  | 'ela' 
  | 'science' 
  | 'social_studies' 
  | 'enrichment';

export const SUBJECT_LABELS: Record<Subject, string> = {
  math: 'Math',
  ela: 'ELA (Reading & Writing)',
  science: 'Science',
  social_studies: 'Social Studies',
  enrichment: 'Enrichment',
};

export const SUBJECT_COLORS: Record<Subject, string> = {
  math: 'bg-primary-500',
  ela: 'bg-secondary-500',
  science: 'bg-accent-500',
  social_studies: 'bg-warning-500',
  enrichment: 'bg-neutral-500',
};

// Curriculum Units
export interface Unit {
  id: string;
  subject: Subject;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

// Lessons within Units
export interface Lesson {
  id: string;
  unit_id: string;
  title: string;
  objectives: string[];
  explanation: string;
  order_index: number;
  estimated_minutes: number;
  created_at: string;
  updated_at: string;
  unit?: Unit;
  activities?: Activity[];
}

// Activity Types
export type ActivityType = 
  | 'reading' 
  | 'video' 
  | 'quiz' 
  | 'worksheet' 
  | 'writing_prompt' 
  | 'flashcards' 
  | 'timed_practice'
  | 'challenge';

export interface Activity {
  id: string;
  lesson_id: string;
  type: ActivityType;
  title: string;
  content: ActivityContent;
  order_index: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
  lesson?: Lesson;
  questions?: Question[];
}

// Activity Content (varies by type)
export interface ActivityContent {
  text?: string;
  video_url?: string;
  instructions?: string;
  rubric?: RubricItem[];
  flashcards?: Flashcard[];
  time_limit_seconds?: number;
}

export interface RubricItem {
  criterion: string;
  points: number;
  description: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

// Question Types
export type QuestionType = 
  | 'multiple_choice' 
  | 'multi_select' 
  | 'short_answer' 
  | 'show_work';

export interface Question {
  id: string;
  activity_id: string;
  type: QuestionType;
  question_text: string;
  hint?: string;
  explanation?: string;
  points: number;
  order_index: number;
  created_at: string;
  options?: QuestionOption[];
  correct_answer?: string; // For short_answer
}

export interface QuestionOption {
  id: string;
  question_id: string;
  text: string;
  is_correct: boolean;
  order_index: number;
}

// Schedule
export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

export const DAYS_OF_WEEK: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

export interface ScheduleTemplate {
  id: string;
  student_id: string;
  name: string;
  start_time: string; // HH:mm format
  is_active: boolean;
  created_at: string;
  updated_at: string;
  blocks?: ScheduleBlock[];
}

export type BlockType = 'subject' | 'break';

export interface ScheduleBlock {
  id: string;
  template_id: string;
  day: DayOfWeek;
  block_type: BlockType;
  subject?: Subject;
  title: string;
  duration_minutes: number;
  order_index: number;
  lesson_ids?: string[]; // Assigned lessons for this block
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

// Submissions
export interface Submission {
  id: string;
  student_id: string;
  activity_id: string;
  attempt_number: number;
  answers: SubmissionAnswer[];
  score?: number;
  max_score?: number;
  time_spent_seconds: number;
  is_graded: boolean;
  graded_by?: string;
  graded_at?: string;
  feedback?: string;
  created_at: string;
  updated_at: string;
  activity?: Activity;
  student?: Student;
}

export interface SubmissionAnswer {
  question_id: string;
  answer: string | string[]; // string for single, string[] for multi-select
  is_correct?: boolean;
  points_earned?: number;
  feedback?: string;
}

// Activity Progress
export interface ActivityProgress {
  id: string;
  student_id: string;
  activity_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  time_spent_seconds: number;
  attempts: number;
  best_score?: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Mastery Tracking
export type MasteryStatus = 'not_started' | 'practicing' | 'mastered';

export interface Mastery {
  id: string;
  student_id: string;
  skill_tag: string;
  status: MasteryStatus;
  evidence: MasteryEvidence[];
  created_at: string;
  updated_at: string;
}

export interface MasteryEvidence {
  submission_id: string;
  score_percent: number;
  date: string;
}

// Badges
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: BadgeCriteria;
  created_at: string;
}

export interface BadgeCriteria {
  type: 'lessons_completed' | 'streak_days' | 'mastery_count' | 'perfect_score';
  threshold: number;
  subject?: Subject;
}

export interface StudentBadge {
  id: string;
  student_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

// Daily Schedule (computed from template + current date)
export interface DailySchedule {
  date: string; // YYYY-MM-DD
  day: DayOfWeek;
  blocks: ScheduleBlockWithTime[];
}

export interface ScheduleBlockWithTime extends ScheduleBlock {
  start_time: string; // HH:mm
  end_time: string; // HH:mm
  is_current: boolean;
  is_complete: boolean;
}

// Break Suggestions
export const BREAK_SUGGESTIONS = [
  { text: "Stand up and stretch! Reach for the sky! 🌟", icon: "stretch" },
  { text: "Time for a water break! Stay hydrated! 💧", icon: "water" },
  { text: "Take a short walk around the room! 🚶", icon: "walk" },
  { text: "Do 10 jumping jacks to get energized! ⚡", icon: "exercise" },
  { text: "Grab a healthy snack! 🍎", icon: "snack" },
  { text: "Look out the window and rest your eyes! 👀", icon: "rest" },
  { text: "Dance to your favorite song! 🎵", icon: "dance" },
  { text: "Take 5 deep breaths! Inhale... Exhale... 🧘", icon: "breathe" },
];
