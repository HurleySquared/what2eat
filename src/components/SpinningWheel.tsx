import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Option } from '@/types/quiz';

// Kept in sync with the CSS transition duration below.
const SPIN_MS = 3400;

// Roulette palette: alternating red / black pockets, green for the "Any" pocket.
const ROULETTE_RED = '#B01E28';
const ROULETTE_BLACK = '#171717';
const ROULETTE_GREEN = '#0B6E4F';
const GOLD = '#D4AF37';
const GOLD_DARK = '#A8842B';

function pocketColor(opt: Option, index: number): string {
  if (opt.value === 'any') return ROULETTE_GREEN;
  return index % 2 === 0 ? ROULETTE_RED : ROULETTE_BLACK;
}

const SIZE = 340;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 12;      // outer pocket radius
const R_INNER = 46;           // where the labels start (edge of the hub)

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function segmentPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${largeArc},1 ${end.x},${end.y} Z`;
}

interface Props {
  options: Option[];
  onSelect: (value: string) => void;
  onSkip: () => void;
  onPrevious: () => void;
  canPrevious: boolean;
}

export function SpinningWheel({ options, onSelect, onSkip, onPrevious, canPrevious }: Props) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const segmentAngle = 360 / options.length;
  const fontSize = options.length <= 4 ? 14 : options.length <= 6 ? 12 : 10;

  // Clear any pending selection if the wheel unmounts mid-spin (e.g. the
  // question advances or the user navigates away).
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const spinTo = (index: number) => {
    if (spinning) return;
    const targetNorm = ((360 - (index * segmentAngle + segmentAngle / 2)) % 360 + 360) % 360;
    const currentNorm = ((rotation % 360) + 360) % 360;
    const diff = (targetNorm - currentNorm + 360) % 360;
    const value = options[index].value;
    // Extra full turns for a satisfying roulette spin.
    setRotation(rotation + 1440 + diff);
    setSpinning(true);
    // Advance once the spin finishes. A timer (rather than onTransitionEnd) keeps
    // this reliable even if the transition event is dropped or interrupted.
    timer.current = setTimeout(() => {
      setSpinning(false);
      onSelect(value);
    }, SPIN_MS);
  };

  const pickRandom = () => {
    if (spinning) return;
    spinTo(Math.floor(Math.random() * options.length));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer / ball marker at the top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: -10,
            width: 0,
            height: 0,
            borderLeft: '13px solid transparent',
            borderRight: '13px solid transparent',
            borderTop: `24px solid ${GOLD}`,
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.4))',
          }}
        />

        {/* Wheel */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? `transform ${SPIN_MS}ms cubic-bezier(0.15, 0.6, 0.06, 1)` : 'none',
            willChange: 'transform',
          }}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ cursor: spinning ? 'default' : 'pointer', display: 'block' }}
          >
            <defs>
              <radialGradient id="hubGrad" cx="50%" cy="42%" r="60%">
                <stop offset="0%" stopColor="#FBE9A0" />
                <stop offset="55%" stopColor={GOLD} />
                <stop offset="100%" stopColor={GOLD_DARK} />
              </radialGradient>
              <radialGradient id="wheelShade" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
              </radialGradient>
            </defs>

            {/* Wooden / brass outer rim */}
            <circle cx={CX} cy={CY} r={R + 9} fill={GOLD_DARK} />
            <circle cx={CX} cy={CY} r={R + 5} fill={GOLD} />

            {/* Pockets */}
            {options.map((opt, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const mid = startAngle + segmentAngle / 2;

              // Radial label centered in the middle of the pocket band, flipped
              // on the left half so it never appears upside-down.
              const rMid = (R_INNER + R) / 2;
              const rot = mid < 180 ? mid - 90 : mid + 90;
              const labelPos = polarToCartesian(CX, CY, rMid, mid);

              return (
                <g key={opt.value} onClick={() => spinTo(i)}>
                  <path
                    d={segmentPath(CX, CY, R, startAngle, endAngle)}
                    fill={pocketColor(opt, i)}
                    stroke={GOLD}
                    strokeWidth={2}
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${rot} ${labelPos.x} ${labelPos.y})`}
                    fontSize={fontSize}
                    fontWeight={700}
                    fill="#F7F3E8"
                    style={{ userSelect: 'none', pointerEvents: 'none', letterSpacing: '0.02em' }}
                  >
                    {opt.label}
                  </text>
                </g>
              );
            })}

            {/* Inner shading for depth */}
            <circle cx={CX} cy={CY} r={R} fill="url(#wheelShade)" pointerEvents="none" />

            {/* Metallic center hub */}
            <circle cx={CX} cy={CY} r={R_INNER - 6} fill={GOLD_DARK} />
            <circle cx={CX} cy={CY} r={R_INNER - 9} fill="url(#hubGrad)" />
            <circle cx={CX} cy={CY} r={9} fill="#3a2f12" />
            <circle cx={CX} cy={CY} r={4} fill={GOLD} />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={onPrevious}
          disabled={!canPrevious || spinning}
          className="gap-1"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={onSkip}
          disabled={spinning}
          className="gap-1.5"
        >
          <SkipForward className="size-4" />
          Skip
        </Button>
        <Button
          variant="outline"
          onClick={pickRandom}
          disabled={spinning}
          className="gap-2"
        >
          🎲 Random
        </Button>
      </div>
    </div>
  );
}
