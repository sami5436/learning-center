import { z } from 'zod';

// Login validation
export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Magic link validation
export const magicLinkSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export type MagicLinkFormData = z.infer<typeof magicLinkSchema>;

// Profile validation
export const profileSchema = z.object({
    display_name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email address'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Student creation validation
export const createStudentSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    display_name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    grade_level: z.number().min(1).max(12),
    timezone: z.string().default('America/Chicago'),
});

export type CreateStudentFormData = z.infer<typeof createStudentSchema>;

// Unit validation
export const unitSchema = z.object({
    subject: z.enum(['math', 'ela', 'science', 'social_studies', 'enrichment']),
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500),
});

export type UnitFormData = z.infer<typeof unitSchema>;

// Lesson validation
export const lessonSchema = z.object({
    unit_id: z.string().uuid(),
    title: z.string().min(3, 'Title must be at least 3 characters').max(100),
    objectives: z.array(z.string().min(5)).min(1, 'At least one objective required'),
    explanation: z.string().min(20, 'Explanation must be at least 20 characters'),
    estimated_minutes: z.number().min(5).max(120),
});

export type LessonFormData = z.infer<typeof lessonSchema>;

// Question validation
export const questionSchema = z.object({
    activity_id: z.string().uuid(),
    type: z.enum(['multiple_choice', 'multi_select', 'short_answer', 'show_work']),
    question_text: z.string().min(5, 'Question must be at least 5 characters'),
    hint: z.string().optional(),
    explanation: z.string().optional(),
    points: z.number().min(1).max(100),
    correct_answer: z.string().optional(),
    options: z.array(z.object({
        text: z.string().min(1),
        is_correct: z.boolean(),
    })).optional(),
});

export type QuestionFormData = z.infer<typeof questionSchema>;

// Schedule block validation
export const scheduleBlockSchema = z.object({
    day: z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
    block_type: z.enum(['subject', 'break']),
    subject: z.enum(['math', 'ela', 'science', 'social_studies', 'enrichment']).optional(),
    title: z.string().min(2).max(50),
    duration_minutes: z.number().min(5).max(120),
});

export type ScheduleBlockFormData = z.infer<typeof scheduleBlockSchema>;

// Writing submission validation
export const writingSubmissionSchema = z.object({
    content: z.string().min(50, 'Response must be at least 50 characters'),
});

export type WritingSubmissionFormData = z.infer<typeof writingSubmissionSchema>;

// Grading validation
export const gradingSchema = z.object({
    score: z.number().min(0).max(100),
    feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
});

export type GradingFormData = z.infer<typeof gradingSchema>;
