import { useState, useEffect } from "react";
import { fetchQuizData } from "../api/apiService";
import QuizCard from "../components/QuizCard";
import Timer from "../components/Timer";
import AttemptTracker from "../components/AttemptTracker";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import confetti from "canvas-confetti";
import correctSound from "/sounds/correct.mp3";
import wrongSound from "/sounds/wrong.mp3";
import bonusSound from "/sounds/bonus.mp3";
import { useNavigate } from "react-router-dom";

// Shuffle the array to randomize the questions
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuizPage = () => {
  // States to track the quiz data, score, attempts, streak, XP, level, and other relevant information
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak")) || 0);
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem("xp")) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem("level")) || 1);
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("coins")) || 0);
  const [bonusTriggered, setBonusTriggered] = useState(false);
  const [showCoin, setShowCoin] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true); // Control Timer
  const navigate = useNavigate();

  // Fetch quiz data and shuffle the questions when the component mounts
  useEffect(() => {
    startNewQuiz();
  }, []);

  // Start a new quiz by fetching data, shuffling questions, and resetting necessary states
  const startNewQuiz = async () => {
    const data = await fetchQuizData();
    const shuffledQuestions = shuffleArray(data);
    setQuestions(shuffledQuestions);
    setAttempts(Array(shuffledQuestions.length).fill(null)); // Initialize attempts
    setCurrentIndex(0);
    setQuizSubmitted(false);
    setShowSummary(false);
    setTimerRunning(true); // Restart Timer
  };

  // Trigger a celebration effect (confetti)
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Handle the answer selection, check if the answer is correct, and update states accordingly
  const handleAnswerSelected = (answer) => {
    if (!questions[currentIndex]) return; // Ensure question exists
    if (attempts[currentIndex] && attempts[currentIndex].status !== "skipped") return; // Prevent multiple answers

    const isCorrect = answer === questions[currentIndex].correct_answer;
    setAttempts((prev) => {
      const newAttempts = [...prev];
      newAttempts[currentIndex] = { answer, status: isCorrect ? "correct" : "wrong" };
      return newAttempts;
    });

    // Play correct or wrong sound and handle XP, streak, and coins
    if (isCorrect) {
      new Audio(correctSound).play();
      handleXP(10);

      setStreak((prev) => {
        const newStreak = prev + 1;
        localStorage.setItem("streak", newStreak);

        // Handle bonus rewards if streak reaches 3
        if (newStreak === 3) {
          new Audio(bonusSound).play();
          setBonusTriggered(true);
          setShowCoin(true);
          setTimeout(() => setShowCoin(false), 2000);

          const newCoins = coins + 1;
          setCoins(newCoins);
          localStorage.setItem("coins", newCoins);

          return 0; // Reset streak
        }

        return newStreak;
      });

      triggerCelebration(); // Trigger celebration effect
    } else {
      new Audio(wrongSound).play();
      setStreak(0);
      localStorage.setItem("streak", 0); // Reset streak if answer is incorrect
    }
  };

  // Handle XP and level up based on the points gained
  const handleXP = (points) => {
    setXP((prevXP) => {
      const newXP = prevXP + points;
      localStorage.setItem("xp", newXP);

      // Level up if XP reaches the threshold
      if (newXP >= level * 100) {
        const newLevel = level + 1;
        localStorage.setItem("level", newLevel);
        setLevel(newLevel);
        return 0;
      }
      return newXP;
    });
  };

  // Move to the next question
  const handleNext = () => {
    // Mark the current question as skipped if no answer has been selected
    if (!attempts[currentIndex]) {
      setAttempts((prev) => {
        const newAttempts = [...prev];
        newAttempts[currentIndex] = { answer: null, status: "skipped" };
        return newAttempts;
      });
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle quiz submission, calculate score, and store results in localStorage
  const handleSubmit = () => {
    const score = attempts.filter((attempt) => attempt && attempt.status === "correct").length;
    const resultObj = {
      score,
      attempts,
      total: questions.length,
      date: new Date().toISOString(),
    };
    localStorage.setItem("quizResult", JSON.stringify(resultObj));
    triggerCelebration();
    setResult(resultObj);
    setQuizSubmitted(true);
    setShowSummary(true);
    setTimerRunning(false); // Stop Timer
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/images/background.png')" }}>
      {/* Navbar Component */}
      <Navbar />

      {/* Main content section */}
      <div className="flex flex-col items-center justify-center flex-1 py-12">
        <div className="max-w-6xl w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: Timer and Attempt Tracker */}
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 shadow-lg">
                {timerRunning && <Timer duration={600} onTimeUp={handleSubmit} />}
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                <AttemptTracker questions={questions} attempts={attempts} onJumpToQuestion={setCurrentIndex} />
              </div>
            </div>
            {/* Right side: Current Quiz Card */}
            <div className="flex flex-col items-center">
              {questions[currentIndex] ? (
                <QuizCard
                  question={questions[currentIndex]}
                  onAnswerSelected={handleAnswerSelected}
                  selectedAnswer={attempts[currentIndex]?.answer}
                  readOnly={attempts[currentIndex] && attempts[currentIndex].status !== "skipped"}
                  onNext={handleNext}
                  onSubmit={handleSubmit}
                  bonusTriggered={bonusTriggered}
                />
              ) : (
                <div className="text-center text-xl text-white">Loading questions...</div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Coin bonus animation */}
      {showCoin && (
        <img
          src="/images/coin.gif"
          alt="Coin Bonus"
          className="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 animate-bounce"
        />
      )}

      {/* Summary Card to display the result after quiz submission */}
      {showSummary && (
        <SummaryCard result={result} onClose={() => navigate("/")} onRestart={startNewQuiz} onNextQuiz={() => navigate("/progress")} />
      )}
    </div>
  );
};

export default QuizPage;
