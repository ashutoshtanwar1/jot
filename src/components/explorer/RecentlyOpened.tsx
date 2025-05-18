import { Button } from '@/design-system';
import { formatDate } from '@/design-system/lib/utils';
import React from 'react';
import type { ExplorerNode } from './explorer-context';
import { useExplorer } from './explorer-context';

export const RecentlyOpened: React.FC = () => {
  const { tree, openFile } = useExplorer();

  // Flatten tree to get all files
  function flatten(nodes: ExplorerNode[]): ExplorerNode[] {
    return nodes.flatMap((node: ExplorerNode) => (node.isFolder ? flatten(node.items) : [node]));
  }
  const allFiles = flatten(tree).filter(n => !n.isFolder);
  const recentFiles = allFiles
    .filter(f => f.lastOpenedDate)
    .sort((a, b) => (b.lastOpenedDate || '').localeCompare(a.lastOpenedDate || ''))
    .slice(0, 5);

  if (recentFiles.length === 0) {
    return null;
  }

  return (
    <div className="px-2 py-1">
      <div className="font-semibold text-md tracking-wide text-muted-foreground mb-3">
        Recently Opened
      </div>
      <ul className="space-y-1">
        {recentFiles.map(file => (
          <li key={file.id}>
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex justify-between items-center text-xs px-2 py-1"
              onClick={() => openFile(file.id)}
            >
              <span className="truncate max-w-[120px]">{file.name}</span>
              <span className="text-muted-foreground ml-2 text-[10px]">
                {formatDate(file.lastOpenedDate)}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyOpened;
