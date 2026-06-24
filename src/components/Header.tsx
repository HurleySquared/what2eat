import { Link, useLocation } from 'react-router-dom';
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
            <Link to="/profile">Profile</Link>
          </Button>
        </nav>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-bold tracking-tight"
        >
          What2Eat
        </Link>

        <div className="ml-auto">
          <Badge variant="secondary">
            {user.nickname}
          </Badge>
        </div>
      </div>
    </header>
  );
}
