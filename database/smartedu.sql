CREATE DATABASE IF NOT EXISTS smartedu_ai;
USE smartedu_ai;

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_name VARCHAR(100) NOT NULL,
  duration VARCHAR(50),
  fee VARCHAR(50),
  requirements TEXT,
  description TEXT,
  career TEXT
);

CREATE TABLE faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  keyword VARCHAR(100) NOT NULL,
  response TEXT NOT NULL
);

CREATE TABLE unknown_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO courses (course_name, duration, fee, requirements, description, career) VALUES
('Software Engineering', '3 years', 'Rs. 120,000 per year', 'O/L Mathematics and English, basic computer knowledge', 'Programming, system design, software testing, databases, and application development.', 'Software Engineer, Web Developer, QA Engineer'),
('Cyber Security', '3 years', 'Rs. 135,000 per year', 'Basic IT knowledge and interest in networks/security', 'Ethical hacking, network protection, digital forensics, and secure systems.', 'Cyber Security Analyst, Ethical Hacker, SOC Analyst'),
('Data Science', '2 years', 'Rs. 110,000 per year', 'Basic mathematics and computer knowledge', 'Data analysis, visualization, statistics, Python, and machine learning basics.', 'Data Analyst, Data Scientist, Business Analyst'),
('AI and Machine Learning', '2 years', 'Rs. 145,000 per year', 'Basic programming and mathematics knowledge', 'Intelligent systems, prediction models, NLP, and decision-making algorithms.', 'AI Engineer, ML Engineer, NLP Developer'),
('Web Development', '1 year', 'Rs. 85,000 per year', 'Beginners can join', 'HTML, CSS, JavaScript, responsive design, backend basics, and deployment.', 'Frontend Developer, Web Designer, Full Stack Developer'),
('Computer Networking', '18 months', 'Rs. 95,000 per year', 'Basic computer knowledge', 'Network devices, IP addressing, routing, switching, and server basics.', 'Network Technician, Network Administrator');

INSERT INTO faqs (keyword, response) VALUES
('hello', 'Hello! I am SmartEdu AI. How can I help you today?'),
('register', 'To register, choose a course, fill the application form, and submit your documents.'),
('payment', 'Installment payment is available for selected courses.'),
('certificate', 'Students receive a certificate after completing the course.'),
('online', 'Courses are available as online, physical, and blended classes.');


CREATE TABLE registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  course_name VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(30) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
