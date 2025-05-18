import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/design-system/components/ui/command';
import { formatDate } from '@/design-system/lib/utils';
import { Command, FileText, FolderOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ulid } from 'ulid';
import type { ExplorerNode } from './explorer/explorer-context';
import { useExplorer } from './explorer/explorer-context';

type CommandItemType = {
  type: 'command';
  id: string;
  name: string;
  action: () => void;
  score: number;
};

type NoteItemType = {
  type: 'file' | 'folder';
  id: string;
  name: string;
  content?: string;
  score: number;
  node: ExplorerNode;
};

type CommonItem = CommandItemType | NoteItemType;

function flattenNotes(tree: ExplorerNode[], includeFolders = false): ExplorerNode[] {
  let notes: ExplorerNode[] = [];
  for (const node of tree) {
    if (node.isFolder && node.items.length > 0) {
      notes = notes.concat(flattenNotes(node.items, includeFolders));
    }

    if (!node.isFolder || includeFolders) {
      notes.push(node);
    }
  }
  return notes;
}

function basicSemanticScore(query: string, note: ExplorerNode) {
  const queryTokens = query.toLowerCase().split(/\s+/);
  const text = (note.name + ' ' + (note.content || '')).toLowerCase();
  let score = 0;
  for (const token of queryTokens) {
    if (text.includes(token)) score += 1;
  }
  return score;
}

// Helper to unify commands and notes/folders
function getAllItems(
  query: string,
  notes: ExplorerNode[],
  commands: { name: string; action: () => void }[],
): CommonItem[] {
  // Score and map notes/folders
  const noteItems: NoteItemType[] = query
    ? notes
        .map(note => ({
          type: note.isFolder ? ('folder' as const) : ('file' as const),
          id: note.id,
          name: note.name,
          content: note.content,
          score: basicSemanticScore(query, note),
          node: note,
        }))
        .filter(({ score }) => score > 0)
    : [];

  // Score and map commands
  const commandItems: CommandItemType[] = query
    ? commands
        .map(cmd => ({
          type: 'command' as const,
          id: cmd.name,
          name: cmd.name,
          action: cmd.action,
          score: cmd.name.toLowerCase().includes(query.toLowerCase()) ? 1 : 0,
        }))
        .filter(({ score }) => score > 0)
    : [];

  // Sort by score, then name
  return [...commandItems, ...noteItems].sort(
    (a, b) => b.score - a.score || a.name.localeCompare(b.name),
  );
}

export const SearchCommandModal: React.FC = () => {
  const { tree, setActiveId, addNode, setSearchOpen, searchOpen } = useExplorer();
  const [query, setQuery] = useState('');
  const allNodes = flattenNotes(tree, true);

  const handleAddNode = (type: 'folder' | 'note') => {
    const nodeId = ulid();
    addNode(null, {
      id: nodeId,
      name: type === 'folder' ? 'New Folder' : 'New Note',
      isFolder: type === 'folder',
      items: [],
    });
    setActiveId(nodeId);
  };

  const COMMANDS = [
    {
      name: 'Create new note',
      action: () => handleAddNode('note'),
    },
    {
      name: 'Create new folder',
      action: () => handleAddNode('folder'),
    },
  ];
  const items: CommonItem[] = getAllItems(query, allNodes, COMMANDS);
  const recentFiles = allNodes
    .sort((a, b) => (b.lastOpenedDate || '').localeCompare(a.lastOpenedDate || ''))
    .map(
      f =>
        ({
          type: f.isFolder ? 'folder' : 'file',
          id: f.id,
          name: f.name,
          node: f,
        } as NoteItemType),
    );
  const commandItems = COMMANDS.map(
    cmd =>
      ({
        type: 'command' as const,
        id: cmd.name,
        name: cmd.name,
        action: cmd.action,
      } as CommandItemType),
  );

  function renderIcon(item: CommonItem) {
    if (item.type === 'command') return <Command className="w-4 h-4" />;
    if (item.type === 'folder') return <FolderOpen className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  }

  function handleSelect(item: CommonItem) {
    if (item.type === 'command') {
      item.action();
      setSearchOpen(false);
    } else {
      setActiveId(item.id);
      setSearchOpen(false);
    }
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput
        placeholder="Type a command or search notes..."
        value={query}
        onValueChange={setQuery}
        autoFocus
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          {(items.length > 0 ? items : [...commandItems, ...recentFiles]).map(item => (
            <CommandItem
              key={item.id}
              value={`${item.id} ${item.name}`}
              onSelect={() => handleSelect(item)}
            >
              {renderIcon(item)}
              <div className="flex flex-row items-center justify-between w-full">
                <span className="truncate">{item.name}</span>
                {item.type !== 'command' && (
                  <span className="text-[9px] text-muted-foreground/40">
                    {`Last opened ${formatDate(item.node.lastOpenedDate).toLowerCase()}`}
                  </span>
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
