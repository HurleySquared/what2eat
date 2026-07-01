import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export function Header() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#141414]">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white"
        >
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
            <UtensilsCrossed className="size-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight">What2Eat</span>
        </Link>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-3">
          <Link
            to="/profile"
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              location.pathname === '/profile'
                ? 'bg-primary text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <User className="size-3.5" />
            {user.nickname}
          </Link>
        </div>
      </div>
    </header>
  );
}