import { Button, Tooltip } from '@/design-system';
import { FilePlus, FolderPlus } from 'lucide-react';
import React from 'react';
import { useExplorer } from '../explorer/explorer-context';
import ExplorerNodeItem from '../explorer/ExplorerNodeItem';

const ExplorerLayout: React.FC = () => {
  const { tree, addNode } = useExplorer();

  return (
    <div className="w-full h-full overflow-y-auto select-none">
      <div className="h-10 flex items-center justify-between px-2 py-1 border-b-2 bg-muted/30">
        <span className="font-semibold text-xs tracking-wide text-muted-foreground">Library</span>
        <div className="flex gap-1">
          <Tooltip content="Add new folder" side="bottom">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() =>
                addNode(null, {
                  id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
                  name: 'New Folder',
                  isFolder: true,
                  items: [],
                })
              }
            >
              <FolderPlus className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Add new note" side="bottom">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() =>
                addNode(null, {
                  id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
                  name: 'New Note',
                  isFolder: false,
                  items: [],
                })
              }
            >
              <FilePlus className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="p-2">
        {tree.map(node => (
          <ExplorerNodeItem key={node.id} node={node} level={0} />
        ))}
      </div>
    </div>
  );
};

export default ExplorerLayout;
