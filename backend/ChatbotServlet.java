package backend;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/chat")
public class ChatbotServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String question = request.getParameter("question");
        String answer = ResponseGenerator.generateResponse(question);

        response.setContentType("text/plain");
        response.getWriter().write(answer);
    }

    // this is a sample comment
}
