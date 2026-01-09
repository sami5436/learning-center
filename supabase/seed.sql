-- HomeSchool Platform Seed Data
-- TEKS-aligned 4th Grade Curriculum
-- Run this AFTER schema.sql

-- ============================================
-- MATH UNITS
-- ============================================

-- Unit 1: Place Value & Operations
WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('math', 'Place Value & Operations', 'Understanding place value to millions and performing multi-digit operations with whole numbers.', 0)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Understanding Place Value', 
  ARRAY['Identify place value positions from ones to millions', 'Read and write numbers in standard, word, and expanded form', 'Compare and order whole numbers'],
  'Place value helps us understand what each digit in a number is worth. In our number system, each place is 10 times greater than the place to its right.',
  30, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Comparing & Ordering Numbers',
  ARRAY['Use symbols <, >, and = to compare numbers', 'Order numbers from least to greatest', 'Round numbers to any place'],
  'When comparing numbers, start from the leftmost digit and compare each place value.',
  30, 1
FROM inserted_unit
UNION ALL
SELECT id, 'Multi-Digit Addition & Subtraction',
  ARRAY['Add multi-digit numbers with regrouping', 'Subtract multi-digit numbers with borrowing', 'Solve real-world problems'],
  'When adding or subtracting large numbers, line up the digits by place value. Start from the ones place and work left.',
  35, 2
FROM inserted_unit;

-- Unit 2: Fractions
WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('math', 'Fractions', 'Understanding, comparing, and performing operations with fractions.', 1)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Understanding Fractions',
  ARRAY['Identify the numerator and denominator', 'Represent fractions using models', 'Understand fractions as parts of a whole'],
  'A fraction represents a part of a whole. The bottom number (denominator) tells how many equal parts. The top number (numerator) tells how many parts we have.',
  30, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Equivalent Fractions',
  ARRAY['Generate equivalent fractions', 'Simplify fractions to lowest terms', 'Compare fractions'],
  'Equivalent fractions are different fractions that represent the same amount.',
  30, 1
FROM inserted_unit
UNION ALL
SELECT id, 'Adding & Subtracting Fractions',
  ARRAY['Add fractions with like denominators', 'Subtract fractions with like denominators', 'Solve word problems'],
  'To add or subtract fractions with the same denominator, just add or subtract the numerators.',
  35, 2
FROM inserted_unit;

-- ============================================
-- ELA UNITS
-- ============================================

WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('ela', 'Reading Comprehension Strategies', 'Developing skills to understand and analyze texts deeply.', 0)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Finding the Main Idea',
  ARRAY['Identify the main idea of a paragraph', 'Distinguish between main idea and supporting details', 'Summarize texts'],
  'The main idea is the most important point the author wants you to understand. Ask yourself: What is this mostly about?',
  30, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Making Inferences',
  ARRAY['Use text clues and prior knowledge to make inferences', 'Support inferences with evidence', 'Distinguish explicit and implicit information'],
  'An inference is a smart guess based on clues from the text plus what you already know.',
  30, 1
FROM inserted_unit
UNION ALL
SELECT id, 'Understanding Text Structure',
  ARRAY['Identify common text structures', 'Use signal words to recognize structure', 'Use text structure to improve comprehension'],
  'Text structure is how an author organizes information. Look for signal words like "first, next, finally" or "because, as a result."',
  35, 2
FROM inserted_unit;

WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('ela', 'The Writing Process', 'Learning to plan, draft, revise, and publish written work.', 1)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Brainstorming & Planning',
  ARRAY['Generate ideas for writing topics', 'Create graphic organizers', 'Write a clear thesis statement'],
  'Good writing starts with good planning! Before you write, brainstorm ideas and organize your thoughts.',
  25, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Writing Strong Paragraphs',
  ARRAY['Write paragraphs with topic sentences', 'Include supporting details', 'Write concluding sentences'],
  'A strong paragraph has three parts: a topic sentence, supporting sentences, and a concluding sentence.',
  30, 1
FROM inserted_unit
UNION ALL
SELECT id, 'Revising & Editing',
  ARRAY['Revise writing for clarity', 'Edit for grammar and spelling', 'Give and receive feedback'],
  'Revising is about making your ideas better. Editing is about fixing mistakes.',
  35, 2
