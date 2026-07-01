import { Button } from '@/components/ui/button';
import { SpinningWheel } from '@/components/SpinningWheel';
import { useQuestionnaire } from '@/hooks/useQuestionnaire';

export function Home() {
  const { phase, step, questions, question, result, start, pick, skip, back } = useQuestionnaire();

  if (phase === 'idle') {
    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        {/* Dark hero — Uber Eats inspired */}
        <section className="bg-[#141414] text-white px-5 py-20 text-center flex flex-col items-center gap-6">
          <h1 className="text-5xl font-black tracking-tight leading-tight max-w-sm">
            Can't decide<br />what to eat?
          </h1>
          <p className="text-white/60 text-lg max-w-xs">
            Spin the wheel, answer a few questions, and we'll figure it out for you.
          </p>
          <Button
            size="lg"
            onClick={start}
            className="mt-2 px-10 h-14 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
          >
            Let's Eat 🍽️
          </Button>
        </section>

        {/* Feature strip */}
        <section className="bg-white border-t border-border px-5 py-10">
          <div className="mx-auto max-w-2xl grid grid-cols-3 gap-6 text-center">
            {[
              { emoji: '🎡', label: 'Spin to decide' },
              { emoji: '⚡', label: 'Done in seconds' },
              { emoji: '🎯', label: 'Personalized picks' },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{emoji}</span>
                <span className="text-sm font-semibold text-foreground/80">{label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (phase === 'result' && result) {
    const query = encodeURIComponent(result.name);
    const doorDashUrl = `https://www.doordash.com/search/store/${query}/`;
    const uberEatsUrl = `https://www.ubereats.com/search?q=${query}`;
    const grubhubUrl = `https://www.grubhub.com/search?queryText=${query}`;

    return (
      <main className="flex flex-col items-center justify-center gap-8 px-5 py-20">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Card top banner */}
          <div className="bg-primary px-6 py-4">
            <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Your pick</p>
          </div>
          <div className="px-6 py-10 text-center flex flex-col items-center gap-4">
            <h2 className="text-4xl font-black tracking-tight">{result.name}</h2>
            <p className="text-muted-foreground">Order it now 👇</p>
          </div>
        </div>

        {/* Delivery links */}
        <div className="flex w-full max-w-sm flex-col gap-3">
          <Button
            asChild
            className="h-12 rounded-full bg-[#FF3008] font-bold text-white hover:bg-[#FF3008]/90"
          >
            <a href={doorDashUrl} target="_blank" rel="noopener noreferrer">
              Order on DoorDash
            </a>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full bg-[#06C167] font-bold text-white hover:bg-[#06C167]/90"
          >
            <a href={uberEatsUrl} target="_blank" rel="noopener noreferrer">
              Order on Uber Eats
            </a>
          </Button>
          <Button
            asChild
            className="h-12 rounded-full bg-[#F63440] font-bold text-white hover:bg-[#F63440]/90"
          >
            <a href={grubhubUrl} target="_blank" rel="noopener noreferrer">
              Order on Grubhub
            </a>
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={start}
          className="rounded-full px-8 font-semibold"
        >
          Start over
        </Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center gap-10 px-5 py-12">
      {/* Question header */}
      <div className="text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          Question {step + 1} of {questions.length}
        </span>
        <h2 className="text-3xl font-black tracking-tight">{question.text}</h2>
      </div>

      {/* Wheel — key forces fresh rotation state on each question */}
      <SpinningWheel
        key={question.id}
        options={question.options}
        onSelect={pick}
        onSkip={skip}
        onPrevious={back}
        canPrevious={step > 0}
      />

      {/* Progress dots */}
      <div className="flex gap-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i < step
                ? 'w-6 bg-primary'
                : i === step
                ? 'w-6 bg-primary/35'
                : 'w-2 bg-muted-foreground/20'
            }`}
          />
        ))}
      </div>
    </main>
  );
}