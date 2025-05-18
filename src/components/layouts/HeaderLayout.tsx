import { Button, Container, Tooltip } from '@/design-system';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import React from 'react';
import { ThemeToggle } from '../theme/theme-toggle';

const AppIcon = () => (
  <Button
    variant="ghost"
    className="max-w-14 before:h-[2.5px] opacity-85 text-xl font-thin font-[Exile] relative before:absolute before:inset-x-0 before:bottom-0 before:bg-current before:origin-right before:scale-x-100 hover:before:origin-left hover:before:scale-x-0 before:transition-transform before:delay-100 before:duration-300 before:ease-in-out hover:opacity-100"
  >
    Jot.
  </Button>
);

export const HeaderLayout: React.FC<{
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => (
  <header className="border-b-2 z-10 flex items-center justify-between">
    <Tooltip content={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'} side="bottom">
      <Button
        variant="ghost"
        size="icon"
        className="mx-2"
        aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {!sidebarOpen ? (
          <PanelRightClose className="w-5 h-5" />
        ) : (
          <PanelRightOpen className="w-5 h-5" />
        )}
      </Button>
    </Tooltip>
    <Container className="p-2 w-full flex items-center justify-between">
      <AppIcon />
      <ThemeToggle />
    </Container>
  </header>
);
