import { FaRedoAlt, FaArrowRight } from "react-icons/fa";

const SummaryCard = ({ result, onClose, onRestart, onNextQuiz }) => {
  return (
    // Container for the summary card, positioned in the center with a background overlay
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* The summary card itself with gradient background and padding */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 p-8 sm:p-6 md:p-10 rounded-lg shadow-xl max-w-lg w-full text-center relative">
        
        {/* Close button, positioned at the top right of the card */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-3xl text-white hover:text-gray-300"
        >
          &times;
        </button>

        {/* Title for the quiz summary */}
        <h2 className="text-3xl font-extrabold mb-6 text-white">Quiz Summary</h2>
        
        {/* Displaying the score and total */}
        <p className="text-2xl font-semibold text-white mb-2">Score: <span className="text-yellow-400">{result.score}</span> / {result.total}</p>
        
        {/* Displaying the completion date in a readable format */}
        <p className="text-sm text-white opacity-75 mb-6">Completed on: {new Date(result.date).toLocaleString()}</p>

        {/* Buttons for restarting the quiz or moving to the next quiz */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 mt-6">
          
          {/* Button to restart the quiz */}
          <button 
            onClick={onRestart} 
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
          >
            <FaRedoAlt /> Restart Quiz
          </button>
          
          {/* Button to move to the next quiz */}
          <button 
            onClick={onNextQuiz} 
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-all duration-300"
          >
            <FaArrowRight /> Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