FROM inserted_unit;

-- ============================================
-- SCIENCE UNIT
-- ============================================

WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('science', 'Living Systems & Food Chains', 'Exploring ecosystems, food chains, and how living things interact.', 0)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Ecosystems & Habitats',
  ARRAY['Define ecosystem and habitat', 'Identify living and nonliving components', 'Describe how organisms depend on their environment'],
  'An ecosystem is a community of living things interacting with their environment. A habitat is the specific place where an organism lives.',
  30, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Food Chains & Food Webs',
  ARRAY['Explain how energy flows through a food chain', 'Identify producers, consumers, and decomposers', 'Understand the difference between food chains and food webs'],
  'A food chain shows how energy passes from one living thing to another. It starts with a producer (plant), moves to consumers (animals), and ends with decomposers.',
  35, 1
FROM inserted_unit
UNION ALL
SELECT id, 'Adaptations for Survival',
  ARRAY['Define adaptation', 'Identify physical and behavioral adaptations', 'Explain how adaptations help organisms survive'],
  'An adaptation is a trait that helps a living thing survive in its environment.',
  30, 2
FROM inserted_unit;

-- ============================================
-- SOCIAL STUDIES UNIT
-- ============================================

WITH inserted_unit AS (
  INSERT INTO units (subject, title, description, order_index) VALUES
  ('social_studies', 'Texas History & Geography', 'Exploring the history, geography, and government of Texas.', 0)
  RETURNING id
)
INSERT INTO lessons (unit_id, title, objectives, explanation, estimated_minutes, order_index)
SELECT id, 'Texas Geography & Regions',
  ARRAY['Locate Texas on a map', 'Identify the four main regions of Texas', 'Describe the climate and landforms of each region'],
  'Texas has four main regions: the Coastal Plains, North Central Plains, Great Plains, and Mountains and Basins.',
  30, 0
FROM inserted_unit
UNION ALL
SELECT id, 'Early Texas History',
  ARRAY['Describe Native American groups in Texas', 'Explain Spanish exploration and colonization', 'Understand the founding of Texas missions'],
  'Long before Texas became a state, many Native American groups called it home, including the Caddo, Comanche, and Apache.',
  35, 1
FROM inserted_unit
UNION ALL
SELECT id, 'The Texas Revolution',
  ARRAY['Explain causes of the Texas Revolution', 'Describe key events including the Alamo', 'Identify important figures like Sam Houston'],
  'In 1836, Texans fought for independence from Mexico. Key events include the Battle of the Alamo and the Battle of San Jacinto.',
  35, 2
FROM inserted_unit;

-- ============================================
-- ACTIVITIES & QUESTIONS for Math Place Value Lesson
-- ============================================

DO $$
DECLARE
  lesson_id UUID;
  quiz_activity_id UUID;
  q1_id UUID;
  q2_id UUID;
  q3_id UUID;
  q4_id UUID;
  q5_id UUID;
  q6_id UUID;
