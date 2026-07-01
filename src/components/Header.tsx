'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, User, LogIn } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-[#141414]">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary">
            <UtensilsCrossed className="size-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight">What2Eat</span>
        </Link>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  pathname === '/profile'
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <User className="size-3.5" />
                {session.user.nickname || 'Profile'}
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-full px-4 py-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white hover:bg-white/10"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                pathname === '/login'
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="size-3.5" />
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
