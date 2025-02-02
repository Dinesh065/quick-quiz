import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/images/bg1.jpg')" }}>
      {/* Gradient Overlay for better text visibility - Fixed with pointer-events: none */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent pointer-events-none"></div>
      
      <Navbar />
      
      {/* Main Content Wrapper */}
      <div className="relative flex flex-col items-center text-center px-4 sm:px-8 flex-1">
        {/* Title - This will push content downward */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 opacity-0 animate-fadeIn flex-grow">
          Quick Quiz
        </h1>

        {/* Wrapper to push both elements down */}
        <div className="flex flex-col items-center mb-10">
          {/* Subtitle Text - Now Positioned Lower */}
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-lg">
            Test your knowledge and earn bonus points!
          </p>

          {/* Start Quiz Button - Now Positioned Lower */}
          <button
            onClick={() => navigate("/quiz")}
            className="px-8 py-4 text-xl bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
