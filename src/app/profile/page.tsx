import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CircleUserRound, UtensilsCrossed } from 'lucide-react';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect('/login');

  const [user, picks] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id } }),
    db.pick.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
  ]);

  return (
    <main className="mx-auto max-w-2xl px-5 py-14 flex flex-col gap-6">
      {/* Identity card */}
      <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
        <div className="h-2 bg-primary" />
        <CardHeader className="pt-7">
          <CardTitle className="flex items-center gap-2 text-2xl font-black">
            <CircleUserRound className="size-6 text-primary" />
            {user?.nickname ?? 'Your profile'}
          </CardTitle>
          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
      </Card>

      {/* Pick history */}
      <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-black">Your picks</CardTitle>
          <CardDescription>
            {picks.length === 0
              ? "You haven't saved any picks yet."
              : `${picks.length} saved ${picks.length === 1 ? 'pick' : 'picks'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {picks.length === 0 ? (
            <Button asChild className="rounded-full font-bold">
              <Link href="/">Spin the wheel</Link>
            </Button>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {picks.map((pick) => (
                <li key={pick.id} className="flex items-center gap-3 py-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UtensilsCrossed className="size-4" />
                  </div>
                  <span className="font-semibold">{pick.foodName}</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    {pick.createdAt.toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
