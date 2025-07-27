import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    {
        question: "How often do you review your financial plans?",
        options: ["Monthly", "Quarterly", "Rarely"],
    },
    {
        question: "Which describes your investment style?",
        options: ["Conservative", "Balanced", "Aggressive"],
    },
];

// Animation variants for swiping questions
const swipeVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

function ProgressBar({ current, total }) {
    const progressPercent = ((current + 1) / total) * 100;
    return (
        <div
            style={{
                height: 8,
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: 4,
                marginBottom: 24,
                marginTop: 5,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: `${progressPercent}%`,
                    backgroundColor: "#0070f3",
                    borderRadius: 4,
                    transition: "width 0.3s ease",
                }}
            />
        </div>
    );
}

function QuestionCounter({ current, total }) {
    return (
        <div
            style={{
                marginBottom: 12,
                fontWeight: "600",
                color: "#0057b7",
                fontSize: 14,
                userSelect: "none",
            }}
        >
            Question {current + 1} of {total}
        </div>
    );
}

function QuestionCard({ question, options, onAnswer, direction, isAnimating }) {
    return (
        <motion.div
            key={question}
            custom={direction}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: "2rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                width: "100%",
                maxWidth: 500,
                userSelect: "none",
                textAlign: "center",
                position: "absolute",
            }}
        >
            <h2 style={{ color: "#0057b7", marginBottom: "1rem" }}>{question}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {options.map((option) => (
                    <motion.button
                        key={option}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => !isAnimating && onAnswer(option)}
                        style={{
                            padding: "0.8rem 1.2rem",
                            backgroundColor: "#0070f3",
                            color: "#fff",
                            border: "none",
                            borderRadius: 12,
                            fontSize: "1rem",
                            cursor: isAnimating ? "not-allowed" : "pointer",
                            boxShadow: "0 2px 8px rgba(0,112,243,0.4)",
                        }}
                        disabled={isAnimating}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0057b7")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0070f3")}
                    >
                        {option}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}

export default function Quiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [direction, setDirection] = useState(0); // swipe direction
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAnswer = (answer) => {
        if (isAnimating) return;

        setIsAnimating(true);
        setDirection(1); // swipe left for next

        setTimeout(() => {
            const newAnswers = [...answers, answer];
            setAnswers(newAnswers);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                const type = determineChatbotType(newAnswers);
                window.location.href = `/result/${type}`;
            }
            setIsAnimating(false);
        }, 400); // animation duration
    };

    const determineChatbotType = (answers) => {
        if (answers.includes("Invest wisely")) return "investor";
        if (answers.includes("Save money")) return "saver";
        if (answers.includes("Track spending")) return "tracker";
        return "general";
    };

    return (
        <div
            style={{
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(to bottom, #f0f4f8, #d9e6f2)",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div style={{ width: "100%", maxWidth: 500, position: "relative" }}>
                <h1
                    style={{
                        color: "#0057b7",
                        fontSize: "1.8rem",
                        marginBottom: "1rem",
                        userSelect: "none",
                        textAlign: "center",
                    }}
                >
                     Your Personal Finance Quiz
                </h1>

                <ProgressBar current={currentIndex} total={questions.length} />
                <QuestionCounter current={currentIndex} total={questions.length} />

                <AnimatePresence initial={false} custom={direction}>
                    <QuestionCard
                        key={currentIndex}
                        question={questions[currentIndex].question}
                        options={questions[currentIndex].options}
                        onAnswer={handleAnswer}
                        direction={direction}
                        isAnimating={isAnimating}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
