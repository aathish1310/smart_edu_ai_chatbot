/*
SmartEdu AI Chatbot
Main AI parts:
1. Natural Language Interface: chat UI
2. Inference Engine: preprocessInput(), detectIntent(), generateResponse()
3. Knowledge Base: courses array and faqKnowledge array
*/

// ---------------- KNOWLEDGE BASE ----------------

const courses = [
  {
    name: "Software Engineering",
    keywords: ["software", "engineering", "programming", "coding", "developer"],
    duration: "3 years",
    fee: "Rs. 120,000 per year",
    requirements: "O/L Mathematics and English, basic computer knowledge",
    description: "Software Engineering teaches programming, system design, software testing, databases, and application development.",
    modules: ["Java Programming", "Web Development", "Database Systems", "Software Testing", "System Analysis and Design", "Final Year Project"],
    skills: ["Problem solving", "Coding", "Debugging", "Team software development", "Database design"],
    career: "Software Engineer, Web Developer, QA Engineer, Mobile App Developer",
    link: "https://www.w3schools.com/java/"
  },
  {
    name: "Cyber Security",
    keywords: ["cyber", "security", "hacking", "network security", "ethical"],
    duration: "3 years",
    fee: "Rs. 135,000 per year",
    requirements: "Basic IT knowledge and interest in networks/security",
    description: "Cyber Security teaches ethical hacking, network protection, digital forensics, risk management, and secure systems.",
    modules: ["Network Security", "Ethical Hacking", "Digital Forensics", "Linux Security", "Risk Management", "Security Project"],
    skills: ["Threat detection", "Network protection", "Risk analysis", "Security testing", "Incident response"],
    career: "Cyber Security Analyst, Ethical Hacker, SOC Analyst, Security Engineer",
    link: "https://www.cisco.com/site/us/en/learn/training-certifications/security.html"
  },
  {
    name: "Data Science",
    keywords: ["data", "science", "analytics", "statistics", "big data"],
    duration: "2 years",
    fee: "Rs. 110,000 per year",
    requirements: "Basic mathematics and computer knowledge",
    description: "Data Science teaches data analysis, visualization, statistics, Python, and machine learning basics.",
    modules: ["Python for Data Science", "Statistics", "Data Visualization", "Machine Learning Basics", "Data Mining", "Analytics Project"],
    skills: ["Data cleaning", "Data visualization", "Statistical thinking", "Python", "Prediction models"],
    career: "Data Analyst, Data Scientist, Business Analyst",
    link: "https://www.kaggle.com/learn"
  },
  {
    name: "AI and Machine Learning",
    keywords: ["ai", "artificial", "machine", "learning", "ml"],
    duration: "2 years",
    fee: "Rs. 145,000 per year",
    requirements: "Basic programming and mathematics knowledge",
    description: "AI and Machine Learning teaches intelligent systems, prediction models, NLP, and decision-making algorithms.",
    modules: ["AI Fundamentals", "Machine Learning", "Natural Language Processing", "Neural Networks", "Python AI Libraries", "AI Project"],
    skills: ["Model training", "Intent recognition", "Decision-making systems", "NLP", "Prediction"],
    career: "AI Engineer, ML Engineer, NLP Developer",
    link: "https://developers.google.com/machine-learning/crash-course"
  },
  {
    name: "Web Development",
    keywords: ["web", "website", "html", "css", "javascript", "frontend"],
    duration: "1 year",
    fee: "Rs. 85,000 per year",
    requirements: "No advanced requirement. Beginners can join.",
    description: "Web Development teaches HTML, CSS, JavaScript, responsive design, backend basics, and website deployment.",
    modules: ["HTML", "CSS", "JavaScript", "Responsive Design", "Backend Basics", "Website Hosting"],
    skills: ["Frontend design", "Interactive websites", "Responsive layouts", "Basic backend", "Deployment"],
    career: "Frontend Developer, Web Designer, Full Stack Developer",
    link: "https://www.freecodecamp.org/learn/"
  },
  {
    name: "Computer Networking",
    keywords: ["network", "networking", "router", "server", "ccna"],
    duration: "18 months",
    fee: "Rs. 95,000 per year",
    requirements: "Basic computer knowledge",
    description: "Computer Networking teaches network devices, IP addressing, routing, switching, and server basics.",
    modules: ["Networking Fundamentals", "IP Addressing", "Routing and Switching", "Server Basics", "Network Troubleshooting", "Practical Lab"],
    skills: ["Router configuration", "IP planning", "Troubleshooting", "Server support", "Network monitoring"],
    career: "Network Technician, Network Administrator, System Support Officer",
    link: "https://www.netacad.com/"
  }
];

