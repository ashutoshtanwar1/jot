import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/design-system';
import { MoreVertical } from 'lucide-react';
import React from 'react';
import type { ExplorerNode } from './explorer-context';

interface ExplorerNodeMenuProps {
  node: ExplorerNode;
  onAdd: (isFolder: boolean) => void;
  onRename: () => void;
  onDelete: () => void;
}

const ExplorerNodeMenu: React.FC<ExplorerNodeMenuProps> = ({ node, onAdd, onRename, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-1 opacity-0 group-hover:opacity-100">
          <MoreVertical className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {node.isFolder && (
          <DropdownMenuItem
            className="px-3 py-1.5 text-muted-foreground text-xs cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onAdd(false);
            }}
          >
            New Note
          </DropdownMenuItem>
        )}
        {node.isFolder && (
          <DropdownMenuItem
            className="px-3 py-1.5 text-muted-foreground text-xs cursor-pointer"
            onClick={e => {
              e.stopPropagation();
              onAdd(true);
            }}
          >
            New Folder
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="px-3 py-1.5 text-muted-foreground text-xs cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onRename();
          }}
        >
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-3 py-1.5 text-muted-foreground text-xs cursor-pointer"
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExplorerNodeMenu;
