import type { Food, Question } from '@/types/quiz';

export const BASE_QUESTIONS: Question[] = [
  {
    id: 'size',
    text: 'Full meal or small bites?',
    options: [
      { label: 'Full Meal',    emoji: '🍽️', value: 'full' },
      { label: 'Small Bites', emoji: '🥢',  value: 'small' },
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
  {
    id: 'temp',
    text: 'Warm or cold?',
    options: [
      { label: 'Warm', emoji: '♨️', value: 'warm' },
      { label: 'Cold', emoji: '❄️', value: 'cold' },
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
];

export const MEAT_FOLLOW_UP: Question = {
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

export const FOODS: Food[] = [
  // ── Breakfast / Brunch ───────────────────────────────────────────────────────
  { name: 'Eggs & Bacon',        emoji: '🍳', size: 'full',  time: ['breakfast'],                    diet: ['meat'],                            meatType: ['pork','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Waffles',             emoji: '🧇', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Pancakes',            emoji: '🥞', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Avocado Toast',       emoji: '🥑', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Shakshuka',           emoji: '🍳', size: 'full',  time: ['breakfast','brunch'],           diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Oatmeal',             emoji: '🥣', size: 'full',  time: ['breakfast'],                    diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Acai Bowl',           emoji: '🫐', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Smoothie Bowl',       emoji: '🍓', size: 'full',  time: ['breakfast','brunch'],           diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Eggs Benedict',       emoji: '🍳', size: 'full',  time: ['brunch'],                       diet: ['meat','pescatarian'],              meatType: ['pork','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'French Toast',        emoji: '🍞', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Breakfast Burrito',   emoji: '🌯', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian'],               meatType: ['beef','chicken','pork','any'], flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Quiche',              emoji: '🥧', size: 'full',  time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Chia Pudding',        emoji: '🥣', size: 'full',  time: ['breakfast'],                    diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },

  // ── Small Bites — Breakfast / Brunch (savory) ────────────────────────────────
  { name: 'Breakfast Sandwich',  emoji: '🥪', size: 'small', time: ['breakfast','brunch'],           diet: ['meat'],                            meatType: ['pork','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Hash Browns',         emoji: '🥔', size: 'small', time: ['breakfast','brunch'],           diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Bagel & Lox',         emoji: '🥯', size: 'small', time: ['breakfast','brunch'],           diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Cinnamon Roll',       emoji: '🥐', size: 'small', time: ['breakfast','brunch','dessert'], diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },

  // ── Lunch ────────────────────────────────────────────────────────────────────
  { name: 'Caesar Salad',        emoji: '🥗', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Greek Salad',         emoji: '🥗', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Tomato Soup',         emoji: '🍅', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Burrito',             emoji: '🌯', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'], meatType: ['beef','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Banh Mi',             emoji: '🥖', size: 'full',  time: ['lunch'],                        diet: ['meat','pescatarian'],              meatType: ['pork','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Falafel Wrap',        emoji: '🫓', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Cobb Salad',          emoji: '🥗', size: 'full',  time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'cold', weight: 'heavy' },
  { name: 'Pasta Salad',         emoji: '🥗', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'heavy' },
  { name: 'Grain Bowl',          emoji: '🥗', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },

  // ── Lunch & Dinner ───────────────────────────────────────────────────────────
  { name: 'Sushi',               emoji: '🍱', size: 'full',  time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Poke Bowl',           emoji: '🍚', size: 'full',  time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Pad Thai',            emoji: '🍜', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'], meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Veggie Stir Fry',     emoji: '🥦', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Ramen',               emoji: '🍜', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'], meatType: ['pork','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pho',                 emoji: '🍲', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','pescatarian'],              meatType: ['beef','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pizza',               emoji: '🍕', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','pork','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Burger',              emoji: '🍔', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Chicken Stir Fry',    emoji: '🍳', size: 'full',  time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Fish & Chips',        emoji: '🐟', size: 'full',  time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Clam Chowder',        emoji: '🍲', size: 'full',  time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Chicken Parmesan',    emoji: '🍗', size: 'full',  time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Curry',               emoji: '🍛', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'], meatType: ['chicken','beef','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },

  // ── Vegetarian Mains ─────────────────────────────────────────────────────────
  { name: 'Eggplant Parmesan',   emoji: '🍆', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Veggie Burger',       emoji: '🍔', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Mushroom Risotto',    emoji: '🍚', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Margherita Pizza',    emoji: '🍕', size: 'full',  time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },

  // ── American Favorites ───────────────────────────────────────────────────────
  { name: 'Mac & Cheese',        emoji: '🧀', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Fried Chicken',       emoji: '🍗', size: 'full',  time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Hot Dogs',            emoji: '🌭', size: 'small', time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['beef','pork','any'],           flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Grilled Cheese',      emoji: '🧀', size: 'small', time: ['breakfast','brunch','lunch'],   diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Spaghetti & Meatballs', emoji: '🍝', size: 'full', time: ['lunch','dinner'],             diet: ['meat'],                            meatType: ['beef','pork','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Apple Pie',           emoji: '🥧', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'BLT Sandwich',        emoji: '🥪', size: 'small', time: ['breakfast','brunch','lunch'],   diet: ['meat'],                            meatType: ['pork','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Chili',               emoji: '🌶️', size: 'full',  time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pot Roast',           emoji: '🍖', size: 'full',  time: ['dinner'],                       diet: ['meat'],                            meatType: ['beef','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Cornbread',           emoji: '🌽', size: 'small', time: ['breakfast','lunch','dinner'],   diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },

  // ── Dinner ───────────────────────────────────────────────────────────────────
  { name: 'Steak',               emoji: '🥩', size: 'full',  time: ['dinner'],                       diet: ['meat'],                            meatType: ['beef','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Grilled Chicken',     emoji: '🍗', size: 'full',  time: ['dinner','lunch'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'BBQ Ribs',            emoji: '🍖', size: 'full',  time: ['dinner'],                       diet: ['meat'],                            meatType: ['pork','beef','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Grilled Salmon',      emoji: '🐟', size: 'full',  time: ['dinner','lunch'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Pasta Carbonara',     emoji: '🍝', size: 'full',  time: ['dinner'],                       diet: ['meat'],                            meatType: ['pork','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Shrimp Scampi',       emoji: '🦐', size: 'full',  time: ['dinner','lunch'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Lobster Roll',        emoji: '🦞', size: 'full',  time: ['dinner','lunch'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Roast Turkey',        emoji: '🦃', size: 'full',  time: ['dinner'],                       diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'heavy' },

  // ── Dessert ──────────────────────────────────────────────────────────────────
  { name: 'Chocolate Lava Cake', emoji: '🍫', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Crème Brûlée',        emoji: '🍮', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Cheesecake',          emoji: '🍰', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'heavy' },
  { name: 'Tiramisu',            emoji: '🍮', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'heavy' },
  { name: 'Apple Crumble',       emoji: '🍏', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Bread Pudding',       emoji: '🍞', size: 'full',  time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },

  // ── Small Bites — Breakfast / Brunch ─────────────────────────────────────────
  { name: 'Yogurt Parfait',      emoji: '🍓', size: 'small', time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Fruit Salad',         emoji: '🍉', size: 'small', time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Donuts',              emoji: '🍩', size: 'small', time: ['breakfast','brunch','dessert'], diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Croissant',           emoji: '🥐', size: 'small', time: ['breakfast','brunch'],           diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },

  // ── Small Bites — Lunch / Dinner ─────────────────────────────────────────────
  { name: 'Tacos',               emoji: '🌮', size: 'small', time: ['lunch','dinner'],               diet: ['meat','vegetarian','pescatarian'], meatType: ['beef','chicken','pork','any'], flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Fish Tacos',          emoji: '🌮', size: 'small', time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Sliders',             emoji: '🍔', size: 'small', time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['beef','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Quesadilla',          emoji: '🫔', size: 'small', time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','chicken','pork','any'], flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Chicken Wings',       emoji: '🍗', size: 'small', time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['chicken','any'],               flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Gyoza',               emoji: '🥟', size: 'small', time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['pork','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Pork Dumplings',      emoji: '🥟', size: 'small', time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['pork','any'],                  flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Veggie Dumplings',    emoji: '🥟', size: 'small', time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Nachos',              emoji: '🌽', size: 'small', time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','chicken','any'],        flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Loaded Fries',        emoji: '🍟', size: 'small', time: ['lunch','dinner'],               diet: ['meat','vegetarian'],               meatType: ['beef','any'],                  flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Mozzarella Sticks',   emoji: '🧀', size: 'small', time: ['lunch','dinner'],               diet: ['vegetarian','meat','pescatarian'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Edamame',             emoji: '🫛', size: 'small', time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Shrimp Cocktail',     emoji: '🦐', size: 'small', time: ['dinner','lunch'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Ceviche',             emoji: '🍋', size: 'small', time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Caprese',             emoji: '🍅', size: 'small', time: ['lunch','brunch','dinner'],      diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Hummus & Pita',       emoji: '🫓', size: 'small', time: ['lunch','brunch','dinner'],      diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Charcuterie Board',   emoji: '🧀', size: 'small', time: ['brunch','lunch','dinner'],      diet: ['meat','pescatarian'],              meatType: ['pork','beef','any'],           flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Spring Rolls',        emoji: '🥗', size: 'small', time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'light' },
  { name: 'Calamari',            emoji: '🦑', size: 'small', time: ['lunch','dinner'],               diet: ['pescatarian','meat'],              meatType: ['fish','any'],                  flavor: 'savory', temp: 'warm', weight: 'light' },
  { name: 'Meatball Sub',        emoji: '🥖', size: 'small', time: ['lunch','dinner'],               diet: ['meat'],                            meatType: ['beef','pork','any'],           flavor: 'savory', temp: 'warm', weight: 'heavy' },
  { name: 'Caprese Skewers',     emoji: '🍅', size: 'small', time: ['lunch','brunch','dinner'],      diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'cold', weight: 'heavy' },
  { name: 'Buffalo Cauliflower', emoji: '🥦', size: 'small', time: ['lunch','dinner'],               diet: ['vegetarian','pescatarian','meat'],                                             flavor: 'savory', temp: 'warm', weight: 'heavy' },

  // ── Small Bites — Dessert ────────────────────────────────────────────────────
  { name: 'Ice Cream',           emoji: '🍦', size: 'small', time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Warm Brownie',        emoji: '🍫', size: 'small', time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'heavy' },
  { name: 'Churros',             emoji: '🍩', size: 'small', time: ['dessert','brunch'],             diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'warm', weight: 'light' },
  { name: 'Macarons',            emoji: '🍬', size: 'small', time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'light' },
  { name: 'Banana Split',        emoji: '🍌', size: 'small', time: ['dessert'],                      diet: ['meat','vegetarian','pescatarian'],                                             flavor: 'sweet',  temp: 'cold', weight: 'heavy' },
];