import { useState } from 'react';
import type { Answers, Food, Phase, Question } from '@/types/quiz';

// ─── Data ────────────────────────────────────────────────────────────────────

const MEAT_FOLLOW_UP: Question = {
  id: 'meatType',
  text: 'What kind of meat?',
  options: [
    { label: 'Beef',    emoji: '🐄', value: 'beef' },
    { label: 'Chicken', emoji: '🍗', value: 'chicken' },
    { label: 'Pork',    emoji: '🐷', value: 'pork' },
    { label: 'Fish',    emoji: '🐟', value: 'fish' },
    { label: 'Any',     emoji: '🥩', value: 'any' },
  ],
};

const BASE_QUESTIONS: Question[] = [
  {
    id: 'size',
    text: 'Full meal or small bites?',
    options: [
      { label: 'Full Meal',    emoji: '🍽️', value: 'full' },
      { label: 'Small Bites', emoji: '🥢',  value: 'small' },
    ],
  },
  {
    id: 'time',
    text: 'What kind of meal?',
    options: [
      { label: 'Breakfast', emoji: '🌅', value: 'breakfast' },
      { label: 'Brunch',    emoji: '🥂', value: 'brunch' },
      { label: 'Lunch',     emoji: '☀️', value: 'lunch' },
      { label: 'Dinner',    emoji: '🌙', value: 'dinner' },
      { label: 'Dessert',   emoji: '🍰', value: 'dessert' },
    ],
  },
  {
    id: 'diet',
    text: 'Any dietary preference?',
    options: [
      { label: 'Meat',         emoji: '🥩', value: 'meat' },
      { label: 'Vegetarian',   emoji: '🥦', value: 'vegetarian' },
      { label: 'Pescatarian',  emoji: '🐟', value: 'pescatarian' },
    ],
  },
  {
    id: 'flavor',
    text: 'Sweet or savory?',
    options: [
      { label: 'Sweet',  emoji: '🍯', value: 'sweet' },
      { label: 'Savory', emoji: '🧂', value: 'savory' },
    ],
  },
  {
    id: 'temp',
    text: 'Warm or cold?',
    options: [
      { label: 'Warm', emoji: '♨️', value: 'warm' },
      { label: 'Cold', emoji: '❄️', value: 'cold' },
    ],
  },
  {
    id: 'weight',
    text: 'Heavy or light?',
    options: [
      { label: 'Heavy', emoji: '🏋️', value: 'heavy' },
      { label: 'Light', emoji: '🪶',  value: 'light' },
    ],
  },
];

