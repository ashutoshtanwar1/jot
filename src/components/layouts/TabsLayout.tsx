import { Button } from '@/design-system';
import { X } from 'lucide-react';
import React from 'react';
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
}) => (
  <div className="flex border-b-2 bg-muted/30 h-10">
    {openFiles.map(file => (
      <div
        key={file.id}
        className={`px-4 py-2 cursor-pointer flex items-center gap-2 border-r-2 ${
          activeId === file.id ? 'bg-background' : 'text-muted-foreground'
        }`}
        onClick={() => setActiveId(file.id)}
      >
        <span className="truncate max-w-[120px] text-xs py-4 px-3">{file.name}</span>
        <Button
          variant="ghost"
          size="xs"
          className="p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
          onClick={e => {
            e.stopPropagation();
            closeFile(file.id);
          }}
        >
          <X />
        </Button>
      </div>
    ))}
  </div>
);
