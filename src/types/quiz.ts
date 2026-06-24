export interface Option {
  label: string;
  emoji: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Food {
  name: string;
  emoji: string;
  size: string;
  time: string[];
  diet: string[];
  meatType?: string[];
  flavor: string;
  temp: string;
  weight: string;
}

export type Answers = Record<string, string>;

export type Phase = 'idle' | 'asking' | 'result';
