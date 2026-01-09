-- HomeSchool Platform Seed Data
-- TEKS-aligned 4th Grade Curriculum
-- Run this AFTER schema.sql

-- ============================================
-- MATH UNITS
-- ============================================

-- Unit 1: Place Value & Operations
INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-math-1', 'math', 'Place Value & Operations', 'Understanding place value to millions and performing multi-digit operations with whole numbers.', 0);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-math-1-1', 'u-math-1', 'Understanding Place Value', 
  ARRAY['Identify place value positions from ones to millions', 'Read and write numbers in standard, word, and expanded form', 'Compare and order whole numbers'],
  'Place value helps us understand what each digit in a number is worth. In our number system, each place is 10 times greater than the place to its right. For example, in the number 5,432, the 5 is in the thousands place and is worth 5,000.',
  30, 0),
('l-math-1-2', 'u-math-1', 'Comparing & Ordering Numbers',
  ARRAY['Use symbols <, >, and = to compare numbers', 'Order numbers from least to greatest and greatest to least', 'Round numbers to any place'],
  'When comparing numbers, start from the leftmost digit and compare each place value. The number with the greater digit in the highest place value is the greater number.',
  30, 1),
('l-math-1-3', 'u-math-1', 'Multi-Digit Addition & Subtraction',
  ARRAY['Add multi-digit numbers with regrouping', 'Subtract multi-digit numbers with borrowing', 'Solve real-world problems using addition and subtraction'],
  'When adding or subtracting large numbers, line up the digits by place value. Start from the ones place and work left. Remember to regroup when a column adds up to 10 or more.',
  35, 2);

-- Unit 2: Fractions
INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-math-2', 'math', 'Fractions', 'Understanding, comparing, and performing operations with fractions.', 1);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-math-2-1', 'u-math-2', 'Understanding Fractions',
  ARRAY['Identify the numerator and denominator', 'Represent fractions using models and number lines', 'Understand fractions as parts of a whole'],
  'A fraction represents a part of a whole. The bottom number (denominator) tells how many equal parts the whole is divided into. The top number (numerator) tells how many parts we have.',
  30, 0),
('l-math-2-2', 'u-math-2', 'Equivalent Fractions',
  ARRAY['Generate equivalent fractions', 'Simplify fractions to lowest terms', 'Compare fractions using equivalent fractions'],
  'Equivalent fractions are different fractions that represent the same amount. You can create equivalent fractions by multiplying or dividing both the numerator and denominator by the same number.',
  30, 1),
('l-math-2-3', 'u-math-2', 'Adding & Subtracting Fractions',
  ARRAY['Add fractions with like denominators', 'Subtract fractions with like denominators', 'Solve word problems involving fractions'],
  'To add or subtract fractions with the same denominator, just add or subtract the numerators and keep the denominator the same. Remember to simplify your answer if possible.',
  35, 2);

-- ============================================
-- ELA UNITS
-- ============================================

-- Unit 1: Reading Comprehension
INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-ela-1', 'ela', 'Reading Comprehension Strategies', 'Developing skills to understand and analyze texts deeply.', 0);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-ela-1-1', 'u-ela-1', 'Finding the Main Idea',
  ARRAY['Identify the main idea of a paragraph or passage', 'Distinguish between main idea and supporting details', 'Summarize texts in your own words'],
  'The main idea is the most important point the author wants you to understand. Supporting details are facts, examples, or reasons that tell more about the main idea. Ask yourself: What is this mostly about?',
  30, 0),
('l-ela-1-2', 'u-ela-1', 'Making Inferences',
  ARRAY['Use text clues and prior knowledge to make inferences', 'Support inferences with evidence from the text', 'Distinguish between explicit and implicit information'],
  'An inference is a smart guess based on clues from the text plus what you already know. Authors do not always state everything directly—sometimes you need to read between the lines!',
  30, 1),
