import { useState } from 'react';
import type { Answers, Food, Phase, Question } from '@/types/quiz';
import { BASE_QUESTIONS, FOODS, MEAT_FOLLOW_UP } from '@/constants/options';


// ─── Pure helpers ─────────────────────────────────────────────────────────────

function buildQuestions(answers: Answers): Question[] {
  const questions = [...BASE_QUESTIONS];
  if (answers.diet === 'meat') {
    const dietIndex = questions.findIndex(q => q.id === 'diet');
    questions.splice(dietIndex + 1, 0, MEAT_FOLLOW_UP);
  }
  return questions;
}

// Weighted so "hard" constraints (what meal, what diet, full vs. small) dominate
// the "soft" preferences (warm/cold, heavy/light). This keeps a vegetarian from
// ever being handed a steak and a dessert pick from returning a savory lunch.
const WEIGHTS = {
  diet: 5,
  size: 4,
  time: 4,
  meatType: 3,
  flavor: 3,
  temp: 2,
  weight: 2,
} as const;

function scoreFood(food: Food, answers: Answers): number {
  let score = 0;
  if (answers.size && food.size === answers.size)                    score += WEIGHTS.size;
  if (answers.time && food.time.includes(answers.time))             score += WEIGHTS.time;
  if (answers.diet && food.diet.includes(answers.diet))            score += WEIGHTS.diet;
  if (answers.meatType && food.meatType?.includes(answers.meatType)) score += WEIGHTS.meatType;
  if (answers.flavor && food.flavor === answers.flavor)             score += WEIGHTS.flavor;
  if (answers.temp && food.temp === answers.temp)                    score += WEIGHTS.temp;
  if (answers.weight && food.weight === answers.weight)             score += WEIGHTS.weight;
  return score;
}

function recommend(answers: Answers): Food {
  const scored = FOODS.map(food => ({ food, score: scoreFood(food, answers) }));
  const best = Math.max(...scored.map(s => s.score));
  // Pick randomly among the equally-best matches so the same answers can still
  // surface variety — fitting for a spin-the-wheel app.
  const winners = scored.filter(s => s.score === best);
  return winners[Math.floor(Math.random() * winners.length)].food;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseQuestionnaireReturn {
  phase: Phase;
  step: number;
  questions: Question[];
  question: Question;
  answers: Answers;
  result: Food | null;
  start: () => void;
  pick: (value: string) => void;
}

export function useQuestionnaire(): UseQuestionnaireReturn {
  const [phase, setPhase] = useState<Phase>('idle');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<Food | null>(null);

  const questions = buildQuestions(answers);
  const question = questions[step];

  const start = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setPhase('asking');
  };

  const pick = (value: string) => {
    const next = { ...answers, [questions[step].id]: value };
    const nextQuestions = buildQuestions(next);
    if (step + 1 >= nextQuestions.length) {
      setResult(recommend(next));
      setAnswers(next);
      setPhase('result');
    } else {
      setAnswers(next);
      setStep(step + 1);
    }
  };

  return { phase, step, questions, question, answers, result, start, pick };
}