const faqKnowledge = [
  {
    keywords: ["hi", "hello", "hey"],
    response: "Hello! I am SmartEdu AI. How can I help you with IT courses today?"
  },
  {
    keywords: ["thank", "thanks"],
    response: "You are welcome! Ask me anything about courses, fees, duration, or careers."
  },
  {
    keywords: ["bye", "goodbye"],
    response: "Goodbye! Good luck with your studies."
  },
  {
    keywords: ["contact", "phone", "email"],
    response: "You can contact the institute through info@smartedu.lk or call 011-222-3333."
  },
  {
    keywords: ["payment", "installment", "instalment"],
    response: "Yes, installment payment is available for selected courses."
  },
  {
    keywords: ["certificate", "certification"],
    response: "Yes, students receive a recognized certificate after completing the course."
  },
  {
    keywords: ["online", "physical", "class"],
    response: "Courses are available as physical, online, and blended learning depending on the selected course."
  },
  {
    keywords: ["exam", "assessment"],
    response: "Assessments include assignments, practical projects, quizzes, and final examinations."
  },
  {
    keywords: ["beginner", "no experience", "new"],
    response: "Yes, beginners can join courses such as Web Development, Networking, and Software Engineering foundation modules."
  },
  {
    keywords: ["register", "apply", "application", "admission"],
    response: "To register, choose a course, fill the student application form, submit documents, and pay the registration fee."
  }
];

// ---------------- USER INTERFACE ----------------

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const typing = document.getElementById("typing");
const themeBtn = document.getElementById("themeBtn");
const courseCards = document.getElementById("courseCards");

function addMessage(text, sender, isHtml = false) {
  const message = document.createElement("div");
  message.className = `message ${sender}`;

  const bubble = document.createElement("div");
  bubble.className = "bubble";

  if (isHtml) {
    bubble.innerHTML = text;
  } else {
    bubble.textContent = text;
  }

  message.appendChild(bubble);
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const question = userInput.value.trim();
  if (question === "") return;

  addMessage(question, "user");
  userInput.value = "";

  typing.classList.remove("hidden");

  setTimeout(() => {
    const answer = generateResponse(question);
    typing.classList.add("hidden");

    if (typeof answer === "object") {
      addMessage(answer.html, "bot", true);
    } else {
      addMessage(answer, "bot");
    }
  }, 600);
}

function sendQuick(text) {
  userInput.value = text;
  sendMessage();
}

userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

themeBtn.addEventListener("click", function() {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});


function createCourseChatResponse(course) {
  const index = courses.findIndex(item => item.name === course.name);

  return {
    html: `
      <strong>${course.name}</strong><br>
      ${course.description}<br><br>
      <strong>Duration:</strong> ${course.duration}<br>
      <strong>Fee:</strong> ${course.fee}<br>
      <strong>Career:</strong> ${course.career}<br><br>

      <div class="chat-action-row">
        <button onclick="openCourseDetails(${index})">View Course Details</button>
        <button onclick="selectCourseForRegistration('${course.name}')">Register</button>
        <a href="${course.link}" target="_blank">Open Learning Link</a>
      </div>
    `
  };
}

function createCourseListChatResponse() {
  return {
    html: `
      <strong>Available Courses</strong><br>
      Click any course below to view full details:<br><br>
      <div class="chat-course-list">
        ${courses.map((course, index) => `
          <button onclick="openCourseDetails(${index})">${course.name}</button>
        `).join("")}
      </div>
    `
  };
}

// ---------------- INFERENCE ENGINE ----------------

function preprocessInput(input) {
  return input
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(word => word.length > 0);
}

