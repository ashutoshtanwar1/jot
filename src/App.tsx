import { useEffect, useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { ThemeToggle } from './components/theme-toggle';
import { Button, Container } from './design-system';
import { Editor } from './editor/editor';

const STORAGE_KEY = 'jot-content';

const AppIcon = () => (
  <Button
    variant="ghost"
    className="max-w-14 before:h-[2.5px] opacity-85 text-xl font-thin font-[Exile] relative before:absolute before:inset-x-0 before:bottom-0 before:bg-current before:origin-right before:scale-x-100 hover:before:origin-left hover:before:scale-x-0 before:transition-transform before:delay-100 before:duration-300 before:ease-in-out hover:opacity-100"
  >
    Jot.
  </Button>
);

function App() {
  const [content, setContent] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, content);
  }, [content]);

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="h-dvh flex flex-col bg-background text-foreground">
        <header className={`border-b shadow-sm shadow-foreground/5 z-10`}>
          <Container className="p-2 w-full flex items-center justify-between">
            <AppIcon />
            <ThemeToggle />
          </Container>
        </header>
        <main className="overflow-y-scroll">
          <Editor content={content} onChange={setContent} />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