('l-ela-1-3', 'u-ela-1', 'Understanding Text Structure',
  ARRAY['Identify common text structures (sequence, compare/contrast, cause/effect)', 'Use signal words to recognize text structure', 'Use text structure to improve comprehension'],
  'Text structure is how an author organizes information. Knowing the structure helps you understand and remember what you read. Look for signal words like "first, next, finally" or "because, as a result."',
  35, 2);

-- Unit 2: Writing Process
INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-ela-2', 'ela', 'The Writing Process', 'Learning to plan, draft, revise, and publish written work.', 1);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-ela-2-1', 'u-ela-2', 'Brainstorming & Planning',
  ARRAY['Generate ideas for writing topics', 'Create graphic organizers to plan writing', 'Write a clear thesis statement'],
  'Good writing starts with good planning! Before you write, brainstorm ideas and organize your thoughts. A graphic organizer helps you see how your ideas connect.',
  25, 0),
('l-ela-2-2', 'u-ela-2', 'Writing Strong Paragraphs',
  ARRAY['Write paragraphs with topic sentences', 'Include supporting details and examples', 'Write concluding sentences'],
  'A strong paragraph has three parts: a topic sentence (tells the main idea), supporting sentences (give details and examples), and a concluding sentence (wraps it up).',
  30, 1),
('l-ela-2-3', 'u-ela-2', 'Revising & Editing',
  ARRAY['Revise writing for clarity and organization', 'Edit for grammar, spelling, and punctuation', 'Give and receive constructive feedback'],
  'Revising is about making your ideas better. Editing is about fixing mistakes. Read your work aloud to catch errors and make sure it sounds good.',
  35, 2);

-- ============================================
-- SCIENCE UNIT
-- ============================================

INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-sci-1', 'science', 'Living Systems & Food Chains', 'Exploring ecosystems, food chains, and how living things interact.', 0);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-sci-1-1', 'u-sci-1', 'Ecosystems & Habitats',
  ARRAY['Define ecosystem and habitat', 'Identify living and nonliving components of ecosystems', 'Describe how organisms depend on their environment'],
  'An ecosystem is a community of living things interacting with their environment. A habitat is the specific place where an organism lives. Every living thing needs certain conditions to survive.',
  30, 0),
('l-sci-1-2', 'u-sci-1', 'Food Chains & Food Webs',
  ARRAY['Explain how energy flows through a food chain', 'Identify producers, consumers, and decomposers', 'Understand the difference between food chains and food webs'],
  'A food chain shows how energy passes from one living thing to another. It starts with a producer (plant), moves to consumers (animals), and ends with decomposers. A food web shows many connected food chains.',
  35, 1),
('l-sci-1-3', 'u-sci-1', 'Adaptations for Survival',
  ARRAY['Define adaptation', 'Identify physical and behavioral adaptations', 'Explain how adaptations help organisms survive'],
  'An adaptation is a trait that helps a living thing survive in its environment. Physical adaptations are body parts, like a bird beak. Behavioral adaptations are actions, like migration.',
  30, 2);

-- ============================================
-- SOCIAL STUDIES UNIT
-- ============================================

INSERT INTO units (id, subject, title, description, order_index) VALUES
('u-ss-1', 'social_studies', 'Texas History & Geography', 'Exploring the history, geography, and government of Texas.', 0);

INSERT INTO lessons (id, unit_id, title, objectives, explanation, estimated_minutes, order_index) VALUES
('l-ss-1-1', 'u-ss-1', 'Texas Geography & Regions',
  ARRAY['Locate Texas on a map', 'Identify the four main regions of Texas', 'Describe the climate and landforms of each region'],
  'Texas has four main regions: the Coastal Plains, North Central Plains, Great Plains, and Mountains and Basins. Each region has unique landforms, climate, and resources.',
  30, 0),
('l-ss-1-2', 'u-ss-1', 'Early Texas History',
  ARRAY['Describe Native American groups in Texas', 'Explain Spanish exploration and colonization', 'Understand the founding of Texas missions'],
  'Long before Texas became a state, many Native American groups called it home, including the Caddo, Comanche, and Apache. Spanish explorers arrived in the 1500s and established missions.',
  35, 1),