function findCourse(tokens) {
  let bestCourse = null;
  let highestScore = 0;

  for (const course of courses) {
    let score = 0;

    for (const keyword of course.keywords) {
      const keywordTokens = keyword.toLowerCase().split(" ");
      for (const token of tokens) {
        if (keywordTokens.includes(token)) {
          score++;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCourse = course;
    }
  }

  return bestCourse;
}

function detectIntent(tokens) {
  const text = tokens.join(" ");

  if (hasAny(tokens, ["course", "courses", "available", "offer", "list"])) return "list_courses";
  if (hasAny(tokens, ["fee", "fees", "cost", "price", "payment"])) return "course_fee";
  if (hasAny(tokens, ["duration", "long", "years", "months", "time"])) return "course_duration";
  if (hasAny(tokens, ["requirement", "requirements", "qualification", "eligible", "entry"])) return "requirements";
  if (hasAny(tokens, ["career", "job", "jobs", "opportunity", "salary"])) return "career";
  if (hasAny(tokens, ["best", "recommend", "suitable", "choose"])) return "recommendation";
  if (hasAny(tokens, ["difference", "compare"])) return "comparison";
  if (hasAny(tokens, ["about", "tell", "explain", "details"])) return "course_details";

  return "general";
}

function hasAny(tokens, words) {
  return words.some(word => tokens.includes(word));
}

function generateResponse(question) {
  const tokens = preprocessInput(question);
  const intent = detectIntent(tokens);
  const course = findCourse(tokens);

  // FAQ matching
  for (const item of faqKnowledge) {
    if (item.keywords.some(keyword => tokens.includes(keyword))) {
      return item.response;
    }
  }

  // Course listing
  if (intent === "list_courses") {
    return createCourseListChatResponse();
  }

  // Recommendation logic
  if (intent === "recommendation") {
    if (hasAny(tokens, ["programming", "coding", "developer"])) {
      return "I recommend Software Engineering or Web Development because they focus on coding, application development, and programming skills.";
    }
    if (hasAny(tokens, ["security", "hacking", "network"])) {
      return "I recommend Cyber Security because it focuses on ethical hacking, network protection, and digital security.";
    }
    if (hasAny(tokens, ["data", "statistics", "analysis"])) {
      return "I recommend Data Science because it focuses on data analysis, statistics, and machine learning.";
    }
    return "For beginners, I recommend Web Development. For programming careers, Software Engineering is best. For security careers, Cyber Security is best.";
  }

  // Comparison
  if (intent === "comparison") {
    if (tokens.includes("software") && tokens.includes("cyber")) {
      return "Software Engineering focuses on developing applications and software systems. Cyber Security focuses on protecting systems, networks, and data from attacks.";
    }
    return "Please mention two courses you want to compare. Example: Compare Software Engineering and Cyber Security.";
  }

  // Course specific answers
  if (course) {
    if (intent === "course_fee") {
      return {
        html: `<strong>${course.name}</strong> course fee is <strong>${course.fee}</strong>.<br><br>
        <div class="chat-action-row">
          <button onclick="openCourseDetails(${courses.findIndex(item => item.name === course.name)})">View Full Details</button>
          <a href="${course.link}" target="_blank">Open Learning Link</a>
        </div>`
      };
    }
    if (intent === "course_duration") {
      return {
        html: `<strong>${course.name}</strong> course duration is <strong>${course.duration}</strong>.<br><br>
        <div class="chat-action-row">
          <button onclick="openCourseDetails(${courses.findIndex(item => item.name === course.name)})">View Full Details</button>
          <a href="${course.link}" target="_blank">Open Learning Link</a>
        </div>`
      };
    }
    if (intent === "requirements") {
      return {
        html: `<strong>${course.name}</strong> entry requirements:<br>${course.requirements}.<br><br>
        <div class="chat-action-row">
          <button onclick="openCourseDetails(${courses.findIndex(item => item.name === course.name)})">View Full Details</button>
          <a href="${course.link}" target="_blank">Open Learning Link</a>
        </div>`
      };
    }
    if (intent === "career") {
      return {
        html: `After <strong>${course.name}</strong>, career options include:<br>${course.career}.<br><br>
        <div class="chat-action-row">
          <button onclick="openCourseDetails(${courses.findIndex(item => item.name === course.name)})">View Full Details</button>
          <a href="${course.link}" target="_blank">Open Learning Link</a>
        </div>`
      };
    }
    return createCourseChatResponse(course);
  }

  // General knowledge answers
  if (tokens.includes("ai") || tokens.includes("artificial")) {
    return "Artificial Intelligence is a field of computing where systems can perform tasks that normally require human intelligence, such as decision-making, learning, and natural language understanding.";
  }

  if (tokens.includes("database")) {
    return "A database is an organized collection of data. In this chatbot, the knowledge base stores course details, FAQs, and responses.";
  }

  if (tokens.includes("nlp")) {
    return "NLP means Natural Language Processing. It helps the chatbot understand human language by processing words, keywords, and intent.";
  }

  // Learning feature simulation
  saveUnknownQuestion(question);
  return "I am not fully sure about that question. I saved it as an unknown question so the knowledge base can be improved later.";
}

function saveUnknownQuestion(question) {
  let unknownQuestions = JSON.parse(localStorage.getItem("unknownQuestions")) || [];
  unknownQuestions.push({
    question: question,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("unknownQuestions", JSON.stringify(unknownQuestions));
}

// ---------------- COURSE CARD DISPLAY ----------------

function loadCourseCards() {
  courseCards.innerHTML = "";

  courses.forEach((course, index) => {
    const card = document.createElement("div");
    card.className = "course-card clickable-card";
    card.onclick = () => openCourseDetails(index);
    card.innerHTML = `
      <h3>${course.name}</h3>
      <p>${course.description}</p>
      <div class="course-meta">⏱ ${course.duration}</div>
      <div class="course-meta">💰 ${course.fee}</div>
      <button class="details-btn">View Full Details</button>
    `;
    courseCards.appendChild(card);
  });
}

function openCourseDetails(index) {
  const course = courses[index];
  const modal = document.getElementById("courseModal");
  const details = document.getElementById("courseDetails");

  details.innerHTML = `
    <h2>${course.name}</h2>
    <p class="modal-description">${course.description}</p>

    <div class="detail-grid">
      <div class="detail-box"><strong>Duration</strong><br>${course.duration}</div>
      <div class="detail-box"><strong>Fee</strong><br>${course.fee}</div>
      <div class="detail-box"><strong>Entry Requirements</strong><br>${course.requirements}</div>
      <div class="detail-box"><strong>Career Path</strong><br>${course.career}</div>
    </div>

    <h3>Course Modules</h3>
    <ul class="detail-list">
      ${course.modules.map(module => `<li>${module}</li>`).join("")}
    </ul>

    <h3>Skills You Will Learn</h3>
    <ul class="detail-list">
      ${course.skills.map(skill => `<li>${skill}</li>`).join("")}
    </ul>

    <div class="modal-actions">
      <a href="${course.link}" target="_blank" class="external-link">Open Learning Link</a>
      <button onclick="selectCourseForRegistration('${course.name}')">Register for this Course</button>
      <button onclick="askBotAboutCourse('${course.name}')">Ask Chatbot About This Course</button>
    </div>
  `;

  modal.classList.remove("hidden");
}

function closeCourseDetails() {
  document.getElementById("courseModal").classList.add("hidden");
}

function selectCourseForRegistration(courseName) {
  document.getElementById("selectedCourse").value = courseName;
  closeCourseDetails();
  document.querySelector(".registration-section").scrollIntoView({ behavior: "smooth" });
  addMessage(`You selected ${courseName}. Please complete the registration form below.`, "bot");
}

function askBotAboutCourse(courseName) {
  closeCourseDetails();
  userInput.value = `Tell me about ${courseName}`;
  sendMessage();
}

window.addEventListener("click", function(event) {
  const modal = document.getElementById("courseModal");
  if (event.target === modal) {
    closeCourseDetails();
  }
});

loadCourseCards();


// ---------------- STUDENT REGISTRATION SYSTEM ----------------

const registrationForm = document.getElementById("registrationForm");
const registrationList = document.getElementById("registrationList");

registrationForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const registration = {
    name: document.getElementById("studentName").value,
    email: document.getElementById("studentEmail").value,
    phone: document.getElementById("studentPhone").value,
    course: document.getElementById("selectedCourse").value,
    message: document.getElementById("studentMessage").value,
    status: "Pending",
    date: new Date().toLocaleString()
  };

  let registrations = JSON.parse(localStorage.getItem("studentRegistrations")) || [];
  registrations.push(registration);
  localStorage.setItem("studentRegistrations", JSON.stringify(registrations));

  registrationForm.reset();

  addMessage(
    `Registration submitted successfully for ${registration.course}. Status: Pending.`,
    "bot"
  );

  showRegistrations();
});

function showRegistrations() {
  let registrations = JSON.parse(localStorage.getItem("studentRegistrations")) || [];

  if (registrations.length === 0) {
    registrationList.innerHTML = `<div class="registration-item">No registrations yet.</div>`;
    return;
  }

  registrationList.innerHTML = registrations.map((item, index) => `
    <div class="registration-item">
      <strong>Registration ${index + 1}</strong><br>
      Name: ${item.name}<br>
      Email: ${item.email}<br>
      Phone: ${item.phone}<br>
      Course: ${item.course}<br>
      Status: ${item.status}<br>
      Date: ${item.date}<br>
      Message: ${item.message || "No message"}
    </div>
  `).join("");
}

function clearRegistrations() {
  localStorage.removeItem("studentRegistrations");
  registrationList.innerHTML = `<div class="registration-item">registration data cleared.</div>`;
}
