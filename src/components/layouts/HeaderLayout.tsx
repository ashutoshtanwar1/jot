import { Button, Container, Tooltip } from '@/design-system';
import { PanelRightClose, PanelRightOpen, Search } from 'lucide-react';
import React, { useCallback, useEffect } from 'react';
import { ThemeToggle } from '../theme/theme-toggle';

const AppIcon = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    className="max-w-14 before:h-[2.5px] opacity-85 text-xl font-thin font-[Exile] relative before:absolute before:inset-x-0 before:bottom-0 before:bg-current before:origin-right before:scale-x-100 hover:before:origin-left hover:before:scale-x-0 before:transition-transform before:delay-100 before:duration-300 before:ease-in-out hover:opacity-100"
    onClick={onClick}
  >
    Jot.
  </Button>
);

interface HeaderLayoutProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  openHomeTab: () => void;
  setSearchOpen: (open: boolean) => void;
}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({
  sidebarOpen,
  setSidebarOpen,
  openHomeTab,
  setSearchOpen,
}) => {
  const handleSidebarOpen = useCallback(() => {
    setSidebarOpen(!sidebarOpen);
  }, [sidebarOpen, setSidebarOpen]);

  // Cmd+Shift+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // on Mac, metaKey is Cmd
      if (e.metaKey && e.shiftKey && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        handleSidebarOpen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSidebarOpen]);

  return (
    <header className="border-b-2 z-10 flex items-center justify-between">
      <Tooltip
        content={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        shortcut="⌘ + ⇧ + B"
        side="bottom"
      >
        <Button
          variant="ghost"
          size="icon"
          className="mx-2"
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          onClick={handleSidebarOpen}
        >
          {!sidebarOpen ? (
            <PanelRightClose className="w-5 h-5" />
          ) : (
            <PanelRightOpen className="w-5 h-5" />
          )}
        </Button>
      </Tooltip>
      <Container className="p-2 w-full flex items-center justify-between">
        <AppIcon onClick={openHomeTab} />
        <Button
          variant="ghost"
          size="sm"
          className="w-1/3 px-2 flex flex-row items-center gap-2 border-2 border-muted-foreground/20 rounded-full"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-5 h-5 text-muted-foreground/80" />
          <span className="text-xs text-muted-foreground/80 hidden sm:block">Search (⌘ + K)</span>
        </Button>
        <ThemeToggle />
      </Container>
    </header>
  );
};
