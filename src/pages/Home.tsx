import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';

export function Home() {
  const { phase, step, questions, question, result, start, pick } = useQuestionnaire();

  if (phase === 'idle') {
    return (
      <main className="flex flex-col items-center justify-center gap-8 px-4 py-28">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Can't decide what to eat?</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Answer a few quick questions and we'll tell you exactly what to order.
          </p>
        </div>
        <Button size="lg" onClick={start} className="px-8">
          Let's Eat! 🍽️
        </Button>
      </main>
    );
  }

  if (phase === 'result' && result) {
    return (
      <main className="flex flex-col items-center justify-center gap-8 px-4 py-28">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4 text-xs uppercase tracking-widest">
            You're having...
          </Badge>
          <div className="mt-4 text-8xl">{result.emoji}</div>
          <h2 className="mt-4 text-5xl font-bold">{result.name}</h2>
          <p className="mt-3 text-muted-foreground">Enjoy your meal!</p>
        </div>
        <Button variant="outline" onClick={start}>Start over</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center gap-10 px-4 py-16">
      <div className="text-center">
        <Badge variant="secondary" className="mb-3 text-xs uppercase tracking-widest">
          Question {step + 1} of {questions.length}
        </Badge>
        <h2 className="text-2xl font-bold">{question.text}</h2>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {question.options.map((opt) => (
          <Card
            key={opt.value}
            onClick={() => pick(opt.value)}
            style={{ width: '160px', minHeight: '160px', cursor: 'pointer' }}
            className="group transition hover:ring-primary hover:ring-2 active:scale-95"
          >
            <CardContent className="flex h-full flex-col items-center justify-center gap-3 py-8">
              <span style={{ fontSize: '3rem', lineHeight: 1 }} className="transition-transform group-hover:scale-110">
                {opt.emoji}
              </span>
              <span className="text-center text-base font-semibold">{opt.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-1.5">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i < step ? 'bg-primary' : i === step ? 'bg-primary/40' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </main>
  );
}