const FOODS: Food[] = [
  { name: 'Eggs & Bacon',        emoji: '🍳', size: 'full',  time: ['breakfast'],           diet: ['meat'],                           meatType: ['pork','any'],              flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pancakes',            emoji: '🥞', size: 'full',  time: ['breakfast','brunch'],  diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Avocado Toast',       emoji: '🥑', size: 'full',  time: ['breakfast','brunch'],  diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Oatmeal',             emoji: '🥣', size: 'full',  time: ['breakfast'],           diet: ['vegetarian','pescatarian','meat'],                                        flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Acai Bowl',           emoji: '🫐', size: 'full',  time: ['breakfast','brunch'],  diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Eggs Benedict',       emoji: '🍳', size: 'full',  time: ['brunch'],              diet: ['meat','pescatarian'],             meatType: ['pork','any'],              flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'French Toast',        emoji: '🍞', size: 'full',  time: ['breakfast','brunch'],  diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Caesar Salad',        emoji: '🥗', size: 'full',  time: ['lunch'],               diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Burrito',             emoji: '🌯', size: 'full',  time: ['lunch','dinner'],      diet: ['meat','vegetarian'],              meatType: ['beef','chicken','any'],    flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Tomato Soup',         emoji: '🍅', size: 'full',  time: ['lunch'],               diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Sushi',               emoji: '🍱', size: 'full',  time: ['lunch','dinner'],      diet: ['pescatarian','meat'],             meatType: ['any'],                     flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Steak',               emoji: '🥩', size: 'full',  time: ['dinner'],              diet: ['meat'],                           meatType: ['beef','any'],              flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Grilled Chicken',     emoji: '🍗', size: 'full',  time: ['dinner','lunch'],      diet: ['meat'],                           meatType: ['chicken','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'BBQ Ribs',            emoji: '🍖', size: 'full',  time: ['dinner'],              diet: ['meat'],                           meatType: ['pork','beef','any'],       flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Grilled Salmon',      emoji: '🐟', size: 'full',  time: ['dinner','lunch'],      diet: ['pescatarian','meat'],             meatType: ['any'],                     flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Veggie Stir Fry',     emoji: '🥦', size: 'full',  time: ['dinner','lunch'],      diet: ['vegetarian','pescatarian','meat'],                                        flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Ramen',               emoji: '🍜', size: 'full',  time: ['dinner','lunch'],      diet: ['meat','vegetarian','pescatarian'], meatType: ['pork','chicken','any'],   flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pizza',               emoji: '🍕', size: 'full',  time: ['dinner','lunch'],      diet: ['meat','vegetarian'],              meatType: ['beef','pork','any'],       flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Burger',              emoji: '🍔', size: 'full',  time: ['dinner','lunch'],      diet: ['meat','vegetarian'],              meatType: ['beef','any'],              flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pasta Carbonara',     emoji: '🍝', size: 'full',  time: ['dinner'],              diet: ['meat'],                           meatType: ['pork','any'],              flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Chicken Stir Fry',    emoji: '🍳', size: 'full',  time: ['dinner','lunch'],      diet: ['meat'],                           meatType: ['chicken','any'],           flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Chocolate Lava Cake', emoji: '🍫', size: 'full',  time: ['dessert'],             diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Crème Brûlée',        emoji: '🍮', size: 'full',  time: ['dessert'],             diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Yogurt Parfait',      emoji: '🍓', size: 'small', time: ['breakfast','brunch'],  diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Charcuterie Board',   emoji: '🧀', size: 'small', time: ['brunch','dinner'],     diet: ['meat'],                           meatType: ['pork','beef','any'],       flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Hummus & Pita',       emoji: '🫓', size: 'small', time: ['lunch','brunch'],      diet: ['vegetarian','pescatarian','meat'],                                        flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Tacos',               emoji: '🌮', size: 'small', time: ['lunch','dinner'],      diet: ['meat','vegetarian','pescatarian'], meatType: ['beef','chicken','pork','any'], flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Chicken Wings',       emoji: '🍗', size: 'small', time: ['lunch','dinner'],      diet: ['meat'],                           meatType: ['chicken','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pork Dumplings',      emoji: '🥟', size: 'small', time: ['lunch','dinner'],      diet: ['meat'],                           meatType: ['pork','any'],              flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Veggie Dumplings',    emoji: '🥟', size: 'small', time: ['lunch','dinner'],      diet: ['vegetarian','pescatarian','meat'],                                        flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Nachos',              emoji: '🧆', size: 'small', time: ['lunch','dinner'],      diet: ['meat','vegetarian'],              meatType: ['beef','chicken','any'],    flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Shrimp Cocktail',     emoji: '🦐', size: 'small', time: ['dinner','lunch'],      diet: ['pescatarian','meat'],             meatType: ['any'],                     flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Caprese',             emoji: '🍅', size: 'small', time: ['lunch','brunch'],      diet: ['vegetarian','pescatarian','meat'],                                        flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Ice Cream',           emoji: '🍦', size: 'small', time: ['dessert'],             diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Warm Brownie',        emoji: '🍫', size: 'small', time: ['dessert'],             diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Churros',             emoji: '🥐', size: 'small', time: ['dessert','brunch'],    diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Macarons',            emoji: '🍬', size: 'small', time: ['dessert'],             diet: ['meat','vegetarian','pescatarian'],                                        flavor: 'sweet',  temp: 'cold', weight: 'light' },
];

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function buildQuestions(answers: Answers): Question[] {
  const questions = [...BASE_QUESTIONS];
  if (answers.diet === 'meat') {
    const dietIndex = questions.findIndex(q => q.id === 'diet');
    questions.splice(dietIndex + 1, 0, MEAT_FOLLOW_UP);
  }
  return questions;
}

function recommend(answers: Answers): Food {
  const scored = FOODS.map(food => {
    let score = 0;
    if (answers.size     && food.size === answers.size)              score++;
    if (answers.time     && food.time.includes(answers.time))        score++;
    if (answers.diet     && food.diet.includes(answers.diet))        score++;
    if (answers.meatType && food.meatType?.includes(answers.meatType)) score++;
    if (answers.flavor   && food.flavor === answers.flavor)          score++;
    if (answers.temp     && food.temp === answers.temp)              score++;
    if (answers.weight   && food.weight === answers.weight)          score++;
    return { food, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0].food;
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
