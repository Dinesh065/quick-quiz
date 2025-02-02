/**
 * AttemptTracker Component
 * 
 * This component visually tracks the user's progress throughout the quiz.
 * It displays numbered circles representing each quiz question, 
 * with colors indicating the attempt status (Correct, Wrong, Skipped, or Not Attempted).
 * Users can click on a question number to jump directly to that question.
 * 
 * Props:
 * - questions: Array of quiz questions.
 * - attempts: Array containing user attempt details (correct, wrong, skipped, etc.).
 * - onJumpToQuestion: Function to navigate to a specific question.
 * 
 * UI Behavior:
 * - Green (✅) = Correct Answer
 * - Red (❌) = Wrong Answer
 * - Yellow (⚠️) = Skipped
 * - Gray (⬜) = Not Attempted
 */

const AttemptTracker = ({ questions, attempts, onJumpToQuestion }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg w-full md:w-full lg:w-full max-w-full mx-auto">
      {/* Section Header */}
      <h3 className="font-bold mb-2 text-center">Questions</h3>

      {/* Container for Question Status Indicators */}
      <div className="flex flex-wrap justify-center gap-2">
        {questions.map((q, idx) => {
          // Determine the background color based on attempt status
          let bgColor = "bg-gray-300"; // Default: Not Attempted
          if (attempts[idx]) {
            if (attempts[idx].status === "correct") bgColor = "bg-green-500"; // Correct Answer
            else if (attempts[idx].status === "wrong") bgColor = "bg-red-500"; // Incorrect Answer
            else if (attempts[idx].status === "skipped") bgColor = "bg-yellow-500"; // Skipped
          }

          return (
            <div
              key={idx}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer ${bgColor} transition-all hover:scale-110`}
              onClick={() => onJumpToQuestion(idx)} // Click to navigate to the selected question
            >
              {idx + 1} {/* Display Question Number */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttemptTracker;
