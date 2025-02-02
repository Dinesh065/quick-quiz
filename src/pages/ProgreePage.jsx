import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMedal, FaFire, FaStar, FaCoins } from "react-icons/fa"; // Game-like icons

const ProgressPage = () => {
  const [xp, setXP] = useState(() => parseInt(localStorage.getItem("xp")) || 0);
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem("level")) || 1);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("streak")) || 0);
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem("coins")) || 0);
  const navigate = useNavigate();

  useEffect(() => {
    setXP(parseInt(localStorage.getItem("xp")) || 0);
    setLevel(parseInt(localStorage.getItem("level")) || 1);
    setStreak(parseInt(localStorage.getItem("streak")) || 0);
    setCoins(parseInt(localStorage.getItem("coins")) || 0);
  }, []);

  const achievements = [
    { id: 1, title: "Streak Master", condition: streak >= 5, icon: <FaFire className="text-red-500" /> },
    { id: 2, title: "Level Up", condition: level > 1, icon: <FaMedal className="text-yellow-500" /> },
    { id: 3, title: "Accuracy Pro", condition: xp >= 500, icon: <FaStar className="text-blue-500" /> },
    { id: 4, title: "Coin Collector", condition: coins >= 5, icon: <FaCoins className="text-yellow-400" /> },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">🏆 Your Progress</h2>
      
      <div className="bg-black p-6 rounded-2xl shadow-2xl w-96 text-center border-4 border-yellow-500">
        <h3 className="text-2xl font-bold mb-3 text-yellow-400 flex items-center justify-center gap-2">
          <FaFire /> Streak: <span className="text-orange-500">{streak}</span>
        </h3>
        <h3 className="text-2xl font-bold mb-3 text-blue-400 flex items-center justify-center gap-2">
          <FaMedal /> Level: <span className="text-blue-500">{level}</span>
        </h3>
        <h3 className="text-2xl font-bold mb-3 text-green-400 flex items-center justify-center gap-2">
          <FaStar /> XP: <span className="text-green-500">{xp} / {level * 100}</span>
        </h3>

        {/* Coins Display */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <h3 className="text-lg font-bold text-yellow-300 flex items-center gap-2">
            <FaCoins /> Coins:
          </h3>
          <span className="text-yellow-400 text-2xl font-bold">{coins} ×</span>
          <img src="/images/coin1.gif" alt="Coin" className="w-8 h-8" />
        </div>

        {/* Achievements */}
        <div className="mt-6 text-left">
          <h3 className="text-lg font-bold mb-2 text-yellow-300">🏅 Achievements:</h3>
          <ul className="space-y-2">
            {achievements.map((ach) =>
              ach.condition ? (
                <li key={ach.id} className="text-green-300 flex items-center gap-2">
                  {ach.icon} {ach.title}
                </li>
              ) : null
            )}
          </ul>
        </div>
      </div>

      <button 
        className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-500 transition"
        onClick={() => navigate("/quiz")}
      >
        Start New Quiz
      </button>
    </div>
  );
};

export default ProgressPage;
