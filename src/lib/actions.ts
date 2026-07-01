'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { auth } from '@/lib/auth';
import type { Answers } from '@/types/quiz';

export type ActionResult = { success: boolean; error?: string };

const RegisterSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required').max(50),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function registerUser(input: {
  nickname: string;
  email: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = RegisterSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  const { nickname, email, password } = parsed.data;

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return { success: false, error: 'An account with that email already exists.' };
  }

  const hashed = await bcrypt.hash(password, 10);
  await db.user.create({ data: { nickname, email, password: hashed } });

  return { success: true };
}

export async function savePick(foodName: string, answers: Answers): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: 'You must be signed in to save picks.' };
  }

  await db.pick.create({
    data: { userId: session.user.id, foodName, answers },
  });

  return { success: true };
}
