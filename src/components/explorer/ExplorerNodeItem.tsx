import { cn, Tooltip } from '@/design-system';
import React, { useState } from 'react';
import { ulid } from 'ulid';
import type { ExplorerNode } from './explorer-context';
import { useExplorer } from './explorer-context';
import ExplorerNodeMenu from './ExplorerNodeMenu';
import NodeIcon from './NodeIcon';
import { NodeContentPreview } from './NodePreview';

const ExplorerNodeItem: React.FC<{ node: ExplorerNode; level: number; isSkeleton?: boolean }> = ({
  node,
  level,
  isSkeleton,
}) => {
  const { activeId, openFile, setActiveId, addNode, removeNode, renameNode } = useExplorer();
  const [expanded, setExpanded] = useState(node.isFolder);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleAdd = (isFolder: boolean) => {
    if (isSkeleton) return;

    const newId = ulid();
    addNode(node.id, {
      id: newId,
      name: isFolder ? 'New Folder' : 'New Note',
      isFolder,
      items: [],
    });
    setExpanded(true);
  };

  const handleRename = () => {
    if (isSkeleton) return;

    if (name.trim() && name !== node.name) {
      renameNode(node.id, name.trim());
    }
    setEditing(false);
  };

  const handleItemClick = () => {
    if (isSkeleton) return;

    if (node.isFolder) {
      setActiveId(node.id);
      setExpanded(e => !e);
    } else {
      openFile(node.id);
    }
  };

  return (
    <div
      className={cn('flex flex-col rounded-sm', {
        'bg-accent/75': activeId === node.id,
        'bg-accent/20': activeId === node.id && isSkeleton,
      })}
    >
      <Tooltip
        key={`${node.id}${node.content}`}
        content={<NodeContentPreview node={node} />}
        className={cn('border-2 border-foreground/20', node.isFolder || isSkeleton ? 'hidden' : '')}
        side="right"
      >
        <div
          className={cn(
            'h-8 flex items-center group px-2 cursor-pointer hover:bg-accent rounded transition-all',
            { 'pl-4': level > 0 },
          )}
          style={{ paddingLeft: `${level * 16 + 8 + (node.isFolder ? 0 : 0)}px` }}
          onClick={handleItemClick}
          onTouchEndCapture={handleItemClick}
        >
          <NodeIcon isFolder={node.isFolder} expanded={expanded} />

          {editing && !isSkeleton ? (
            <input
              className="bg-transparent border-b-2 border-gray-400 outline-none px-1 text-sm w-20 sm:w-32"
              value={name}
              autoFocus
              onChange={e => setName(e.target.value)}
              onBlur={handleRename}
              onKeyDown={e => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') setEditing(false);
              }}
            />
          ) : isSkeleton ? (
            <span className="h-4 w-20 bg-muted animate-pulse rounded" />
          ) : (
            <span
              className="flex-1 truncate text-sm select-none text-muted-foreground max-w-[40vw] sm:max-w-full"
              onDoubleClick={() => setEditing(true)}
            >
              {node.name}
            </span>
          )}

          {!isSkeleton && (
            <ExplorerNodeMenu
              node={node}
              onAdd={handleAdd}
              onRename={() => setEditing(true)}
              onDelete={() => removeNode(node.id)}
            />
          )}
        </div>
      </Tooltip>

      {!isSkeleton && node.isFolder && expanded && node.items.length > 0 && (
        <div>
          {node.items.map(child => (
            <ExplorerNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              isSkeleton={isSkeleton}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorerNodeItem;