('l-ss-1-3', 'u-ss-1', 'The Texas Revolution',
  ARRAY['Explain causes of the Texas Revolution', 'Describe key events including the Alamo', 'Identify important figures like Sam Houston'],
  'In 1836, Texans fought for independence from Mexico. Key events include the Battle of the Alamo and the Battle of San Jacinto. Sam Houston led Texas to victory.',
  35, 2);

-- ============================================
-- ACTIVITIES & QUESTIONS
-- ============================================

-- Math Lesson 1 Activities
INSERT INTO activities (id, lesson_id, type, title, content, order_index) VALUES
('a-math-1-1-read', 'l-math-1-1', 'reading', 'Understanding Place Value', '{"text": "In math, place value is one of the most important ideas to understand. Let''s explore!"}', 0),
('a-math-1-1-quiz', 'l-math-1-1', 'quiz', 'Place Value Quiz', '{}', 1),
('a-math-1-1-flash', 'l-math-1-1', 'flashcards', 'Place Value Flashcards', '{"flashcards": [{"id": "f1", "front": "What is the place value of 5 in 5,432?", "back": "Thousands (5,000)"}, {"id": "f2", "front": "Write 3,456 in expanded form", "back": "3,000 + 400 + 50 + 6"}, {"id": "f3", "front": "What does the 0 in 10,234 represent?", "back": "Zero hundreds (placeholder)"}]}', 2);

-- Math Quiz Questions
INSERT INTO questions (id, activity_id, type, question_text, hint, explanation, points, order_index) VALUES
('q-m1-1', 'a-math-1-1-quiz', 'multiple_choice', 'What is the value of the digit 7 in 47,523?', 'Look at which place the 7 is in.', 'The 7 is in the thousands place, so its value is 7,000.', 1, 0),
('q-m1-2', 'a-math-1-1-quiz', 'multiple_choice', 'Which number shows 5,000 + 300 + 20 + 4 in standard form?', 'Add all the values together.', '5,000 + 300 + 20 + 4 = 5,324', 1, 1),
('q-m1-3', 'a-math-1-1-quiz', 'multiple_choice', 'What is 89,456 rounded to the nearest thousand?', 'Look at the hundreds digit to decide whether to round up or down.', 'The hundreds digit is 4, so we round down to 89,000.', 1, 2),
('q-m1-4', 'a-math-1-1-quiz', 'short_answer', 'Write the number six hundred forty-two thousand, one hundred three in standard form.', 'Use commas correctly!', 'The standard form is 642,103.', 2, 3),
('q-m1-5', 'a-math-1-1-quiz', 'multiple_choice', 'Which digit is in the ten thousands place in 234,567?', 'Ten thousands is the fifth place from the right.', 'The digit 3 is in the ten thousands place.', 1, 4),
('q-m1-6', 'a-math-1-1-quiz', 'multi_select', 'Select ALL numbers that are greater than 50,000.', NULL, '52,341 and 100,000 are both greater than 50,000.', 2, 5);

-- Math Quiz Options
INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
('q-m1-1', '7', FALSE, 0),
('q-m1-1', '70', FALSE, 1),
('q-m1-1', '700', FALSE, 2),
('q-m1-1', '7,000', TRUE, 3),
('q-m1-2', '5,234', FALSE, 0),
('q-m1-2', '5,324', TRUE, 1),
('q-m1-2', '53,024', FALSE, 2),
('q-m1-2', '5,342', FALSE, 3),
('q-m1-3', '89,000', TRUE, 0),
('q-m1-3', '90,000', FALSE, 1),
('q-m1-3', '89,500', FALSE, 2),
('q-m1-3', '80,000', FALSE, 3),
('q-m1-5', '2', FALSE, 0),
('q-m1-5', '3', TRUE, 1),
('q-m1-5', '4', FALSE, 2),
('q-m1-5', '5', FALSE, 3),
('q-m1-6', '49,999', FALSE, 0),
('q-m1-6', '52,341', TRUE, 1),
('q-m1-6', '38,742', FALSE, 2),
('q-m1-6', '100,000', TRUE, 3);

