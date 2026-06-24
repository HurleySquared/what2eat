import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';

export function Profile() {
  const {
    form,
    mode,
    saved,
    showPassword,
    handleChange,
    handleSubmit,
    togglePassword,
    startCreate,
    cancelCreate,
  } = useProfile();

  const isCreate = mode === 'create';

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>{isCreate ? 'Create New User' : 'Your Profile'}</CardTitle>
          <CardDescription>
            {isCreate
              ? 'Fill in the details for the new account.'
              : 'Update your display name and account details.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="profile-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                value={form.nickname}
                onChange={handleChange}
                placeholder="What should we call you?"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="flex w-full items-center gap-3">
            <Button type="submit" form="profile-form" className="flex-1">
              {isCreate ? 'Create user' : 'Save changes'}
            </Button>
            {isCreate && (
              <Button type="button" variant="outline" onClick={cancelCreate}>
                Cancel
              </Button>
            )}
            {saved && !isCreate && (
              <span className="text-sm text-muted-foreground">Saved!</span>
            )}
          </div>

          {!isCreate && (
            <Button
              type="button"
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={startCreate}
            >
              <UserPlus className="mr-2 size-4" />
              Create new user
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
