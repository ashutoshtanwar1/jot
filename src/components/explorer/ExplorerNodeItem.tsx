import { cn, Tooltip } from '@/design-system';
import React, { useState } from 'react';
import { ulid } from 'ulid';
import type { ExplorerNode } from './explorer-context';
import { useExplorer } from './explorer-context';
import ExplorerNodeMenu from './ExplorerNodeMenu';
import NodeIcon from './NodeIcon';
import { NodeContentPreview } from './NodePreview';

const ExplorerNodeItem: React.FC<{ node: ExplorerNode; level: number }> = ({ node, level }) => {
  const { activeId, openFile, setActiveId, addNode, removeNode, renameNode } = useExplorer();
  const [expanded, setExpanded] = useState(node.isFolder);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleAdd = (isFolder: boolean) => {
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
    if (name.trim() && name !== node.name) {
      renameNode(node.id, name.trim());
    }
    setEditing(false);
  };

  const handleItemClick = () => {
    if (node.isFolder) {
      setActiveId(node.id);
      setExpanded(e => !e);
    } else {
      openFile(node.id);
    }
  };

  return (
    <div className={cn('flex flex-col rounded-sm', { 'bg-accent/75': activeId === node.id })}>
      <Tooltip
        key={`${node.id}${node.content}`}
        content={<NodeContentPreview node={node} />}
        className={node.isFolder ? 'hidden' : ''}
        side="right"
      >
        <div
          className={cn(
            'flex items-center group px-2 cursor-pointer hover:bg-accent rounded transition-all',
            { 'pl-4': level > 0 },
          )}
          style={{ paddingLeft: `${level * 16 + 8 + (node.isFolder ? 0 : 0)}px` }}
          onClick={handleItemClick}
          onTouchEndCapture={handleItemClick}
        >
          <NodeIcon isFolder={node.isFolder} expanded={expanded} />

          {editing ? (
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
          ) : (
            <span
              className="flex-1 truncate text-sm select-none text-muted-foreground max-w-[40vw] sm:max-w-full"
              onDoubleClick={() => setEditing(true)}
            >
              {node.name}
            </span>
          )}

          <ExplorerNodeMenu
            node={node}
            onAdd={handleAdd}
            onRename={() => setEditing(true)}
            onDelete={() => removeNode(node.id)}
          />
        </div>
      </Tooltip>

      {node.isFolder && expanded && node.items.length > 0 && (
        <div>
          {node.items.map(child => (
            <ExplorerNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExplorerNodeItem;
