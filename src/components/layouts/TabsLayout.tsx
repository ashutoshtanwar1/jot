import { Button, cn, Tooltip } from '@/design-system';
import { Home, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import type { ExplorerNode } from '../explorer/explorer-context';
import { NodeContentPreview } from '../explorer/NodePreview';

type TabItemProps =
  | {
      isSkeleton: true;
      file?: ExplorerNode;
      isActive?: boolean;
      onSelect?: () => void;
      onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    }
  | {
      isSkeleton?: false;
      file: ExplorerNode;
      isActive: boolean;
      onSelect: () => void;
      onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
    };

const TabItem: React.FC<TabItemProps> = ({ file, isActive, onSelect, onClose, isSkeleton }) => {
  return (
    <Tooltip
      content={isSkeleton ? undefined : <NodeContentPreview node={file} />}
      className={cn('border-2 border-foreground/20', file?.isFolder || isSkeleton ? 'hidden' : '')}
      side="bottom"
    >
      <div
        className={`flex-shrink-0 px-2 sm:px-4 cursor-pointer flex items-center gap-1 sm:gap-2 border-r-2 ${
          isActive ? 'bg-background' : 'text-muted-foreground'
        }`}
        onClick={isSkeleton ? undefined : onSelect}
      >
        <span className="truncate max-w-[60vw] sm:max-w-[120px] text-xs py-2 sm:py-3 px-2 sm:px-3">
          {isSkeleton ? <div className="h-4 w-20 bg-muted animate-pulse rounded" /> : file.name}
        </span>
        <Button
          variant="ghost"
          size="xs"
          className="p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
          onClick={isSkeleton ? undefined : onClose}
          disabled={isSkeleton}
        >
          <X />
        </Button>
      </div>
    </Tooltip>
  );
};

interface TabsLayoutProps {
  openFiles: ExplorerNode[];
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  closeFile: (id: string) => void;
  isDataLoading: boolean;
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({
  openFiles,
  activeId,
  setActiveId,
  closeFile,
  isDataLoading,
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
      {isDataLoading ? (
        <TabItem isSkeleton />
      ) : (
        openFiles.map(file => (
          <div
            key={file.id}
            ref={el => {
              tabRefs.current[file.id] = el;
            }}
          >
            <TabItem
              file={file}
              isActive={activeId === file.id}
              onSelect={() => setActiveId(file.id)}
              onClose={e => handleClose(e, file.id)}
            />
          </div>
        ))
      )}
      <Tooltip content="Home" side="bottom">
        <Button
          variant="ghost"
          size="icon"
          className="mx-2 p-0 text-xs text-muted-foreground hover:text-primary hover:bg-transparent"
          onClick={() => setActiveId(null)}
        >
          <Home />
        </Button>
      </Tooltip>
    </div>
  );
};
