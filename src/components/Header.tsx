import { Link, useLocation } from 'react-router-dom';
import { CircleUserRound, UtensilsCrossed, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
        <nav>
          <Button
            asChild
            variant={location.pathname === '/profile' ? 'secondary' : 'ghost'}
            size="sm"
          >
            <Link to="/profile">
              <User />
              Profile
            </Link>
          </Button>
        </nav>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xl font-bold tracking-tight"
        >
          <UtensilsCrossed className="size-5" />
          WhatchuWanna
        </Link>

        <div className="ml-auto">
          <Badge variant="secondary" className="gap-1.5">
            <CircleUserRound className="size-3.5" />
            {user.nickname}
          </Badge>
        </div>
      </div>
    </header>
  );
}
