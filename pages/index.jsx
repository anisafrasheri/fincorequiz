// pages/index.tsx
import { useState } from "react";

const questions = [
    {
        question: "What is your primary financial goal?",
        options: ["Save money", "Invest wisely", "Track spending"],
    },
    {
        question: "How do you usually manage your finances?",
        options: ["Spreadsheet", "Budgeting App", "In my head"],
    },
    {
        question: "What kind of support are you looking for?",
        options: ["Tips and reminders", "Investment guidance", "Expense tracking"],
    },
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    const handleAnswer = (answer) => {

        const newAnswers = [...answers, answer];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Redirect to chatbot recommendation
            const type = determineChatbotType(newAnswers);
            window.location.href = `/result/${type}`;
        }
    };

    const determineChatbotType = (answers) => {
        if (answers.includes("Invest wisely")) return "investor";
        if (answers.includes("Save money")) return "saver";
        if (answers.includes("Track spending")) return "tracker";
        return "general";
    };

    const current = questions[currentQuestion];

    return (
        <div style={{ fontFamily: "sans-serif", padding: "2rem", backgroundColor: "#e6f0ff", minHeight: "100vh" }}>
            <h1 style={{ color: "#0057b7" }}>🧠 Your Personal Finance Quiz</h1>
            <h2>{current.question}</h2>
            <div>
                {current.options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        style={{
                            margin: "1rem 0.5rem",
                            padding: "0.75rem 1.5rem",
                            backgroundColor: "#0070f3",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
