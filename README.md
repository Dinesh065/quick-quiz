# 🎮 Quiz App with Gamification

## 📌 Overview
This is a **web-based quiz application** with **gamification features**, inspired by the **Testline App**.  
It has a **Node.js + Express backend** that serves quiz questions from a JSON file,since unable to fetch questions from given api properly and a **React frontend** that provides an interactive UI.

## 🚀 Features
### ✅ Core Features:
- **Start Quiz**: Users can begin the quiz at any time.
- **Multiple-choice questions**: Fetches dynamic quiz questions from API.
- **Results Summary**: Displays final score and correct answers.

### 🎮 Gamification Features:
- **🏆 XP & Level System**: Users earn XP for correct answers and level up.
- **🔥 Streak System**: Consecutive correct answers increase streak count.
- **🏅 Achievements & Badges**: Unlockable badges for quiz milestones.
- **🎉 Confetti & Animations**: Visual effects for correct answers & streaks.
- **🔊 Sound Effects**: Feedback on correct/wrong answers.

---

## 🛠️ Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** JSON file (questions.json)
- **Tools & Libraries:** React Router, React Icons, Confetti.js

---

## 🎥 Demo & Screenshots
**🎬 Video Walkthrough:** [Watch Here](https://drive.google.com/file/d/1yzkUTzbOYLZCh1zX2uOM4YoFaApfNR56/view?usp=sharing)

**🎮Start Page**
![Screenshot 2025-02-02 185652](https://github.com/user-attachments/assets/9ff40d15-6bb2-4885-92ad-b62ae4d31fea)
**📜Quiz Question** 
![Screenshot 2025-02-02 185652](https://github.com/user-attachments/assets/0b8d0979-5ebe-4dc9-9c11-cfe1398784d2)
**🎯Progress Page**
![Screenshot 2025-02-02 185710](https://github.com/user-attachments/assets/2848fd35-44c5-4d11-9d49-d2ecd4b8b841)

---

## 🔗 API Integration
The backend serves quiz data from the JSON file using this endpoint:

```json
GET http://localhost:5000/quiz
```

---

##  📌 Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone "https://github.com/Dinesh065/quick-quiz.git"
   cd quick-quiz
2. **Setup Backend**:
   - Navigate to Backend Folder:
   ```bash
   cd backend
3. **Install Dependencies (Express & CORS)**:
   ```bash
   npm install
4. **Start the Backend Server**:
   ```bash
   node server.js
5. **Setup Frontend**:
   -Navigate to Frontend Folder:
   ```bash
   cd ../frontend
6. **Install Frontend Dependencies**:
   ```bash
   npm install
7. **Start the Frontend App**:
   ```bash
   npm run dev

---