-- ELA Lesson 1 Activities  
INSERT INTO activities (id, lesson_id, type, title, content, order_index) VALUES
('a-ela-1-1-read', 'l-ela-1-1', 'reading', 'Finding the Main Idea', '{"text": "Good readers always look for the main idea when they read. Let''s learn how!"}', 0),
('a-ela-1-1-quiz', 'l-ela-1-1', 'quiz', 'Main Idea Quiz', '{}', 1),
('a-ela-1-1-write', 'l-ela-1-1', 'writing_prompt', 'Summarize a Passage', '{"prompt": "Read the paragraph below and write a one-sentence summary that captures the main idea.", "instructions": "Remember: A good summary tells the most important idea without using too many words."}', 2);

INSERT INTO questions (id, activity_id, type, question_text, hint, explanation, correct_answer, points, order_index) VALUES
('q-e1-1', 'a-ela-1-1-quiz', 'multiple_choice', 'What is the main idea of a paragraph?', 'Think about the most important point.', 'The main idea is the most important point the author wants you to know.', NULL, 1, 0),
('q-e1-2', 'a-ela-1-1-quiz', 'multiple_choice', 'Supporting details help to...', NULL, 'Supporting details give more information about the main idea.', NULL, 1, 1),
('q-e1-3', 'a-ela-1-1-quiz', 'short_answer', 'What question should you ask yourself to find the main idea?', 'It starts with "What is this..."', 'Ask: What is this mostly about?', 'what is this mostly about', 2, 2),
('q-e1-4', 'a-ela-1-1-quiz', 'multiple_choice', 'Where do you usually find the main idea in a paragraph?', NULL, 'The main idea is often in the first or last sentence of a paragraph.', NULL, 1, 3),
('q-e1-5', 'a-ela-1-1-quiz', 'multiple_choice', 'A summary should be...', NULL, 'A summary is shorter than the original text and includes just the main points.', NULL, 1, 4),
('q-e1-6', 'a-ela-1-1-quiz', 'multi_select', 'Which are examples of supporting details? Select all that apply.', NULL, 'Facts, examples, and reasons all support the main idea.', NULL, 2, 5);

INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
('q-e1-1', 'A small, unimportant detail', FALSE, 0),
('q-e1-1', 'The most important point the author makes', TRUE, 1),
('q-e1-1', 'The title of the text', FALSE, 2),
('q-e1-1', 'The first word in the paragraph', FALSE, 3),
('q-e1-2', 'Confuse the reader', FALSE, 0),
('q-e1-2', 'Give more information about the main idea', TRUE, 1),
('q-e1-2', 'Change the topic', FALSE, 2),
('q-e1-2', 'Make the paragraph longer', FALSE, 3),
('q-e1-4', 'In the middle, hidden', FALSE, 0),
('q-e1-4', 'In the first or last sentence', TRUE, 1),
('q-e1-4', 'After the title', FALSE, 2),
('q-e1-4', 'In the supporting details', FALSE, 3),
('q-e1-5', 'Longer than the original text', FALSE, 0),
('q-e1-5', 'Exactly the same as the original', FALSE, 1),
('q-e1-5', 'Shorter and includes main points', TRUE, 2),
('q-e1-5', 'Only one word', FALSE, 3),
('q-e1-6', 'Facts that prove the main idea', TRUE, 0),
('q-e1-6', 'The title of the passage', FALSE, 1),
('q-e1-6', 'Examples that illustrate the point', TRUE, 2),
('q-e1-6', 'Reasons that explain the main idea', TRUE, 3);

-- Science Lesson 1 Activities
INSERT INTO activities (id, lesson_id, type, title, content, order_index) VALUES
('a-sci-1-1-read', 'l-sci-1-1', 'reading', 'Exploring Ecosystems', '{"text": "An ecosystem is like a neighborhood for living things!"}', 0),
('a-sci-1-1-quiz', 'l-sci-1-1', 'quiz', 'Ecosystems Quiz', '{}', 1);

