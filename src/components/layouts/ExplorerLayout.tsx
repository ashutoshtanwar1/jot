import { Button, Tooltip } from '@/design-system';
import { FilePlus, FolderPlus } from 'lucide-react';
import React from 'react';
import { ulid } from 'ulid';
import { useExplorer } from '../explorer/explorer-context';
import { findParentFolderId } from '../explorer/explorer-utils';
import ExplorerNodeItem from '../explorer/ExplorerNodeItem';

const ExplorerLayout: React.FC<{ isSkeleton?: boolean }> = ({ isSkeleton }) => {
  const { tree, addNode, activeId } = useExplorer();

  const handleAddNode = (type: 'folder' | 'note') => {
    const parentId = activeId ? findParentFolderId(tree, activeId) : null;

    addNode(parentId, {
      id: ulid(),
      name: type === 'folder' ? 'New Folder' : 'New Note',
      isFolder: type === 'folder',
      items: [],
    });
  };

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
              onClick={() => handleAddNode('folder')}
              disabled={isSkeleton}
            >
              <FolderPlus className="w-5 h-5" />
            </Button>
          </Tooltip>
          <Tooltip content="Add new note" side="bottom">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => handleAddNode('note')}
              disabled={isSkeleton}
            >
              <FilePlus className="w-5 h-5" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="p-2 sm:p-4">
        {tree.map(node => (
          <ExplorerNodeItem key={node.id} node={node} level={0} isSkeleton={isSkeleton} />
        ))}
      </div>
    </div>
  );
};

export default ExplorerLayout;
