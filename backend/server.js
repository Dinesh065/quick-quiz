const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from other domains
app.use(cors());

// Path to the JSON file containing quiz questions
const jsonFilePath = path.join(__dirname, "questions.json");

// API endpoint to serve quiz questions
app.get("/quiz", (req, res) => {
    // Read the JSON file asynchronously
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
        if (err) {
            // Log error if reading the file fails
            console.error("❌ Error reading JSON file:", err);
            return res.status(500).json({ error: "Failed to load quiz data" }); // Send error response
        }

        try {
            // Parse the file contents as JSON
            const quizData = JSON.parse(data);

            // ✅ Ensure 'questions' key exists and is an array
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                console.error("❌ Invalid JSON format: 'questions' key missing or not an array");
                return res.status(500).json({ error: "Invalid JSON format: 'questions' key missing" });
            }

            // ✅ Format the questions data with relevant fields
            const formattedQuestions = quizData.questions.map(q => ({
                id: q.id, // Question ID
                question: q.description || "No question text available", // Question text
                answers: q.options?.map(opt => opt.description) || [], // Options for the question
                correct_answer: q.options?.find(opt => opt.is_correct)?.description || "No correct answer", // Correct answer
                difficulty: q.difficulty_level || "Unknown", // Difficulty level
                topic: q.topic || "General", // Topic of the question
                explanation: q.detailed_solution || "No explanation provided." // Explanation for the answer
            }));

            // Check if there are any valid questions
            if (formattedQuestions.length === 0) {
                console.error("❌ No valid questions found in JSON.");
                return res.status(500).json({ error: "No valid questions found" });
            }

            // Log and send the successfully formatted questions
            console.log("✅ Successfully sent quiz questions:", formattedQuestions.length);
            res.json(formattedQuestions); // Send the formatted questions as JSON response
        } catch (parseError) {
            // Log error if parsing the JSON fails
            console.error("❌ Error parsing JSON:", parseError);
            return res.status(500).json({ error: "Failed to parse quiz data" });
        }
    });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