INSERT INTO questions (id, activity_id, type, question_text, hint, explanation, points, order_index) VALUES
('q-s1-1', 'a-sci-1-1-quiz', 'multiple_choice', 'What is an ecosystem?', NULL, 'An ecosystem includes all living and nonliving things in an area that interact with each other.', 1, 0),
('q-s1-2', 'a-sci-1-1-quiz', 'multiple_choice', 'Which is a nonliving part of an ecosystem?', 'Think about things that were never alive.', 'Water, rocks, and air are nonliving parts of an ecosystem.', 1, 1),
('q-s1-3', 'a-sci-1-1-quiz', 'short_answer', 'What is a habitat?', NULL, 'A habitat is the specific place where an organism lives.', 2, 2),
('q-s1-4', 'a-sci-1-1-quiz', 'multiple_choice', 'What do all living things need from their ecosystem?', NULL, 'All living things need food, water, shelter, and space.', 1, 3),
('q-s1-5', 'a-sci-1-1-quiz', 'multi_select', 'Select ALL things that are living parts of an ecosystem.', NULL, 'Plants and animals are living parts of an ecosystem.', 2, 4),
('q-s1-6', 'a-sci-1-1-quiz', 'multiple_choice', 'A fish tank with fish, plants, water, and rocks is an example of...', NULL, 'A fish tank contains living and nonliving things interacting, making it an ecosystem.', 1, 5);

INSERT INTO question_options (question_id, text, is_correct, order_index) VALUES
('q-s1-1', 'Just the animals in an area', FALSE, 0),
('q-s1-1', 'All living and nonliving things interacting in an area', TRUE, 1),
('q-s1-1', 'Only plants and water', FALSE, 2),
('q-s1-1', 'A type of animal', FALSE, 3),
('q-s1-2', 'Tree', FALSE, 0),
('q-s1-2', 'Bird', FALSE, 1),
('q-s1-2', 'Water', TRUE, 2),
('q-s1-2', 'Flower', FALSE, 3),
('q-s1-4', 'Just friends', FALSE, 0),
('q-s1-4', 'Food, water, shelter, and space', TRUE, 1),
('q-s1-4', 'Only food', FALSE, 2),
('q-s1-4', 'Nothing special', FALSE, 3),
('q-s1-5', 'Trees', TRUE, 0),
('q-s1-5', 'Rocks', FALSE, 1),
('q-s1-5', 'Rabbits', TRUE, 2),
('q-s1-5', 'Sunlight', FALSE, 3),
('q-s1-6', 'A habitat only', FALSE, 0),
('q-s1-6', 'An ecosystem', TRUE, 1),
('q-s1-6', 'Just water', FALSE, 2),
('q-s1-6', 'An adaptation', FALSE, 3);

-- ============================================
-- BADGES
-- ============================================

INSERT INTO badges (id, name, description, icon, criteria) VALUES
('badge-first-lesson', 'First Steps', 'Complete your first lesson!', '🌟', '{"type": "lessons_completed", "threshold": 1}'),
('badge-math-star', 'Math Star', 'Complete 5 math lessons', '🧮', '{"type": "lessons_completed", "threshold": 5, "subject": "math"}'),
('badge-reader', 'Super Reader', 'Complete 5 ELA lessons', '📚', '{"type": "lessons_completed", "threshold": 5, "subject": "ela"}'),
('badge-streak-5', 'On Fire!', 'Study for 5 days in a row', '🔥', '{"type": "streak_days", "threshold": 5}'),
('badge-perfect', 'Perfect Score', 'Get 100% on any quiz', '💯', '{"type": "perfect_score", "threshold": 1}'),
('badge-mastery-5', 'Skill Master', 'Master 5 different skills', '🏆', '{"type": "mastery_count", "threshold": 5}');
