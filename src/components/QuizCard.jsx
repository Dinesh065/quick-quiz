import { useState, useEffect } from "react";
import correctSound from "/sounds/correct.mp3";
import wrongSound from "/sounds/wrong.mp3";

// QuizCard component handles displaying each question, user interaction, and gamification features.
const QuizCard = ({ question, onAnswerSelected, selectedAnswer, readOnly, onNext, onSubmit }) => {
  // State to track locally selected answer
  const [localSelected, setLocalSelected] = useState(selectedAnswer);

  // Update localSelected when selectedAnswer prop changes
  useEffect(() => {
    setLocalSelected(selectedAnswer);
  }, [selectedAnswer]);

  // Handle the answer selection and play the appropriate sound based on correctness
  const handleAnswer = (answer) => {
    if (readOnly || localSelected) return; // Prevent further answers if already selected or in read-only mode
    setLocalSelected(answer); // Update the selected answer
    onAnswerSelected(answer); // Notify the parent component about the answer selection
    const isCorrect = answer === question.correct_answer; // Check if the selected answer is correct
    const audio = new Audio(isCorrect ? correctSound : wrongSound); // Choose the correct audio based on the answer
    audio.play(); // Play the respective sound
  };

  // Return an error message if no question data is available
  if (!question || !question.answers) {
    return (
      <div className="text-center text-red-600 p-4">
        ❌ Error: No question data available.
      </div>
    );
  }

  // Main JSX rendering the question, answers, and user feedback
  return (
    <div className="relative p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 w-full max-w-xl mx-auto">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full text-center transition-all duration-500">
        <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
        <div className="grid grid-cols-1 gap-6">
          {question.answers?.map((answer, index) => {
            const isSelected = localSelected === answer; // Check if this answer is selected
            const isCorrect = answer === question.correct_answer; // Check if this answer is correct
            let bgClass = "bg-blue-500 hover:bg-blue-400"; // Default background color

            // Modify the background class based on whether the answer is selected and correct
            if (localSelected) {
              if (isSelected && isCorrect) {
                bgClass = "bg-gradient-to-r from-green-400 to-green-600 cursor-default"; // Correct answer style
              } else if (isSelected && !isCorrect) {
                bgClass = "bg-gradient-to-r from-red-400 to-red-600 cursor-default"; // Incorrect answer style
              } else {
                bgClass = "bg-blue-500 cursor-not-allowed"; // Disabled style for non-selected answers
              }
            }

            // Render each answer as a button
            return (
              <button
                key={index}
                className={`px-6 py-3 text-white rounded-lg transition ${bgClass}`}
                onClick={() => handleAnswer(answer)} // Trigger handleAnswer on button click
                disabled={readOnly || !!localSelected} // Disable button if in read-only mode or answer is already selected
              >
                {answer}
              </button>
            );
          })}
        </div>

        {/* Feedback after the user selects an answer */}
        {localSelected && (
          <div className="mt-4 text-lg font-bold">
            {localSelected === question.correct_answer ? (
              <p className="text-green-500">🎉 Right Answer! Keep it up!</p> // Correct answer feedback
            ) : (
              <p className="text-red-500">
                ❌ Wrong! Correct Answer: {question.correct_answer} // Incorrect answer feedback
              </p>
            )}
          </div>
        )}

        {/* Buttons to navigate to the next question or submit */}
        <div className="flex justify-between w-full mt-6">
          <button
            onClick={onNext} // Call onNext when 'Next' button is clicked
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all"
          >
            Next
          </button>
          <button
            onClick={onSubmit} // Call onSubmit when 'Submit' button is clicked
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
