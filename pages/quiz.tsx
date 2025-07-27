import { useState } from 'react';
import { useRouter } from 'next/router';

const questions = [
    {
        question: '💰 What is your primary financial goal?',
        options: [
            { text: 'Save money', type: 'Saver' },
            { text: 'Invest wisely', type: 'Investor' },
            { text: 'Track spending', type: 'Tracker' },
        ],
    },
    {
        question: '📈 How comfortable are you with financial risk?',
        options: [
            { text: 'Low', type: 'Saver' },
            { text: 'Medium', type: 'Tracker' },
            { text: 'High', type: 'Investor' },
        ],
    },
    {
        question: '📊 What’s your financial management style?',
        options: [
            { text: 'Careful and planned', type: 'Saver' },
            { text: 'Spontaneous but alert', type: 'Tracker' },
            { text: 'Analytical and strategic', type: 'Investor' },
        ],
    },
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const router = useRouter();

    const handleAnswer = (type: string) => {
        const updatedAnswers = [...answers, type];
        setAnswers(updatedAnswers);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            const result = getMostFrequentType(updatedAnswers);
            router.push(`/result/${result.toLowerCase()}`);
        }
    };

    const getMostFrequentType = (arr: string[]) => {
        const freqMap: Record<string, number> = {};
        arr.forEach(type => {
            freqMap[type] = (freqMap[type] || 0) + 1;
        });

        return Object.keys(freqMap).reduce((a, b) =>
            freqMap[a] > freqMap[b] ? a : b
        );
    };

    const question = questions[currentQuestion];

    return (
        <main className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl text-blue-900">
                <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
                <div className="space-y-4">
                    {question.options.map((opt, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(opt.type)}
                            className="block w-full bg-blue-100 hover:bg-blue-200 px-4 py-3 rounded-xl text-left font-medium text-blue-800 transition"
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
                <div className="text-sm text-blue-600 mt-4">
                    Question {currentQuestion + 1} of {questions.length}
                </div>
            </div>
        </main>
    );
}
