// pages/index.tsx
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const startQuiz = () => {
        router.push('/quiz');
    };

    return (
        <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
                Welcome to your Personal Finance AI
            </h1>
            <p className="text-blue-700 mb-6">
                Take this short quiz and let our AI recommend the best financial assistant for you.
            </p>
            <button
                onClick={startQuiz}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700"
            >
                Start the Quiz
            </button>
        </main>
    );
}
