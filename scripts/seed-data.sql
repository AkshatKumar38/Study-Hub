-- Insert sample users
INSERT INTO users (email, username, display_name, university, major, year, bio, subjects) VALUES
('sarah.chen@mit.edu', 'sarahc', 'Sarah Chen', 'MIT', 'Computer Science', 3, 'Passionate about algorithms and machine learning. Always happy to help fellow students!', ARRAY['Computer Science', 'Mathematics']),
('mike.rodriguez@stanford.edu', 'miker', 'Mike Rodriguez', 'Stanford', 'Mathematics', 4, 'Math tutor and study group organizer. Love sharing knowledge and helping others succeed.', ARRAY['Mathematics', 'Physics']),
('emma.thompson@harvard.edu', 'emmat', 'Emma Thompson', 'Harvard', 'Physics', 2, 'Physics enthusiast working on quantum mechanics research. Late night study sessions are my specialty!', ARRAY['Physics', 'Mathematics']),
('alex.kim@berkeley.edu', 'alexk', 'Alex Kim', 'UC Berkeley', 'Engineering', 3, 'Mechanical engineering student with a passion for robotics and automation.', ARRAY['Engineering', 'Computer Science']),
('david.park@caltech.edu', 'davidp', 'David Park', 'Caltech', 'Chemistry', 4, 'Chemistry major focusing on organic synthesis. Love lab work and problem solving.', ARRAY['Chemistry', 'Biology']);

-- Insert sample posts
INSERT INTO posts (user_id, type, content, subject, images) VALUES
((SELECT id FROM users WHERE username = 'sarahc'), 'question', 'Can someone help me understand the difference between Big O and Big Theta notation? I keep getting confused during algorithm analysis.', 'Computer Science', '{}'),
((SELECT id FROM users WHERE username = 'miker'), 'resource', 'Just finished creating comprehensive calculus notes for derivatives and integrals. Sharing with everyone who might find them helpful! 📚', 'Mathematics', ARRAY['/placeholder.svg?height=300&width=400']),
((SELECT id FROM users WHERE username = 'emmat'), 'general', 'Late night study session at the library! Working on quantum mechanics problem sets. The dedication is real 💪 #StudyLife', 'Physics', ARRAY['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400']),
((SELECT id FROM users WHERE username = 'alexk'), 'question', 'Anyone know good resources for learning CAD software? Starting a robotics project and need to design some custom parts.', 'Engineering', '{}'),
((SELECT id FROM users WHERE username = 'davidp'), 'resource', 'Sharing my organic chemistry reaction mechanisms cheat sheet. Hope this helps with your upcoming exams!', 'Chemistry', ARRAY['/placeholder.svg?height=300&width=400']);

-- Insert sample reactions
INSERT INTO reactions (post_id, user_id, type) VALUES
((SELECT id FROM posts WHERE content LIKE '%Big O and Big Theta%'), (SELECT id FROM users WHERE username = 'miker'), 'helpful'),
((SELECT id FROM posts WHERE content LIKE '%Big O and Big Theta%'), (SELECT id FROM users WHERE username = 'alexk'), 'like'),
((SELECT id FROM posts WHERE content LIKE '%calculus notes%'), (SELECT id FROM users WHERE username = 'sarahc'), 'like'),
((SELECT id FROM posts WHERE content LIKE '%calculus notes%'), (SELECT id FROM users WHERE username = 'emmat'), 'helpful'),
((SELECT id FROM posts WHERE content LIKE '%Late night study%'), (SELECT id FROM users WHERE username = 'davidp'), 'motivating');

-- Insert sample comments
INSERT INTO comments (post_id, user_id, content) VALUES
((SELECT id FROM posts WHERE content LIKE '%Big O and Big Theta%'), (SELECT id FROM users WHERE username = 'alexk'), 'Big O is upper bound, Big Theta is tight bound. Think of it as worst case vs exact case.'),
((SELECT id FROM posts WHERE content LIKE '%Late night study%'), (SELECT id FROM users WHERE username = 'davidp'), 'Keep it up! Quantum mechanics is tough but so rewarding.'),
((SELECT id FROM posts WHERE content LIKE '%CAD software%'), (SELECT id FROM users WHERE username = 'emmat'), 'I recommend starting with Fusion 360 - it has a great free student license!');

-- Insert sample study groups
INSERT INTO study_groups (name, description, subject, created_by) VALUES
('CS Study Group', 'Weekly meetups to discuss computer science concepts and work on coding problems together.', 'Computer Science', (SELECT id FROM users WHERE username = 'sarahc')),
('Calculus Help', 'Peer tutoring group for calculus students. We meet twice a week to solve problems and explain concepts.', 'Mathematics', (SELECT id FROM users WHERE username = 'miker')),
('Physics Lab Partners', 'Group for physics students to collaborate on lab reports and discuss experimental procedures.', 'Physics', (SELECT id FROM users WHERE username = 'emmat'));

-- Insert sample study group members
INSERT INTO study_group_members (group_id, user_id, role) VALUES
((SELECT id FROM study_groups WHERE name = 'CS Study Group'), (SELECT id FROM users WHERE username = 'sarahc'), 'admin'),
((SELECT id FROM study_groups WHERE name = 'CS Study Group'), (SELECT id FROM users WHERE username = 'alexk'), 'member'),
((SELECT id FROM study_groups WHERE name = 'Calculus Help'), (SELECT id FROM users WHERE username = 'miker'), 'admin'),
((SELECT id FROM study_groups WHERE name = 'Calculus Help'), (SELECT id FROM users WHERE username = 'sarahc'), 'member'),
((SELECT id FROM study_groups WHERE name = 'Physics Lab Partners'), (SELECT id FROM users WHERE username = 'emmat'), 'admin'),
((SELECT id FROM study_groups WHERE name = 'Physics Lab Partners'), (SELECT id FROM users WHERE username = 'davidp'), 'member');
