package backend;

public class IntentDetector {

    public static String detectIntent(String input) {
        String text = input.toLowerCase();

        if (text.contains("fee") || text.contains("cost") || text.contains("price")) {
            return "course_fee";
        }

        if (text.contains("duration") || text.contains("long") || text.contains("time")) {
            return "course_duration";
        }

        if (text.contains("requirement") || text.contains("qualification") || text.contains("eligible")) {
            return "requirements";
        }

        if (text.contains("career") || text.contains("job")) {
            return "career";
        }

        if (text.contains("course") || text.contains("available") || text.contains("offer")) {
            return "list_courses";
        }

        if (text.contains("best") || text.contains("recommend")) {
            return "recommendation";
        }

        return "general";
    }
}