BEGIN
  -- Get the Place Value lesson
  SELECT id INTO lesson_id FROM lessons WHERE title = 'Understanding Place Value' LIMIT 1;
  
  -- Insert reading activity
  INSERT INTO activities (lesson_id, type, title, content, order_index)
  VALUES (lesson_id, 'reading', 'Understanding Place Value', '{"text": "In math, place value is one of the most important ideas to understand."}', 0);
  
  -- Insert quiz activity
  INSERT INTO activities (lesson_id, type, title, content, order_index)
  VALUES (lesson_id, 'quiz', 'Place Value Quiz', '{}', 1)
  RETURNING id INTO quiz_activity_id;
  
  -- Insert flashcards
  INSERT INTO activities (lesson_id, type, title, content, order_index)
  VALUES (lesson_id, 'flashcards', 'Place Value Flashcards', '{"flashcards": [{"id": "f1", "front": "What is the place value of 5 in 5,432?", "back": "Thousands (5,000)"}, {"id": "f2", "front": "Write 3,456 in expanded form", "back": "3,000 + 400 + 50 + 6"}]}', 2);

  -- Insert questions
  INSERT INTO questions (activity_id, type, question_text, hint, explanation, points, order_index)
  VALUES (quiz_activity_id, 'multiple_choice', 'What is the value of the digit 7 in 47,523?', 'Look at which place the 7 is in.', 'The 7 is in the thousands place, so its value is 7,000.', 1, 0)
  RETURNING id INTO q1_id;
  
  INSERT INTO questions (activity_id, type, question_text, hint, explanation, points, order_index)
  VALUES (quiz_activity_id, 'multiple_choice', 'Which number shows 5,000 + 300 + 20 + 4 in standard form?', 'Add all the values together.', '5,000 + 300 + 20 + 4 = 5,324', 1, 1)
  RETURNING id INTO q2_id;
  
  INSERT INTO questions (activity_id, type, question_text, hint, explanation, points, order_index)
  VALUES (quiz_activity_id, 'multiple_choice', 'What is 89,456 rounded to the nearest thousand?', 'Look at the hundreds digit.', 'The hundreds digit is 4, so we round down to 89,000.', 1, 2)
  RETURNING id INTO q3_id;
  
  INSERT INTO questions (activity_id, type, question_text, hint, explanation, correct_answer, points, order_index)
  VALUES (quiz_activity_id, 'short_answer', 'Write the number six hundred forty-two thousand, one hundred three in standard form.', 'Use commas correctly!', 'The standard form is 642,103.', '642103', 2, 3)
  RETURNING id INTO q4_id;
  
  INSERT INTO questions (activity_id, type, question_text, hint, explanation, points, order_index)
  VALUES (quiz_activity_id, 'multiple_choice', 'Which digit is in the ten thousands place in 234,567?', 'Ten thousands is the fifth place from the right.', 'The digit 3 is in the ten thousands place.', 1, 4)
  RETURNING id INTO q5_id;
  
  INSERT INTO questions (activity_id, type, question_text, explanation, points, order_index)
  VALUES (quiz_activity_id, 'multi_select', 'Select ALL numbers that are greater than 50,000.', '52,341 and 100,000 are both greater than 50,000.', 2, 5)
  RETURNING id INTO q6_id;

  -- Insert options for q1
  INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
    (q1_id, '7', FALSE, 0),
    (q1_id, '70', FALSE, 1),
    (q1_id, '700', FALSE, 2),
    (q1_id, '7,000', TRUE, 3);
    
  -- Insert options for q2
  INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
    (q2_id, '5,234', FALSE, 0),
    (q2_id, '5,324', TRUE, 1),
    (q2_id, '53,024', FALSE, 2),
    (q2_id, '5,342', FALSE, 3);
    
  -- Insert options for q3
  INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
    (q3_id, '89,000', TRUE, 0),
    (q3_id, '90,000', FALSE, 1),
    (q3_id, '89,500', FALSE, 2),
    (q3_id, '80,000', FALSE, 3);
    
  -- Insert options for q5
  INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
    (q5_id, '2', FALSE, 0),
    (q5_id, '3', TRUE, 1),
    (q5_id, '4', FALSE, 2),
    (q5_id, '5', FALSE, 3);
    
  -- Insert options for q6
  INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
    (q6_id, '49,999', FALSE, 0),
    (q6_id, '52,341', TRUE, 1),
    (q6_id, '38,742', FALSE, 2),
    (q6_id, '100,000', TRUE, 3);
END $$;

-- ============================================
-- BADGES
-- ============================================

INSERT INTO badges (name, description, icon, criteria) VALUES
  ('First Steps', 'Complete your first lesson!', '🌟', '{"type": "lessons_completed", "threshold": 1}'),
  ('Math Star', 'Complete 5 math lessons', '🧮', '{"type": "lessons_completed", "threshold": 5, "subject": "math"}'),
  ('Super Reader', 'Complete 5 ELA lessons', '📚', '{"type": "lessons_completed", "threshold": 5, "subject": "ela"}'),
  ('On Fire!', 'Study for 5 days in a row', '🔥', '{"type": "streak_days", "threshold": 5}'),
  ('Perfect Score', 'Get 100% on any quiz', '💯', '{"type": "perfect_score", "threshold": 1}'),
  ('Skill Master', 'Master 5 different skills', '🏆', '{"type": "mastery_count", "threshold": 5}');
