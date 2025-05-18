import { Button } from '@/design-system';
import { X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import type { ExplorerNode } from '../explorer/explorer-context';

interface TabsLayoutProps {
  openFiles: ExplorerNode[];
  activeId: string | null;
  setActiveId: (id: string) => void;
  closeFile: (id: string) => void;
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({
  openFiles,
  activeId,
  setActiveId,
  closeFile,
}) => {
  // Refs for each tab
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeId && tabRefs.current[activeId]) {
      tabRefs.current[activeId]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeId]);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    closeFile(id);
  };

  return (
    <div className="flex flex-nowrap overflow-x-auto border-b-2 bg-muted/30 h-10 overflow-y-hidden w-full">
      {openFiles.map(file => (
        <div
          key={file.id}
          ref={el => {
            tabRefs.current[file.id] = el;
          }}
          className={`flex-shrink-0 px-2 sm:px-4 cursor-pointer flex items-center gap-1 sm:gap-2 border-r-2 ${
            activeId === file.id ? 'bg-background' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveId(file.id)}
        >
          <span className="truncate max-w-[60vw] sm:max-w-[120px] text-xs py-2 sm:py-4 px-2 sm:px-3">
            {file.name}
          </span>
          <Button
            variant="ghost"
            size="xs"
            className="p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
            onClick={e => handleClose(e, file.id)}
          >
            <X />
          </Button>
        </div>
      ))}
    </div>
  );
};
