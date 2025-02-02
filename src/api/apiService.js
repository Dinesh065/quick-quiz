export const fetchQuizData = async () => {
  try {
    const response = await fetch("http://localhost:5000/quiz");
    if (!response.ok) throw new Error("Failed to fetch questions");

    const data = await response.json();
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No quiz data available");
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching quiz data:", error);
    return []; 
  }
};
