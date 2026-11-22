package backend;

public class ResponseGenerator {

    public static String generateResponse(String question) {
        String intent = IntentDetector.detectIntent(question);
        String text = question.toLowerCase();

        if (text.contains("hello") || text.contains("hi")) {
            return "Hello! I am SmartEdu AI. How can I help you?";
        }

        if (intent.equals("list_courses")) {
            return "Available courses: Software Engineering, Cyber Security, Data Science, AI and Machine Learning, Web Development, Computer Networking.";
        }

        if (text.contains("software")) {
            if (intent.equals("course_fee")) return "Software Engineering fee is Rs. 120,000 per year.";
            if (intent.equals("course_duration")) return "Software Engineering duration is 3 years.";
            return "Software Engineering teaches programming, system design, testing, and application development.";
        }

        if (text.contains("cyber")) {
            if (intent.equals("course_fee")) return "Cyber Security fee is Rs. 135,000 per year.";
            if (intent.equals("course_duration")) return "Cyber Security duration is 3 years.";
            return "Cyber Security teaches ethical hacking, network protection, and digital security.";
        }

        if (intent.equals("recommendation")) {
            return "For programming, choose Software Engineering. For security, choose Cyber Security. For beginners, choose Web Development.";
        }

        return "I am not fully sure about that question. It can be saved into the unknown questions table for future training.";
    }
}
