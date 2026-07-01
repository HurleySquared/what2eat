import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import type { Option } from '@/types/quiz';

const SEGMENT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
  '#FFEAA7', '#DDA0DD', '#F7AE7E', '#A8E6CF',
  '#B5EAD7', '#FF9AA2',
];

const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 10;

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
}

export function SpinningWheel({ options, onSelect }: Props) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const pendingValue = useRef<string | null>(null);
  const segmentAngle = 360 / options.length;

  const spinTo = (index: number) => {
    if (spinning) return;
    const targetNorm = ((360 - (index * segmentAngle + segmentAngle / 2)) % 360 + 360) % 360;
    const currentNorm = ((rotation % 360) + 360) % 360;
    const diff = (targetNorm - currentNorm + 360) % 360;
    pendingValue.current = options[index].value;
    setRotation(rotation + 1440 + diff);
    setSpinning(true);
  };

  const handleTransitionEnd = () => {
    setSpinning(false);
    if (pendingValue.current) {
      onSelect(pendingValue.current);
      pendingValue.current = null;
    }
  };

  const pickRandom = () => {
    if (spinning) return;
    spinTo(Math.floor(Math.random() * options.length));
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        {/* Pointer at top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            top: -14,
            width: 0,
            height: 0,
            borderLeft: '11px solid transparent',
            borderRight: '11px solid transparent',
            borderTop: '22px solid hsl(var(--primary))',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.25))',
          }}
        />

        {/* Wheel */}
        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 1.8s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            willChange: 'transform',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            style={{ cursor: spinning ? 'default' : 'pointer', display: 'block' }}
          >
            {options.map((opt, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = startAngle + segmentAngle;
              const mid = startAngle + segmentAngle / 2;
              const pos = polarToCartesian(CX, CY, R * 0.63, mid);
              // Flip text for bottom-half segments so nothing is upside-down
              const textRot = mid > 90 && mid < 270 ? mid + 180 : mid;
              const emojiSize = segmentAngle >= 120 ? 28 : segmentAngle >= 72 ? 22 : 16;
              const labelSize = segmentAngle >= 120 ? 11 : segmentAngle >= 72 ? 9 : 7;

              return (
                <g key={opt.value} onClick={() => spinTo(i)}>
                  <path
                    d={segmentPath(CX, CY, R, startAngle, endAngle)}
                    fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                  <g transform={`translate(${pos.x},${pos.y}) rotate(${textRot})`}>
                    <text
                      y={-emojiSize * 0.4}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={emojiSize}
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {opt.emoji}
                    </text>
                    <text
                      y={emojiSize * 0.85}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={labelSize}
                      fontWeight="700"
                      fill="rgba(0,0,0,0.72)"
                      style={{ userSelect: 'none', pointerEvents: 'none' }}
                    >
                      {opt.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Outer ring */}
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="white" strokeWidth={3} />
            {/* Center cap */}
            <circle cx={CX} cy={CY} r={22} fill="white" stroke="#e2e8f0" strokeWidth={3} />
            <circle cx={CX} cy={CY} r={7} fill="hsl(var(--primary))" />
          </svg>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={pickRandom}
        disabled={spinning}
        className="gap-2"
      >
        🎲 Random Pick
      </Button>
    </div>
  );
}
