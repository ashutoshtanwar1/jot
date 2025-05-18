import { Button, cn } from '@/design-system';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './use-theme';

export function ThemeToggle({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={cn('relative p-2.5 rounded-full transition-colors hover:bg-muted', className)}
      {...props}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute top-2.5 left-2.5 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
