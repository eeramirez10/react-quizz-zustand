import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
    questions: Question[]
    currentQuestion: number
    fectchQuestions: (limit: number) => void
    selectAnswer: (questionId: number, answerIndex: number) => void
    goNextQuestion: () => void
    goPreviusQuestion: () => void
}

export const useQuestionsStore = create<State>((set, get) => {
    return {
        questions: [],
        currentQuestion: 0,
        fectchQuestions: async (limit: number) => {
            const res = await fetch('http://localhost:5173/data.json')
            const data = await res.json();

            const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)

            set({ questions })
        },
        selectAnswer: (questionId, answerIndex) => {
            const { questions } = get()
            const newQuestions = structuredClone(questions)

            const questionIndex = newQuestions.findIndex(question => question.id === questionId);
            const questionInfo = questions[questionIndex]

            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer,
                userSelectedAnswer: answerIndex
            }

            set({ questions: newQuestions })

            if(isCorrectUserAnswer) confetti()


        },
        goNextQuestion:() => {
            const { questions, currentQuestion} = get();

            const nextQuestion = currentQuestion + 1

            if(nextQuestion < questions.length ){
                set({ currentQuestion: nextQuestion})
            }else{
                set({ currentQuestion:0})
            }
        },
        goPreviusQuestion: () => {
            const { questions, currentQuestion} = get();

            const nextQuestion = currentQuestion - 1

            if(nextQuestion >= 0 ){
                set({ currentQuestion: nextQuestion})
            }else{
                set({ currentQuestion: questions.length - 1})
            }
        }
    }
})